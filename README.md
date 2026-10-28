# History for the Curious: how to update the website

Everything you will want to change is in the folder **`src/content`**. On GitHub: open the file, click the pencil icon, edit, then **Commit changes**. The site updates by itself in about a minute. If a mistake breaks the build, Vercel keeps the old site live and shows the error under Deployments.

| To change | Open this file |
|---|---|
| Add, edit or hide **tours** | `src/content/tours.js` |
| The three **region pages** (Western, Eastern, Central Europe): their pictures and 20-photo galleries with captions | `src/content/regions.js` |
| **Pictures** behind each page title, home video, private-tour picture, podcast graphic, About photos, contact details, WhatsApp, LinkedIn, About text | `src/content/site.js` |
| **Podcast** episodes that play on the site, podcast platform links, phone numbers | `src/content/podcast.js` |
| **Articles and musings** (the download buttons) | `src/content/writings.js` |
| **Lectures**: recordings, links, lecture list | `src/content/lectures.js` |
| **Podcast sponsorship** page wording | `src/content/sponsor.js` |
| **Testimonials** | `src/content/testimonials.js` |

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
- The player on the Podcast page plays the episodes listed in `src/content/podcast.js` (newest first). To add a new episode, copy one line to the top and change the number, title, `id` and `slug` (instructions in the file).
- Optional: paste a Podbean "playlist" embed link into `site.js` > `podbeanEmbed` to show a whole-podcast player that updates by itself.
- Lecture recordings: upload `.mp3` files to `public/audio` and set `src` in `lectures.js`.

## Contact form
The form sends messages to `historyforthecurious@gmail.com` without opening anyone's email app.
- **Quickest:** do nothing. The first time anyone sends a message, FormSubmit emails the inbox a one-time "Activate" link. Click it once, and from then on every message arrives by email. Send a test message yourself after the site is live.
- **Alternative:** create a free key at web3forms.com using the inbox address, paste it into `site.js` > `web3formsKey`, and the form uses Web3Forms instead.

## Before moving the domain
Many pictures (and the logo) still load from the old website. Download them first and upload them to `public/img`, otherwise they disappear when the old site goes. The same goes for the documents in `public/docs`.
