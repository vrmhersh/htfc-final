// Runs automatically at the end of every build (see package.json). It gives every page its own small HTML file with its
// own title, description and picture, so a link pasted into WhatsApp, iMessage, Facebook or LinkedIn shows a proper preview
// card (those apps do not run the website's code; they only read these tags). It also writes sitemap.xml and robots.txt for Google.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/content/site.js";
import { tours } from "../src/content/tours.js";
import { regions } from "../src/content/regions.js";
import { places, groups } from "../src/content/places.js";
import { placesFor, commonsImg } from "../src/match.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, process.argv[2] || "dist");
const saved = JSON.parse(await readFile(path.join(ROOT, "src/content/pictures.json"), "utf8"));
const BASE = site.url.replace(/\/+$/, "");
const abs = (u) => !u ? "" : /^https?:/.test(u) ? u : BASE + (u.startsWith("/") ? u : `/${u}`);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const short = (s, n = 190) => { s = String(s).replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dates(t) {
  const [a, b] = [t.start, t.end].map((d) => new Date(d + "T12:00:00Z"));
  const d = (x) => `${x.getUTCDate()} ${MON[x.getUTCMonth()]}`;
  return (t.start === t.end ? d(a) : a.getUTCMonth() === b.getUTCMonth() ? `${a.getUTCDate()} – ${d(b)}` : `${d(a)} – ${d(b)}`) + ` ${b.getUTCFullYear()}`;
}
// First picture-library photo for a tour (the saved copy if there is one, otherwise from Wikimedia Commons)
const libPic = (list) => { for (const pl of list) { const p = ((pl.pictures && pl.pictures.length ? pl.pictures : (saved.auto || {})[pl.key]) || [])[0];
  if (p) return p.img || ((saved.files || {})[p.file] || {}).src || commonsImg(p.file, 1280); } return ""; };

const DEFAULT_IMG = "/share.jpg";
const TAGLINE = "Jewish heritage tours, lectures, writings and the History for the Curious podcast with Rabbi Aubrey Hersh.";
const pages = [
  ["/tours", "Tours", "Upcoming and past Jewish heritage tours across Europe with Rabbi Aubrey Hersh.", site.pageImages.tours],
  ["/podcast", "Podcast", "History for the Curious: the Jewish history podcast with Rabbi Aubrey Hersh. Listen to every episode.", site.pageImages.podcast],
  ["/sponsor", "Sponsor the podcast", "Reach thousands of curious listeners every week by sponsoring History for the Curious.", site.pageImages.sponsor],
  ["/lectures", "Lectures", "Shiurim, interviews and the lecture list of Rabbi Aubrey Hersh.", site.pageImages.lectures],
  ["/writings", "Writings", "Articles and musings by Rabbi Aubrey Hersh.", site.pageImages.writings],
  ["/testimonials", "Testimonials", "What travellers say about touring with Rabbi Aubrey Hersh.", site.pageImages.testimonials],
  ["/about", "About", site.about[0], site.pageImages.about],
  ["/contact", "Contact", "Enquire about a heritage tour, a speaking engagement or podcast sponsorship.", site.pageImages.contact],
  ...regions.map((r) => [`/tours/region/${r.slug}`, `${r.title} photos`, `Pictures from our Jewish heritage tours in ${r.title}.`, r.img]),
  ...tours.filter((t) => !t.hidden).map((t) => {
    const priv = t.status === "private";
    const lead = priv ? "Private trip." : t.summary || "Jewish heritage tour with Rabbi Aubrey Hersh.";
    return [`/tours/${t.id}`, `${t.title}, ${dates(t)}`, `${dates(t)}. ${lead}${t.leaders && !priv ? ` With ${t.leaders}.` : ""}`,
      (priv ? site.privateImage : t.image) || libPic(placesFor(t, places, groups))];
  }),
];

function tags({ url, title, desc, img }) {
  return `<!--share-->
<link rel="canonical" href="${esc(url)}" />
<meta property="og:type" content="website" /><meta property="og:site_name" content="${esc(site.name)}" /><meta property="og:locale" content="en_GB" />
<meta property="og:url" content="${esc(url)}" /><meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" /><meta property="og:image" content="${esc(img)}" />
<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" /><meta name="twitter:image" content="${esc(img)}" />
<!--/share-->`;
}
function render(html, p) {
  if (!/<!--share-->[\s\S]*?<!--\/share-->/.test(html) || !/<title>[\s\S]*?<\/title>/.test(html)) throw new Error("index.html has lost its <title> or its <!--share--> block");
  return html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(p.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${esc(p.desc)}" />`)
    .replace(/<!--share-->[\s\S]*?<!--\/share-->/, () => tags(p));
}

const index = await readFile(path.join(DIST, "index.html"), "utf8");
const home = { url: `${BASE}/`, title: `${site.name} | Jewish Heritage Tours with Rabbi Aubrey Hersh`, desc: TAGLINE, img: abs(DEFAULT_IMG) };
await writeFile(path.join(DIST, "index.html"), render(index, home));
for (const [route, title, desc, img] of pages) {
  const dir = path.join(DIST, ...route.split("/").filter(Boolean));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), render(index, { url: BASE + route, title: `${title} | ${site.name}`, desc: short(desc), img: abs(img || DEFAULT_IMG) }));
}
const today = new Date().toISOString().slice(0, 10);
await writeFile(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ["/", ...pages.map((p) => p[0])].map((r) => `  <url><loc>${esc(BASE + r)}</loc><lastmod>${today}</lastmod></url>`).join("\n") + `\n</urlset>\n`);
await writeFile(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
console.log(`Share previews written for ${pages.length + 1} pages, plus sitemap.xml and robots.txt.`);
