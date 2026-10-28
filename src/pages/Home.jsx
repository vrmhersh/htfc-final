import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Image as ImageIcon } from "lucide-react";
import { site } from "../content/site.js";
import { WhatsAppLogo } from "../Logos.jsx";
import { Btn, Pic, Platforms, Quote, Reveal, TourRow, upcoming, useTitle } from "../ui.jsx";

export default function Home() {
  useTitle("");
  const [i, setI] = useState(0); const [pause, setPause] = useState(false);
  const video = !!site.heroVideo;
  useEffect(() => {
    if (pause || video) return;
    const id = setInterval(() => setI((x) => (x + 1) % site.slides.length), 6000); return () => clearInterval(id);
  }, [pause, video]);
  const next = upcoming().slice(0, 5);

  return (<>
    {/* HERO: background video if site.heroVideo is set, otherwise the slideshow */}
    <section className="hero" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}
      style={video && site.heroPoster ? { backgroundImage: `url("${site.heroPoster}")` } : undefined}>
      {video
        ? <video className="herovid" src={site.heroVideo} poster={site.heroPoster || undefined} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        : site.slides.map((s, k) => <div key={k} className={`slide ${k === i ? "on" : ""}`} style={{ backgroundImage: `url("${s.img}")` }} />)}
      <div className="shade" />
      {!video && site.showPlaceholders && <span className="phtag"><ImageIcon size={14} aria-hidden="true" /> Optional: a short background video can go here · site.js → heroVideo</span>}
      <div className="wrap hero-in">
        <p className="eyebrow">Rabbi Aubrey Hersh</p>
        <h1 className="serif">{video ? site.heroTitle : site.slides[i].text}</h1>
        <p className="sub">Jewish heritage tours, lectures and the History for the Curious podcast.</p>
        <div className="btns">
          <Btn to="/tours">View upcoming tours <ArrowRight size={18} /></Btn>
          <Btn href={site.whatsapp} className="ghost"><MessageCircle size={18} /> Join our WhatsApp group</Btn>
        </div>
        {!video && <div className="dots">{site.slides.map((_, k) => <button key={k} aria-label={`Slide ${k + 1}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>}
      </div>
    </section>

    {/* WhatsApp line: the whole sentence is a link, underlined when hovered */}
    <section className="band navy center">
      <Reveal className="wrap narrow2">
        <a className="wa-line serif" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          Join our exciting new WhatsApp group <WhatsAppLogo size={34} className="wa-ic" /> Weekly eye-opening insights, unique photos and behind the scenes images
        </a>
      </Reveal>
    </section>

    <section className="band green"><div className="wrap cards3">
      {[["Explore", "/tours", "Upcoming and past heritage tours", site.images.upcoming], ["Listen", "/podcast", "The History for the Curious podcast", site.images.pastStrip[1]], ["Read", "/writings", "Articles and musings", site.images.writings]].map(([t, to, d, im], k) =>
        <Reveal key={t} delay={k * 100}><Link to={to} className="tile"><img src={im} alt="" loading="lazy" /><h3 className="serif">{t}</h3><p>{d}</p></Link></Reveal>)}
    </div></section>

    <section className="band navy"><div className="wrap split">
      <Reveal><img className="round" src={site.images.upcoming} alt="Touring a historic synagogue" loading="lazy" /></Reveal>
      <Reveal delay={100}><h2 className="serif">Upcoming tours</h2>
        <div className="tlist">{next.map((t) => <TourRow key={t.id} t={t} />)}</div>
        <Btn to="/tours">All tours <ArrowRight size={18} /></Btn></Reveal>
    </div></section>

    <section className="band green center"><div className="wrap">
      <Reveal><h2 className="serif">Past tours</h2><p className="narrow mx">{site.pastCountries}</p></Reveal>
      <div className="strip">{site.images.pastStrip.map((s) => <img key={s} src={s} alt="" loading="lazy" />)}</div>
    </div></section>

    <section className="band navy"><Reveal className="wrap narrow">
      <h2 className="serif">About</h2><p>{site.about[0]}</p><p>{site.about[1]}</p>
      <div className="stats">{site.stats.map(([n, l]) => <div key={n}><b className="serif">{n}</b><span>{l}</span></div>)}</div>
      <Btn to="/about">Find out more <ArrowRight size={18} /></Btn>
    </Reveal></section>

    <section className="band green center"><Reveal className="wrap">
      <h2 className="serif">Articles and Musings</h2>
      <Link to="/writings" className="imglink" aria-label="Read the articles and musings">
        <Pic src={site.homeWritingsImage} alt="Articles and musings by Rabbi Aubrey Hersh" label="Articles and Musings picture" hint="site.js → homeWritingsImage" ratio="16/9" />
      </Link>
    </Reveal></section>

    <section className="band navy center"><Reveal className="wrap">
      <h2 className="serif">Listen to the podcast</h2><Platforms />
      <div className="btns mid"><Btn to="/podcast">Play episodes <ArrowRight size={18} /></Btn></div>
    </Reveal></section>
    <Quote />
  </>);
}
