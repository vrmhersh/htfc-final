// ===== EDIT ME: PODCAST =====
// Links shown as logo buttons. The last word picks the logo: "youtube" | "24six" | "apple" | "spotify"
export const platforms = [ // [name, link, logo]
  ["YouTube", "https://music.youtube.com/playlist?list=PL5icm2fTz2gsCuyPvwhAgCoKLfM_V1WIE&si=ZBPwOUgpiAa4nZfU", "youtube"],
  ["24Six", "https://24six.app/app/podcast/collection/1082", "24six"],
  ["Apple Podcasts", "https://podcasts.apple.com/gb/podcast/history-for-the-curious-the-jewish-history-podcast/id1575900426", "apple"],
  ["Spotify", "https://open.spotify.com/show/7BmW3bexRUO7KZt5W9LYa0?si=835cfd16ccb64e44", "spotify"],
];
// Shown under the platform buttons
export const phones = [["UK", "+44 333 366 0594"], ["US", "+1 605 477 2278"]];
export const podcastIntro = "Tune in to the fastest growing Jewish History podcast";
export const podcastSub = "200 episodes including:";
// Text version of the episode graphic. It only shows until you add the real graphic (site.js > podcastGraphic).
export const featured = ["Yishmael vs Yisrael", "Ramchal", "The French Revolution", "Where is the Menorah?", "Oral Law", "The Rothschilds", "Holocaust Shadows", "Origins of Christianity", "American Beginnings", "Rabbi Akiva Eger"];
export const guests = "Guest speakers include Rabbi Zev Leff, Ambassador David Friedman, Alex Clare, Rabbi Akiva Tatz, Yoichi Herzog and Lord David Wolfson.";

// EPISODES PLAYED ON THE WEBSITE (newest first).
// To add a new episode: copy one line, paste it at the TOP, and change the four parts:
//   n = episode number, title, id = the code after "i=" in the episode's Podbean player link, slug = the end of the episode's web address.
// Where to find the id: open the new episode on Podbean > Share > Embed (or "Player link"); the id looks like g4b9g-1b84883.
export const episodes = [
  { n: 201, title: "The Jews of Ancient Rome (100BCE – 550CE)", id: "g4b9g-1b84883", slug: "201-the-jews-of-ancient-rome-100bce-550ce" },
  { n: 200, title: "Doña Gracia Nasi (1510–1569): Visionary, Banker & Saviour", id: "dkyjh-1b713ec", slug: "200-dona-gracia-nasi-1510-1569-%e2%80%93-visionary-banker-saviour" },
  { n: 199, title: "Rav Yosef Karo II: The Maggid, a Voice from Heaven", id: "jigke-1b5d4bb", slug: "199-rav-yosef-karo-ii-the-maggid-a-voice-from-heaven" },
  { n: 198, title: "Rabbi Yosef Karo I: The Story behind the Shulchan Aruch", id: "znw7j-1b4d174", slug: "198-rabbi-yosef-karo-1488-1575-the-high-stakes-story-behind-the-shulchan-aruch" },
  { n: 197, title: "Tisha B’Av: Two Harrowing Letters, Two Powerful Testimonies", id: "yuigj-1b185f8", slug: "197-two-harrowing-letters-two-powerful-testimonies" },
  { n: 196, title: "The WWII Hero Who Rescued Budapest’s Jews", id: "y5tdd-1b0d394", slug: "196-the-wwii-hero-who-rescued-budapests-jews" },
  { n: 195, title: "The Holocaust: An Unprecedented Crime and an American Betrayal", id: "8h2du-1afc635", slug: "195-the-holocaust-an-unprecedented-crime-and-an-american-betrayal" },
  { n: 194, title: "Three Extraordinary 20th-Century Lives (feat. Dr Yossi Adler & Rabbi Dr Akiva Tatz)", id: "tz868-1ae922e", slug: "194-three-extraordinary-20th-century-lives-feat-dr-yossi-adler-rabbi-dr-akiva-tatz" },
  { n: 193, title: "Vaccines, Potions & Charlatans: Jewish Medicine in the 19th Century", id: "4zz3q-1ad5309", slug: "193-vaccines-potions-charlatans-jewish-medicine-in-the-19th-century" },
  { n: 192, title: "Reform vs Orthodoxy: The Battle of 19th-Century Europe", id: "4d98z-1ac1436", slug: "192-reform-vs-orthodoxy-the-battle-of-19th-century-europe" },
  { n: 191, title: "Moses Mendelssohn: Father of Reform", id: "3rf5c-1aad8b0", slug: "191-moses-mendelssohn-father-of-reform" },
];
