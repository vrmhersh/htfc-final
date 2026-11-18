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
// {count} is replaced by the real number of episodes
export const podcastSub = "{count} episodes including:";
// Text version of the episode graphic. It only shows until you add the real graphic (site.js > podcastGraphic).
export const featured = ["Yishmael vs Yisrael", "Ramchal", "The French Revolution", "Where is the Menorah?", "Oral Law", "The Rothschilds", "Holocaust Shadows", "Origins of Christianity", "American Beginnings", "Rabbi Akiva Eger"];
export const guests = "Guest speakers include Rabbi Zev Leff, Ambassador David Friedman, Alex Clare, Rabbi Akiva Tatz, Yoichi Herzog and Lord David Wolfson.";

// THE EPISODE LIST IS AUTOMATIC. It lives in src/content/episodes.json and is rewritten from the podcast feed
// (site.js > podcastFeed) by the "Update podcast" job a few times a day, so new episodes appear by themselves.
// You never need to edit it. See README > Podcast.
