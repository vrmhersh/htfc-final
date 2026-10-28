import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { site } from "../content/site.js";
import { podcastIntro, podcastSub, featured, guests, phones, episodes } from "../content/podcast.js";
import { sponsor } from "../content/sponsor.js";
import { Btn, Page, Pic, Platforms, Reveal } from "../ui.jsx";

const player = (id) => `https://www.podbean.com/player-v2/?i=${id}-pb&from=pb6admin&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&btn-skin=7&size=150`;

export function Podcast() {
  const [k, setK] = useState(0); const cur = episodes[k];
  return (<Page title="Podcast" img={site.pageImages.podcast} hint="site.js → pageImages.podcast">
    <section className="band green center"><div className="wrap">
      <Reveal>
        <h2 className="serif">{podcastIntro}</h2>
        <p className="sub2">{podcastSub}</p>
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
          <iframe key={cur.id} className="player" title={`Podbean player: ${cur.title}`} src={player(cur.id)} width="100%" height="150" loading="lazy" scrolling="no" allow="autoplay" />
          <p className="nowplaying">Now showing: <b>#{cur.n} {cur.title}</b></p>
          <ul className="eplist" aria-label="Choose an episode">
            {episodes.map((e, i) => <li key={e.id}>
              <button className={i === k ? "on" : ""} onClick={() => setK(i)} aria-current={i === k}><span>#{e.n}</span>{e.title}</button>
              <a href={`${site.podbeanUrl}e/${e.slug}/`} target="_blank" rel="noopener noreferrer" aria-label={`Open episode ${e.n} on Podbean`}><ExternalLink size={16} /></a>
            </li>)}
          </ul></>}
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
