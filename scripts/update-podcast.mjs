// Reads the podcast feed and rewrites src/content/episodes.json, so new episodes appear on the website by themselves.
// Run by the "Update podcast" job on GitHub a few times a day. To run it yourself:  node scripts/update-podcast.mjs
import { readFile, writeFile } from "node:fs/promises";
import { site } from "../src/content/site.js";

const OUT = new URL("../src/content/episodes.json", import.meta.url);
const UA = { "User-Agent": `HistoryForTheCurious-website/1.0 (+${site.url})` };

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENT[e.toLowerCase()] ?? m));
const text = (s) => decode(s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1")).replace(/\s+/g, " ").trim();
const tag = (xml, name) => { const m = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i").exec(xml); return m ? text(m[1]) : ""; };
const attr = (xml, name, a) => { const m = new RegExp(`<${name}\\s[^>]*?\\b${a}\\s*=\\s*["']([^"']+)["']`, "i").exec(xml); return m ? decode(m[1]) : ""; };

export function parseFeed(xml) {
  return (xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || []).map((it) => {
    const raw = tag(it, "title");
    const lead = /^\s*(?:#\s*|ep(?:isode)?\.?\s*)(\d{1,4})\s*[-–—:.]?\s*/i.exec(raw); // "#201 - Title", "#201: Title", "Ep 201 Title"
    const n = Number(tag(it, "itunes:episode")) || (lead ? Number(lead[1]) : 0);
    const date = new Date(tag(it, "pubDate"));
    const e = { n, title: lead ? raw.slice(lead[0].length).trim() : raw, link: tag(it, "link"), audio: attr(it, "enclosure", "url"),
      date: isNaN(date) ? "" : date.toISOString().slice(0, 10) };
    if (!e.n) delete e.n;
    return e;
  }).filter((e) => e.title && e.audio && e.link);
}

async function get(url) {
  const r = await fetch(url, { headers: UA, redirect: "follow" });
  if (!r.ok) throw new Error(`${url} answered ${r.status}`);
  return r.text();
}
async function loadFeed() {
  try { return await get(site.podcastFeed); }
  catch (err) { // fall back to the feed address Apple Podcasts has on record
    console.log(`Feed address in site.js did not work (${err.message}). Asking Apple Podcasts for the feed address...`);
    const j = JSON.parse(await get(`https://itunes.apple.com/lookup?id=${site.applePodcastId}&entity=podcast`));
    const url = j.results && j.results[0] && j.results[0].feedUrl;
    if (!url) throw new Error("Apple Podcasts has no feed address for this podcast id");
    console.log(`Using ${url}  (put this in site.js > podcastFeed)`);
    return get(url);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("update-podcast.mjs")) {
  const old = JSON.parse(await readFile(OUT, "utf8"));
  const episodes = parseFeed(await loadFeed()).sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.n || 0) - (a.n || 0));
  // Safety: never replace a good list with an empty or badly cut-down one.
  const had = (old.episodes || []).filter((e) => e.audio).length;
  if (!episodes.length || episodes.length < had * 0.5) { console.error(`Feed gave ${episodes.length} episodes (had ${had}). Leaving the list alone.`); process.exit(1); }
  if (JSON.stringify(old.episodes) === JSON.stringify(episodes)) { console.log(`No change: ${episodes.length} episodes, newest "${episodes[0].title}".`); process.exit(0); }
  await writeFile(OUT, JSON.stringify({ note: old.note, updated: new Date().toISOString().slice(0, 10), episodes }, null, 1) + "\n");
  console.log(`Updated: ${episodes.length} episodes, newest "${episodes[0].title}".`);
}
