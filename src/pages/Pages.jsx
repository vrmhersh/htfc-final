import { ArrowRight } from "lucide-react";
import { site } from "../content/site.js";
import { testimonials } from "../content/testimonials.js";
import { articles, musings } from "../content/writings.js";
import { recordings, links, lectureList } from "../content/lectures.js";
import { Btn, DocList, Page, Pic, Quote, Slideshow } from "../ui.jsx";

/* ===== Lectures ===== */
export function Lectures() {
  let n = 0; // numbering carries on across the groups
  return (<Page title="Lectures" img={site.pageImages.lectures} hint="site.js → pageImages.lectures">
    <section className="band navy"><div className="wrap two cards2">
      {[["Shiurim, Interviews & Links", "#shiurim", 0], ["Lecture List", "#list", 1]].map(([t, h, k]) =>
        <a key={t} href={h} className="tile"><Pic src={site.lectureImages[k]} alt="" label={t} hint="site.js → lectureImages" ratio="16/10" /><h3 className="serif">{t}</h3></a>)}
    </div></section>

    <section id="shiurim" className="band green"><div className="wrap narrow">
      <h2 className="serif">Shiurim, Interviews & Links</h2>
      <div className="audios">{recordings.map((r) => <figure key={r.title}>
        {r.src ? <audio controls preload="none" src={r.src} /> : <p className="soon">Audio coming soon</p>}
        <figcaption>{r.title}</figcaption></figure>)}</div>
      <div className="btns mid">{links.map((l) => <Btn key={l.url} href={l.url} className="ghost">{l.title} <ArrowRight size={18} /></Btn>)}</div>
    </div></section>

    <section id="list" className="band navy"><div className="wrap narrow">
      <h2 className="serif">Lecture List</h2>
      {lectureList.map((g) => <div key={g.heading} className="lgroup"><h3 className="serif caps">{g.heading}</h3>
        <ol className="lecs">{g.items.map((it) => <li key={it} value={++n}>{it}</li>)}</ol></div>)}
      <div className="btns"><Btn to="/contact?topic=Speaking%20engagement">Speaking engagements <ArrowRight size={18} /></Btn></div>
    </div></section>
  </Page>);
}

/* ===== Writings ===== */
export const Writings = () => (
  <Page title="Writings" img={site.pageImages.writings} hint="site.js → pageImages.writings">
    <section className="band green"><div className="wrap two"><DocList title="Articles" items={articles} /><DocList title="Musings" items={musings} /></div></section>
  </Page>
);

/* ===== Testimonials ===== */
export const Testimonials = () => (
  <Page title="Testimonials" img={site.pageImages.testimonials} hint="site.js → pageImages.testimonials">
    <section className="band green"><div className="wrap narrow">
      {[...testimonials].sort((a, b) => b.year - a.year).map((y) => <div key={y.year} className="year"><h2 className="serif">{y.year}</h2>
        {y.quotes.map(([q, nm]) => <blockquote key={q}>“{q}”<cite>{nm}</cite></blockquote>)}</div>)}
    </div></section>
  </Page>
);

/* ===== About (with slideshow) ===== */
export const About = () => (
  <Page title="About" img={site.pageImages.about} hint="site.js → pageImages.about">
    <section className="band navy"><div className="wrap two">
      <div>{site.about.map((p) => <p key={p}>{p}</p>)}
        <div className="stats">{site.stats.map(([n, l]) => <div key={n}><b className="serif">{n}</b><span>{l}</span></div>)}</div></div>
      <Slideshow items={site.aboutPhotos} label="Photos of Rabbi Aubrey Hersh" hint="site.js → aboutPhotos" />
    </div></section>
    <Quote />
  </Page>
);
