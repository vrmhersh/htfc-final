// Turns the picture library (content/places.js) into ready-to-show pictures for the tour pages.
import saved from "./content/pictures.json";
import { places, groups } from "./content/places.js";
import { placesFor, commonsImg, commonsPage } from "./match.js";

const files = saved.files || {}, auto = saved.auto || {};

// One picture, ready to show: src(width) gives the address; by / licence / page are for the photo credit.
function ready(place, p) {
  if (p.img) return { key: p.img, place: place.name, caption: p.caption || place.name, src: () => p.img, own: true };
  const f = files[p.file] || {};
  return { key: p.file, place: place.name, caption: p.caption || place.name,
    src: (w) => f.src || commonsImg(p.file, w), // saved copy in the website if there is one, otherwise straight from Wikimedia Commons
    by: f.by || p.by || "", licence: f.licence || "", licenceUrl: f.licenceUrl || "", page: commonsPage(p.file) };
}
export const placePictures = (place) => ((place.pictures && place.pictures.length ? place.pictures : auto[place.key]) || []).map((p) => ready(place, p));

// For a tour: banner = slideshow behind the title, cards = the "Where we go" pictures, first = picture for the Tours list
export function tourPictures(t) {
  const sets = placesFor(t, places, groups).map(placePictures).filter((s) => s.length);
  if (!sets.length) return { banner: [], cards: [], first: null };
  const firsts = sets.map((s) => s[0]);
  const banner = (sets.length > 1 ? firsts : sets[0]).slice(0, 5);
  const cards = (sets.length >= 3 ? firsts : sets.flat()).slice(0, 9);
  return { banner, cards, first: firsts[0] };
}
