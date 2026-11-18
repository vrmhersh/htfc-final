// ===== EDIT ME: TOURS =====
// To ADD a tour: copy one whole block { ... }, paste it below, change the details.
// ORDER does not matter: tours sort themselves by start date, and move to "Past" automatically after the end date.
// status: "open" | "soldout" | "private" | "waitlist"
// note: small extra label, e.g. "With Hatzola USA" (optional)
// details: paragraphs shown on the tour's own page. Leave [] if there is no page yet.
// COPY-ME TEMPLATE (every field except id, title, start, end, status is optional):
//   { id: "vienna-2027", title: "Vienna", start: "2027-09-06", end: "2027-09-09", status: "open",
//     image: "/img/vienna.jpg", summary: "One line shown on the tour page.", leaders: "Rabbi Aubrey Hersh",
//     price: "$1,950 per person", details: ["First paragraph.", "Second paragraph."], gallery: ["/img/v1.jpg", "/img/v2.jpg"] },
// PRIVATE tours (status: "private") automatically show the shared private picture and text, so just give the title and dates.
// To HIDE a tour without deleting it, add  hidden: true,
// PICTURES ARE AUTOMATIC: the tour page reads the title, summary and details, spots the places it knows from
//   src/content/places.js (Paris, Avignon, Prague ...) and builds the banner slideshow and the "Where we go" pictures by itself.
//   To choose the places yourself add e.g.  places: ["paris", "amsterdam"],   To switch the automatic pictures off add  places: [],
//   A tour's own  image: "/img/..."  still wins for the banner if you set one.
export const tours = [
  { id: "italy-2026", title: "Italy", start: "2026-05-10", end: "2026-05-11", status: "open", details: [] },
  { id: "danube-cruise-2026", title: "Danube Riverboat Cruise", start: "2026-08-05", end: "2026-08-12", status: "open", details: [] },
  { id: "krakow-auschwitz", title: "Krakow & Auschwitz", start: "2026-10-13", end: "2026-10-15", status: "private", details: [] },
  { id: "paris-beyond-oct-2026", title: "Paris & Beyond", start: "2026-10-19", end: "2026-10-22", status: "soldout", details: [] },
  { id: "central-europe", title: "Central Europe", note: "With Hatzola USA", start: "2026-11-08", end: "2026-11-12", status: "open", details: [] },
  { id: "paris-beyond", title: "Paris & Beyond", start: "2027-03-29", end: "2027-04-01", status: "open", details: [] },
  { id: "provence", title: "Provence (Southern France)", start: "2027-05-17", end: "2027-05-20", status: "open",
    summary: "Sentier des Ocres, Avignon, Carpentras, Vauvert, Montpellier, Arles and Marseille, ending with a private boat tour of the Calanques.",
    leaders: "Rabbi Aubrey Hersh & Rabbi Dr Akiva Tatz",
    price: "$2,085 per person (flights not included; single supplement $475)",
    details: [
      "Monday 17th – Thursday 20th May 2027.",
      "Including Sentier des Ocres, medieval Avignon, ancient Carpentras and the village of Vauvert, as well as Montpellier, Arles and the magnificent shul in Marseille. To end, a private boat tour of the Calanques.",
    ],
    gallery: [
      "https://historyforthecurious.com/storage/upcoming-tours/gallery/upcoming_tour_7K9UGlCj8h.webp",
      "https://historyforthecurious.com/storage/upcoming-tours/gallery/upcoming_tour_KRLmCiGc6F.webp",
      "https://historyforthecurious.com/storage/upcoming-tours/gallery/upcoming_tour_LO6twqBHwj.webp",
      "https://historyforthecurious.com/storage/upcoming-tours/gallery/upcoming_tour_bxuZevU3gU.webp" ] },
  { id: "holland", title: "Holland", start: "2027-07-12", end: "2027-07-15", status: "open", details: [] },
  { id: "Fake-Tour-Vrm", title: "Avrumi's imagination", start: "2027-01-01", end: "2027-01-02", status: "open",
    summary: "Begining in the Hanging Gardens of Babylon, Followed by Herds of Wildebeast Sweeping Down the Savannah and Ending in Torquay",
    leaders: "Basil Fawlty",
    price: "$9555 per person (flights not included; single supplement $475)",
    details: [
      "Monday 1st – Tuesday 2nd Jan 2027.",
      "Begining in the Hanging Gardens of Babylon, Followed by Herds of Wildebeast Sweeping Down the Savannah and Ending in Torquay. Waldorf Salad and Duck Surprise will be Served.",
      "Third Paragraph.",
      "Fourth Paragraph."
    ],
    gallery: ["/img/basil1.jpg", "/img/basil2.jpg"]},
];

