// SAVE PICTURES: copies every picture the website still borrows from somewhere else into the website itself.
//   1. Pictures (and the logo) that still load from the OLD website  ->  public/img/old/   and the links in src/content are repointed.
//   2. Picture-library photos from Wikimedia Commons (src/content/places.js)  ->  public/img/places/  plus photographer and licence
//      for the on-page credits.
//   3. Places in places.js that have no pictures yet get up to 3 good free-licence photos found for them automatically.
// Run by the "Save pictures" job on GitHub (Actions > Save pictures > Run workflow). To run it yourself:  node scripts/save-pictures.mjs
// It is safe to run again and again: anything already saved is skipped.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { places } from "../src/content/places.js";
import { site } from "../src/content/site.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "src/content"), PUB = path.join(ROOT, "public");
const UA = { "User-Agent": `HistoryForTheCurious-website/1.0 (+${site.url}; picture saver)` };
const WIDTH = 1920;       // saved size of library photos (pixels across)
const AUTO_COUNT = 3;     // photos to find for a place that has none
const OLD = /https?:\/\/(?:www\.)?historyforthecurious\.com\/[^"'`\s)]+?\.(?:png|jpe?g|webp|avif|gif|svg)/gi;
const log = (...a) => console.log(...a);
const problems = [];

async function download(url, file) {
  const r = await fetch(url, { headers: UA, redirect: "follow" });
  if (!r.ok) throw new Error(`answered ${r.status}`);
  const type = r.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`did not send a picture (${type || "unknown type"})`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 200) throw new Error("sent an empty file");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buf);
  return buf.length;
}
const safeName = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9.]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();

/* ---------- 1. the old website ---------- */
async function saveOldSite() {
  const names = (await readdir(CONTENT)).filter((f) => f.endsWith(".js"));
  let saved = 0, kept = 0;
  for (const name of names) {
    const file = path.join(CONTENT, name); let src = await readFile(file, "utf8"); const before = src;
    for (const url of new Set(src.match(OLD) || [])) {
      const local = `/img/old/${safeName(decodeURIComponent(url.split("/").pop()))}`; const dest = path.join(PUB, local);
      try {
        if (existsSync(dest)) kept++; else { await download(url, dest); saved++; log(`  saved ${local}`); }
        src = src.split(url).join(local); // repoint the link only once the picture is safely in the website
      } catch (err) { problems.push(`${url} ${err.message} (still linked to the old website in ${name})`); }
    }
    if (src !== before) await writeFile(file, src);
  }
  log(`Old website: ${saved} picture(s) saved, ${kept} already there.`);
}

/* ---------- 2 + 3. Wikimedia Commons ---------- */
const API = "https://commons.wikimedia.org/w/api.php";
async function commons(params) {
  const q = new URLSearchParams({ action: "query", format: "json", formatversion: "2", prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata", iiextmetadatafilter: "Artist|LicenseShortName|LicenseUrl|Credit", iiurlwidth: String(WIDTH), ...params });
  const r = await fetch(`${API}?${q}`, { headers: UA });
  if (!r.ok) throw new Error(`Wikimedia Commons answered ${r.status}`);
  return (await r.json()).query || {};
}
const plain = (html) => String(html || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const artist = (meta) => { const a = plain(meta.Artist && meta.Artist.value).replace(/^(photo(graph)?( by)?|author|by)\s*:?\s*/i, ""); return a.length > 60 ? a.slice(0, 57).trim() + "…" : a; };
const stripNs = (t) => t.replace(/^File:/, "");

async function findPhotos(place) { // good landscape photos for a place that has none
  const q = await commons({ generator: "search", gsrnamespace: "6", gsrlimit: "40",
    gsrsearch: `${place.search || place.name} filetype:bitmap incategory:"Quality images"` });
  return (q.pages || []).sort((a, b) => (a.index || 0) - (b.index || 0)).filter((p) => {
    const i = p.imageinfo && p.imageinfo[0]; if (!i || i.mime !== "image/jpeg") return false;
    const shape = i.width / i.height; return i.width >= WIDTH && shape >= 1.25 && shape <= 2.2;
  }).slice(0, AUTO_COUNT).map((p) => ({ file: stripNs(p.title), caption: place.name }));
}

async function saveLibrary() {
  const jsonFile = path.join(CONTENT, "pictures.json");
  const data = JSON.parse(await readFile(jsonFile, "utf8")); data.files ||= {}; data.auto ||= {};
  for (const place of places) { // 3. fill places that have no pictures
    if ((place.pictures && place.pictures.length) || (data.auto[place.key] && data.auto[place.key].length)) continue;
    try {
      const found = await findPhotos(place); data.auto[place.key] = found;
      log(found.length ? `  found ${found.length} photo(s) for ${place.name}` : `  no suitable photos found for ${place.name}`);
      if (!found.length) problems.push(`${place.name}: no suitable free photos found. Add a "search" hint in places.js or upload your own.`);
    } catch (err) { problems.push(`${place.name}: could not search for photos (${err.message})`); }
  }
  const wanted = [...new Set(places.flatMap((p) => (p.pictures && p.pictures.length ? p.pictures : data.auto[p.key]) || []).map((p) => p.file).filter(Boolean))];
  const todo = wanted.filter((f) => !(data.files[f] && data.files[f].src && existsSync(path.join(PUB, data.files[f].src))));
  let saved = 0;
  for (let i = 0; i < todo.length; i += 25) { // ask about 25 files at a time
    const batch = todo.slice(i, i + 25); let q;
    try { q = await commons({ titles: batch.map((f) => `File:${f}`).join("|") }); }
    catch (err) { problems.push(`Could not ask Wikimedia Commons about ${batch.length} photo(s): ${err.message}`); continue; }
    const renamed = Object.fromEntries((q.normalized || []).map((n) => [n.to, n.from]));
    for (const page of q.pages || []) {
      const asked = stripNs(renamed[page.title] || page.title); const file = batch.find((f) => f === asked) || batch.find((f) => f.replace(/_/g, " ") === asked) || asked;
      const info = page.imageinfo && page.imageinfo[0];
      if (page.missing || !info) { problems.push(`"${file}" does not exist on Wikimedia Commons (delete or fix that line in places.js)`); continue; }
      const meta = info.extmetadata || {}; const url = info.thumburl || info.url;
      const ext = (url.split("?")[0].match(/\.(jpe?g|png|webp)$/i) || [, "jpg"])[1].toLowerCase();
      const local = `/img/places/${safeName(file.replace(/\.[a-z0-9]+$/i, "")).slice(0, 70)}.${ext}`;
      try {
        await download(url, path.join(PUB, local)); saved++; log(`  saved ${local}`);
        data.files[file] = { src: local, by: artist(meta), licence: plain(meta.LicenseShortName && meta.LicenseShortName.value), licenceUrl: (meta.LicenseUrl && meta.LicenseUrl.value) || "" };
      } catch (err) { problems.push(`"${file}" ${err.message}`); }
    }
  }
  await writeFile(jsonFile, JSON.stringify(data, null, 1) + "\n");
  log(`Picture library: ${saved} photo(s) saved, ${wanted.length - todo.length} already there, ${wanted.length} in use.`);
}

await saveOldSite().catch((e) => problems.push(`Old website step stopped: ${e.message}`));
await saveLibrary().catch((e) => problems.push(`Picture library step stopped: ${e.message}`));
if (problems.length) { log(`\n${problems.length} thing(s) to look at:`); problems.forEach((p) => log(`  - ${p}`)); }
else log("\nAll pictures are saved inside the website.");
