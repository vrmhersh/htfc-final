// ===== EDIT ME: general website details =====
const S = "https://historyforthecurious.com/storage/";
export const site = {
  name: "History for the Curious",
  logo: "https://historyforthecurious.com/images/logo.png",
  tagline: "Turning Curiosity into Knowledge",
  email: "historyforthecurious@gmail.com",
  adminEmail: "giana.elav@gmail.com",
  phone: "+44 7973 178 236",
  whatsapp: "https://chat.whatsapp.com/FEgoaCOQoyU2VX49SwA8Aw",
  linkedin: "https://www.linkedin.com/in/rabbi-aubrey-hersh-0135578/",
  whatsappPm: "https://wa.me/18483525744", whatsappPmDisplay: "+1 (848) 352 5744",
  // Leave empty to open the visitor's email app. Paste a free Web3Forms key (web3forms.com) to receive form messages directly.
  web3formsKey: "",
  // HOME VIDEO (optional): put a short .mp4 in the "public" folder (e.g. public/hero.mp4) and set heroVideo: "/hero.mp4". Leave "" to use the slideshow instead.
  heroVideo: "/hero.mp4", heroPoster: "/hero-poster.webp", heroTitle: "Step In To The Past",
  // BANNER IMAGE behind each page title. Paste an image link (e.g. "/img/about.jpg"). Empty = plain colour for now.
  pageImages: { tours: "https://historyforthecurious.com/storage/header-images/tours_header_image_PjzUFb6NlK.webp", podcast: "", lectures: "", writings: "https://historyforthecurious.com/storage/header-images/writing_header_image_uOkSS1TooF.webp", testimonials: "", about: "", contact: "", sponsor: "" },
  // PODCAST PLAYER. By default the Podcast page plays the episodes listed in src/content/podcast.js.
  // Optional: to show a whole-podcast player that updates by itself instead, paste the src="..." link from
  // Podbean (dashboard > Distribution > Podbean Player > Playlist). The old website's link did not work, so it is not used.
  podbeanEmbed: "",
  podbeanUrl: "https://rabbiaubreyhersh.podbean.com/",
  podcastGraphic: "", // the graphic listing episode names, e.g. "/img/podcast-episodes.jpg"
  // LECTURES page: the two pictures above "Shiurim, Interviews & Links" and "Lecture List"
  lectureImages: ["", ""],
  logo24: "https://historyforthecurious.com/images/logo/24Six_logo.avif",
  // While you are still collecting pictures, empty picture spots show a labelled placeholder. Set to false before you go live to hide the labels.
  showPlaceholders: true,
  // PRIVATE TOURS all share this picture and text
  privateImage: "",
  privateText: "For all future open tours, please consult further upcoming tours list or contact us by whatsapp +1 (848) 352 5744 or email to: giana.elav@gmail.com.",
  // Home page slideshow: add or remove lines
  slides: [
    { img: S + "homepage/header-slider/header_slider_IfXpXGsXHR.webp", text: "Step In To The Past" },
    { img: S + "homepage/header-slider/header_slider_ChJDSWsQDy.webp", text: "Walk Through Time" },
    { img: S + "homepage/header-slider/header_slider_9IwR6zQYBn.webp", text: "Bring History To Life" },
  ],
  images: {
    tours: S + "header-images/tours_header_image_PjzUFb6NlK.webp",
    writings: S + "header-images/writing_header_image_uOkSS1TooF.webp",
    upcoming: S + "homepage/upcoming-events/upcoming_image_FoQTCQoASc.webp",
    pastStrip: ["XCiI0KYtpp", "K3PR0PRR8K", "fBPqfhmJ3e", "5sq2XPCSPC"].map((k) => S + `homepage/tour-slider/tour_slider_${k}.webp`),
  },
  stats: [["30", "years educating, lecturing and writing"], ["250+", "heritage tours led across Europe"], ["18,000", "weekly podcast listeners"]],
  pastCountries: "Austria, Czechia, France, Germany, Greece, Hungary, Italy, Lithuania, Holland, Poland, Portugal, Russia, Slovakia, Spain and Ukraine",
  toursIntro: [
    "Iconic destinations and exclusive landmarks. Our VIP visits combine luxury and scenic beauty with treasures from our Jewish past.",
    "Since 2021, most of our trips have been accompanied and greatly enhanced by the international lecturer and author Rabbi Dr Akiva Tatz.",
  ],
  about: [
    "Rabbi Aubrey Hersh has devoted the last 30 years to educating, lecturing, touring, and writing. Home is London, England, where Rabbi Hersh is a Senior Lecturer at the JLE. This is combined with a strong international following, through his travel, shiurim and media.",
    "As well as lecturing internationally, he is an annual Scholar-in-Residence for Pesach hotels across Europe, and on board Kosherica’s summer river cruises. Since 2005, he has led more than 250 heritage tours across Europe.",
    "Four years ago, his podcast History for the Curious was launched, exploring the last 2,500 years and events. It has attracted over 18,000 weekly listeners and ranks among the fastest-growing podcasts on Jewish history.",
    "A product of two renowned yeshivas, he also developed strong connections with Rav Moshe Shapira zt’l and Rabbi Zev Leff shlit’a. His topics span halacha, history, and Jewish thought, and are rooted in a passion for engaging, accessible learning.",
    "Beginning in 2003 Rabbi Hersh specialised in Holocaust education, working with Sir Martin Gilbert, the Imperial War Museum and Father Patrick Desbois. He was also the editor of the very popular 60 Days-for-60 Years & 70-days-for 70 years series on the Holocaust which ran to 100,000 copies.",
    "His talks are designed to educate, inspire curiosity and foster a nuanced understanding of Yiddishkeit and Jewish heritage.",
  ],
  // HOME PAGE: the picture under "Articles and Musings" (it links to the Writings page). Swap for your own, e.g. "/img/writings.jpg".
  homeWritingsImage: S + "header-images/writing_header_image_uOkSS1TooF.webp",
  // ABOUT PAGE SLIDESHOW: put each picture in public/img and set img to e.g. "/img/un.jpg". Add or remove lines freely.
  // (Captions for the first three are taken from the old website. Photo 4 needs a caption.)
  aboutPhotos: [
    { img: "", caption: "Israeli Ambassador at the UN" }, { img: "", caption: "Rabbi Jonathan Sacks" },
    { img: "", caption: "Guiding Rabbi Paysach Krohn in Krakow" }, { img: "", caption: "Caption for photo 4" },
  ],
};
