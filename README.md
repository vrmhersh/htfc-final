# History for the Curious: how to update the website

Everything you will want to change is in the folder **`src/content`**. On GitHub: open the file, click the pencil icon, edit, then **Commit changes**. The site updates by itself in about a minute. If a mistake breaks the build, Vercel keeps the old site live and shows the error under Deployments.

| To change | Open this file |
|---|---|
| Add, edit or hide **tours** | `src/content/tours.js` |
| The three **region pages** (Western, Eastern, Central Europe): their pictures and 20-photo galleries with captions | `src/content/regions.js` |
| **Pictures** behind each page title, home video, private-tour picture, podcast graphic, About photos, contact details, WhatsApp, LinkedIn, About text | `src/content/site.js` |
| **Picture library**: the places you tour, whose pictures fill tour pages by themselves | `src/content/places.js` |
| **Podcast** platform links, phone numbers, wording (the episode list updates itself) | `src/content/podcast.js` |
| **Articles and musings** (the download buttons) | `src/content/writings.js` |
| **Lectures**: recordings, links, lecture list | `src/content/lectures.js` |
| **Podcast sponsorship** page wording | `src/content/sponsor.js` |
| **Testimonials** | `src/content/testimonials.js` |

## One-time setup on GitHub (two buttons)
The website has two helpers that run on GitHub by themselves. After uploading these files, start each one once:
1. Open the repository on GitHub and click **Actions** (if asked, click the green button to enable workflows).
2. Click **Save pictures** on the left, then **Run workflow**. It copies every picture still borrowed from the old website (and the logo) into `public/img/old`, repoints the links, saves the picture-library photos into `public/img/places` and adds their photographer credits. **Do this before the domain moves.** Open the finished run to read its report: it lists anything it could not fetch.
3. Click **Update podcast**, then **Run workflow**. From then on it runs four times a day.

Both helpers save their results into the repository, and the site rebuilds itself. If a run fails with a "permission" message, go to **Settings > Actions > General > Workflow permissions** and choose **Read and write permissions**. The helper files live in the folder `.github/workflows`; when uploading by hand, make sure that folder is included (it is hidden on some computers).

## Tour pages build their own pictures
`src/content/places.js` is a picture library: a few captioned photos for each place you tour. When a tour's title, summary or details mention a place in the library, that tour gets, with no extra work:
- a slideshow banner behind its title,
- a **Where we go** row of pictures further down,
- its picture card on the Tours page, and the picture shown when its link is shared on WhatsApp.

So a tour called "Paris & Beyond" shows Paris; a summary that lists "Avignon, Carpentras, Arles" shows those three in that order. A country or area name ("Provence", "Italy", "Central Europe") works too. The library is used on tour pages only: the three region pages keep their own 20 picture slots each, which you fill yourself in `regions.js`.
- **New place, no picture hunting:** copy the one-line example at the top of `places.js` and change the name. The Save pictures helper finds up to three good free-licence photos for it and saves them.
- **Your own photo:** upload it to `public/img` and add `{ img: "/img/my-photo.jpg", caption: "..." },` as the first line of that place.
- **Don't like a picture?** Delete its line.
- **Per tour:** `places: ["paris", "amsterdam"],` chooses the places yourself; `places: [],` switches the pictures off; `image: "/img/..."` sets one fixed banner.
- The photos come from Wikimedia Commons under free licences that require a credit, which the pages show in small print. Please keep the credits.

## Link previews (WhatsApp, iMessage, Facebook)
Every page now has its own title, description and picture for link previews; this happens during each build (`scripts/share-pages.mjs`). Tours use their first library picture, other pages their banner, and anything without a picture uses `public/share.jpg` (swap that file to change the default; keep it 1200 x 630 and under 300 KB). Set your real address in `site.js` > `url`. WhatsApp remembers old previews for a while; to test a fresh one, add `?v=2` to the end of the link.

## Testimonials on the home page and tour pages
`src/content/testimonials.js` > `featuredNames` chooses the three shown on the home page and on tour pages. Give a quote a third part, e.g. `"provence"`, and it appears first on tours with that word in their title.

## Adding a new tour
Open `src/content/tours.js`, copy one whole block from `{` to `},`, paste it underneath, and change the words. The template is at the top of the file.
- Order does not matter: tours sort themselves by start date, and move to "Past tours" by themselves after the end date.
- **Every tour gets its own web page automatically** (`/tours/your-id`). `id` is the end of that web address, so use lowercase letters and hyphens, e.g. `vienna-2027`.
- `status`: `"open"`, `"soldout"`, `"waitlist"` or `"private"`.
- **Private tours** only need `id`, `title`, `start`, `end` and `status: "private"`. They automatically show the shared private picture and the sentence about future open tours (both are set in `site.js`: `privateImage` and `privateText`).
- Extra information for a tour page is optional: `image`, `summary`, `details`, `leaders`, `price`, `gallery`.
- To hide a tour without deleting it, add `hidden: true,`.

The Tours page shows the upcoming tours, then the past tours, then three picture links (Western, Eastern and Central Europe). Tours are not grouped by region. Each picture opens its own page with a gallery of 20 pictures and captions, which you fill in `src/content/regions.js`.

## Pictures: where they go
1. Upload the picture into the folder **`public/img`** (GitHub: open the folder, **Add file > Upload files**).
2. Put its link in the right place, written as `/img/file-name.jpg`.

| Picture | Where to put the link |
|---|---|
| Banner behind each page title | `site.js` > `pageImages` (about, contact, podcast, lectures, testimonials, sponsor, tours, writings) |
| The three region pictures on the Tours page (also the banner of each region page) | `regions.js` > `img` |
| The 20 gallery pictures and captions on each region page | `regions.js` > `gallery` (replace `img: ""` and the caption on each line) |
| Picture under "Articles and Musings" on the home page (links to Writings) | `site.js` > `homeWritingsImage` |
| Picture shared by all private tours | `site.js` > `privateImage` |
| A single tour's own picture | that tour's `image` in `tours.js` |
| Podcast episode names graphic | `site.js` > `podcastGraphic` |
| The four About page slideshow photos | `site.js` > `aboutPhotos` |
| Two pictures on the Lectures page | `site.js` > `lectureImages` |

Until a link is added, the spot shows a dashed placeholder labelled with where to put it. When everything is filled in, set `showPlaceholders: false` in `site.js` to hide the labels.

## Home page video (instead of the slideshow)
Upload a short, silent-friendly `.mp4` (10 to 20 seconds, under 8 MB is best) to the **`public`** folder, e.g. `public/hero.mp4`, then in `site.js` set `heroVideo: "/hero.mp4"`. Optionally add `heroPoster` (a still picture shown while it loads). Leave `heroVideo` empty to keep the slideshow.

## Articles and musings: where the files go
Upload each file into **`public/docs`**. The file name must match the name in `src/content/writings.js` exactly (see `public/docs/README.txt` for the full list). To add a new one, upload it and add one line to `writings.js`.

## Podcast
- **The episode list updates itself.** The Update podcast helper reads the podcast feed (`site.js` > `podcastFeed`) four times a day and saves the list into `src/content/episodes.json`. New episodes appear on the Podcast page within a few hours, with a search box and the site's own player. Nothing to edit.
- Until the helper has run for the first time, the page shows the eleven episodes that were typed in by hand.
- If the feed address ever changes, the helper looks it up from Apple Podcasts and tells you the new address in its report.
- Optional: paste a Podbean "playlist" embed link into `site.js` > `podbeanEmbed` to show Podbean's own whole-podcast player instead.
- Lecture recordings: upload `.mp3` files to `public/audio` and set `src` in `lectures.js`.

## Contact form
The form sends messages to `historyforthecurious@gmail.com` without opening anyone's email app.
- **Quickest:** do nothing. The first time anyone sends a message, FormSubmit emails the inbox a one-time "Activate" link. Click it once, and from then on every message arrives by email. Send a test message yourself after the site is live.
- **Alternative:** create a free key at web3forms.com using the inbox address, paste it into `site.js` > `web3formsKey`, and the form uses Web3Forms instead.

## Before moving the domain
Run the **Save pictures** helper (see "One-time setup" above) and read its report. When it says all pictures are saved, nothing depends on the old website any more. The articles in `public/docs` still need uploading by hand (see `public/docs/README.txt`).
