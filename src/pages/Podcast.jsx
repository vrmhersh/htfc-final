import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { site } from "../content/site.js";
import { podcastIntro, podcastSub, featured, guests, phones } from "../content/podcast.js";
import feed from "../content/episodes.json";
import { sponsor } from "../content/sponsor.js";
import { Btn, Page, Pic, Platforms, Reveal } from "../ui.jsx";

const player = (id) => `https://www.podbean.com/player-v2/?i=${id}-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&btn-skin=7&size=150`;

const episodes = feed.episodes || [];
const count = Math.max(episodes.length, ...episodes.map((e) => e.n || 0)); // the highest episode number, or how many there are
const when = (d) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
const FIRST = 12; // how many episodes show before "Show more"

export function Podcast() {
  const [id, setId] = useState(episodes[0] && episodes[0].link); const [find, setFind] = useState(""); const [more, setMore] = useState(FIRST);
  const cur = episodes.find((e) => e.link === id) || episodes[0];
  const words = find.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const hits = words.length ? episodes.filter((e) => words.every((w) => `#${e.n || ""} ${e.title}`.toLowerCase().includes(w))) : episodes;
  const shown = hits.slice(0, more);
  return (<Page title="Podcast" img={site.pageImages.podcast} hint="site.js → pageImages.podcast">
    <section className="band green center"><div className="wrap">
      <Reveal>
        <h2 className="serif">{podcastIntro}</h2>
        <p className="sub2">{podcastSub.replace("{count}", count)}</p>
        <div className="pgraphic">
          <Pic src={site.podcastGraphic} alt="Some of the episodes: Yishmael vs Yisrael, Ramchal, The French Revolution, Where is the Menorah?, Oral Law, The Rothschilds, Holocaust Shadows, Origins of Christianity, American Beginnings, Rabbi Akiva Eger"
            label="Podcast episode names graphic" hint="site.js → podcastGraphic" ratio="16/9" />
        </div>
        {!site.podcastGraphic && <div className="chips">{featured.map((f) => <span key={f}>{f}</span>)}</div>}
        <h2 className="serif guests">{guests}</h2>
      </Reveal>
    </div></section>

    <section className="band navy"><div className="wrap narrow">
      <h2 className="serif center">Listen here</h2>
      {site.podbeanEmbed
        ? <iframe className="player" title="History for the Curious podcast player" src={site.podbeanEmbed} width="100%" height="315" loading="lazy" allow="autoplay" />
        : cur && <>
          {/* Episodes from the feed play in the site's own player; the older hand-listed ones use the Podbean player. */}
          {cur.audio ? <audio key={cur.link} className="aplayer" controls preload="none" src={cur.audio} />
            : cur.podbeanId && <iframe key={cur.podbeanId} className="player" title={`Podbean player: ${cur.title}`} src={player(cur.podbeanId)} width="100%" height="150" loading="lazy" scrolling="no" allow="autoplay" />}
          <p className="nowplaying">Now showing: <b>{cur.n ? `#${cur.n} ` : ""}{cur.title}</b></p>
          {episodes.length > FIRST && <input className="epfind" type="search" value={find} onChange={(e) => { setFind(e.target.value); setMore(FIRST); }}
            placeholder={`Search all ${episodes.length} episodes`} aria-label="Search episodes" />}
          <ul className="eplist" aria-label="Choose an episode">
            {shown.map((e) => <li key={e.link}>
              <button className={e === cur ? "on" : ""} onClick={() => setId(e.link)} aria-current={e === cur}>
                {e.n ? <span>#{e.n}</span> : null}<b>{e.title}</b>{e.date && <i className="epmeta">{when(e.date)}</i>}</button>
              <a href={e.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${e.n ? `episode ${e.n}` : e.title} on Podbean`}><ExternalLink size={16} /></a>
            </li>)}
          </ul>
          {!shown.length && <p className="muted">No episode matches that search.</p>}
          {hits.length > more && <div className="btns mid"><button className="btn ghost" onClick={() => setMore(more + 24)}>Show more episodes</button></div>}
        </>}
      <div className="btns mid"><Btn href={site.podbeanUrl}>All episodes on Podbean <ArrowRight size={18} /></Btn></div>
    </div></section>

    <section className="band green center"><div className="wrap">
      <Reveal><h2 className="serif">Listen on</h2><Platforms />
        <p className="phones">{phones.map(([c, n], i) => <span key={c}>{i ? <i aria-hidden="true">  |  </i> : null}{c}: <a href={`tel:${n.replace(/\s/g, "")}`}>{n}</a></span>)}</p>
      </Reveal>
    </div></section>

    <section className="band navy center"><Reveal className="wrap narrow">
      <h2 className="serif">Sponsor the podcast</h2><p>Reach thousands of curious listeners every week.</p>
      <div className="btns mid"><Btn to="/sponsor">Sponsorship information <ArrowRight size={18} /></Btn></div>
    </Reveal></section>
  </Page>);
}

/* ===== /sponsor : edit the words in src/content/sponsor.js ===== */
export function Sponsor() {
  return (<Page title="Sponsor the Podcast" tab="Sponsor the podcast" img={site.pageImages.sponsor} hint="site.js → pageImages.sponsor">
    <section className="band navy"><Reveal className="wrap narrow center">
      <p className="lead">{sponsor.intro}</p>
      <div className="stats">{sponsor.numbers.map(([n, l]) => <div key={l}><b className="serif">{n}</b><span>{l}</span></div>)}</div>
    </Reveal></section>

    <section className="band green"><div className="wrap">
      <Reveal><h2 className="serif center">Why partner with us</h2></Reveal>
      <div className="cards3 info3">{sponsor.why.map(([t, d], i) => <Reveal key={t} delay={i * 100}><div className="card"><h3 className="serif">{t}</h3><p>{d}</p></div></Reveal>)}</div>
    </div></section>

    <section className="band navy"><div className="wrap">
      <Reveal><h2 className="serif center">Ways to get involved</h2></Reveal>
      <div className="cards3 info3">{sponsor.options.map(([t, d], i) => <Reveal key={t} delay={i * 100}><div className="card outline"><h3 className="serif">{t}</h3><p>{d}</p></div></Reveal>)}</div>
    </div></section>

    <section className="band green center"><Reveal className="wrap narrow">
      <p className="lead">{sponsor.closing}</p>
      <div className="btns mid"><Btn to="/contact?topic=Podcast%20sponsorship">Enquire about sponsorship <ArrowRight size={18} /></Btn><Btn to="/podcast" className="ghost">Hear the podcast</Btn></div>
    </Reveal></section>
  </Page>);
}
