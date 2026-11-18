// Works out which places from the picture library a tour visits. Plain JavaScript so the build scripts can use it too.
export const norm = (s) => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function placesFor(t, places, groups) {
  const byKey = (k) => places.find((p) => p.key === k);
  if (Array.isArray(t.places)) return t.places.map(byKey).filter(Boolean); // the tour chose its own places (or [] for none)
  const text = norm([t.title, t.summary, ...(t.details || [])].join(" · "));
  const at = (words) => { // where the earliest of these words appears as a whole word (-1 = not there)
    let best = -1;
    for (const w of words || []) {
      const m = new RegExp(`(^|[^a-z0-9])${esc(norm(w))}([^a-z0-9]|$)`).exec(text);
      if (m && (best < 0 || m.index < best)) best = m.index;
    }
    return best;
  };
  const inOrder = (list) => list.map((x) => [at(x.match || [x.name]), x]).filter(([i]) => i >= 0).sort((a, b) => a[0] - b[0]).map(([, x]) => x);
  const named = inOrder(places);
  if (named.length) return named; // places mentioned by name, in the order the tour mentions them
  const out = [];
  inOrder(groups).forEach((g) => g.places.forEach((k) => { const p = byKey(k); if (p && !out.includes(p)) out.push(p); }));
  return out;
}

// Wikimedia Commons addresses for a file name
const enc = (file) => encodeURIComponent(String(file).replace(/ /g, "_"));
export const commonsImg = (file, width) => `https://commons.wikimedia.org/wiki/Special:FilePath/${enc(file)}?width=${width}`;
export const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${enc(file)}`;
