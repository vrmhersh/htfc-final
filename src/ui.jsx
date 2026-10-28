// Shared building blocks used by every page. You should not need to edit this file to change content.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { site } from "./content/site.js";
import { tours } from "./content/tours.js";
import { platforms } from "./content/podcast.js";
import { SpotifyLogo, YouTubeLogo, AppleLogo } from "./Logos.jsx";

/* ---------- tours: sorting and dates ---------- */
export const today = () => new Date().toISOString().slice(0, 10);
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function dates(t) {
  const [a, b] = [t.start, t.end].map((d) => new Date(d + "T12:00:00"));
  const sameM = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const y = a.getFullYear() !== new Date().getFullYear() ? ` ${a.getFullYear()}` : "";
  return a.getTime() === b.getTime() ? `${a.getDate()} ${MON[a.getMonth()]}${y}`
    : sameM ? `${a.getDate()} – ${b.getDate()} ${MON[b.getMonth()]}${y}`
    : `${a.getDate()} ${MON[a.getMonth()]} – ${b.getDate()} ${MON[b.getMonth()]}${y}`;
}
export const visibleTours = tours.filter((t) => !t.hidden).sort((a, b) => a.start.localeCompare(b.start));
export const upcoming = () => visibleTours.filter((t) => t.end >= today());
export const past = () => visibleTours.filter((t) => t.end < today()).reverse();
export const LABEL = { soldout: "Sold out", private: "Private trip", waitlist: "Waiting list" };

/* ---------- small helpers ---------- */
export const useTitle = (t) => useEffect(() => {
  document.title = t ? `${t} | ${site.name}` : `${site.name} | Jewish Heritage Tours with Rabbi Aubrey Hersh`;
}, [t]);

export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null); const [on, setOn] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return setOn(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.12 });
    io.observe(ref.current); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export const Btn = ({ to, href, children, className = "", ...p }) => href
  ? <a className={`btn ${className}`} href={href} target="_blank" rel="noopener noreferrer" {...p}>{children}</a>
  : <Link className={`btn ${className}`} to={to} {...p}>{children}</Link>;

/* ---------- picture placeholders ---------- */
export function Ph({ label, hint, ratio = "4/3", className = "" }) {
  return (
    <div className={`ph ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} role="img" aria-label={label}>
      <ImageIcon size={30} aria-hidden="true" /><b>{label}</b>
      {site.showPlaceholders && hint && <small>{hint}</small>}
    </div>
  );
}
// Shows the picture when a link is set, otherwise a labelled placeholder.
export const Pic = ({ src, alt = "", label, hint, ratio, className = "", ...p }) =>
  src ? <img className={className} src={src} alt={alt} loading="lazy" {...p} /> : <Ph label={label} hint={hint} ratio={ratio} className={className} />;

/* ---------- page banner (the picture behind each page title) ---------- */
export function Banner({ title, img, hint, children }) {
  return (
    <section className={`pagehead${img ? "" : " noimg"}`} style={img ? { backgroundImage: `url("${img}")` } : undefined}>
      <div className="shade" />
      <div className="pagehead-in"><h1 className="serif">{title}</h1>{children}</div>
      {!img && site.showPlaceholders && hint && <span className="phtag"><ImageIcon size={14} aria-hidden="true" /> Banner picture goes here · {hint}</span>}
    </section>
  );
}
export function Page({ title, tab, img, hint, children }) {
  useTitle(tab || title);
  return <><Banner title={title} img={img} hint={hint} />{children}</>;
}

/* ---------- slideshow (About page) ---------- */
export function Slideshow({ items, label, hint }) {
  const n = items.length; const [i, setI] = useState(0); const [hold, setHold] = useState(false);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (hold || reduce || n < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 5500); return () => clearInterval(id);
  }, [hold, reduce, n]);
  if (!n) return null;
  const go = (d) => setI((x) => (x + d + n) % n);
  return (
    <div className="show" role="region" aria-roledescription="carousel" aria-label={label}
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <div className="show-stage">
        {items.map((p, k) => (
          <figure key={k} className={`show-slide${k === i ? " on" : ""}`} aria-hidden={k !== i}>
            {p.img ? <img src={p.img} alt={p.caption || ""} loading={k ? "lazy" : "eager"} /> : <Ph label={`Photo ${k + 1}`} hint={hint} ratio={null} className="fill" />}
          </figure>
        ))}
        {n > 1 && <>
          <button className="show-nav prev" aria-label="Previous photo" onClick={() => go(-1)}><ChevronLeft /></button>
          <button className="show-nav next" aria-label="Next photo" onClick={() => go(1)}><ChevronRight /></button></>}
      </div>
      <p className="show-cap" aria-live="polite">{items[i].caption}</p>
      {n > 1 && <div className="dots mid">{items.map((_, k) => <button key={k} aria-label={`Photo ${k + 1}`} aria-current={k === i} className={k === i ? "on" : ""} onClick={() => setI(k)} />)}</div>}
    </div>
  );
}

/* ---------- picture gallery with captions (region pages) ---------- */
export function Gallery({ items, hint }) {
  return (
    <ul className="gallery">
      {items.map((p, k) => (
        <li key={k}><figure>
          {p.img
            ? <a href={p.img} target="_blank" rel="noopener noreferrer" aria-label={`Open picture: ${p.caption}`}><img src={p.img} alt={p.caption || ""} loading="lazy" /></a>
            : <Ph label={`Photo ${k + 1}`} hint={k === 0 ? hint : undefined} ratio="4/3" />}
          <figcaption>{p.caption}</figcaption>
        </figure></li>
      ))}
    </ul>
  );
}

/* ---------- tours ---------- */
export const Status = ({ t }) => <>{t.status !== "open" && LABEL[t.status] && <span className={`pill ${t.status}`}>{LABEL[t.status]}</span>}{t.note && <span className="pill note">{t.note}</span>}</>;
export const TourRow = ({ t }) => (
  <Link className="trow link" to={`/tours/${t.id}`}>
    <span className="d">{dates(t)}</span><span className="n">{t.title} <Status t={t} /></span><ArrowRight size={18} aria-hidden="true" />
  </Link>
);

/* ---------- writings ---------- */
export const DocList = ({ title, items }) => (
  <div><h2 className="serif">{title}</h2>
    <ul className="doclist">{items.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer">{t}</a></li>)}</ul></div>
);

/* ---------- podcast platform buttons with their own logos ---------- */
function Logo24() {
  const [bad, setBad] = useState(!site.logo24);
  return bad ? <span className="plat-name">24Six</span> : <img className="plat24" src={site.logo24} alt="24Six" height="28" onError={() => setBad(true)} />;
}
const LOGO = { youtube: <YouTubeLogo />, apple: <AppleLogo />, spotify: <SpotifyLogo /> };
export const Platforms = () => (
  <div className="plats">
    {platforms.map(([name, url, key]) => (
      <a key={name} className="plat" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Listen on ${name}`}>
        {key === "24six" ? <Logo24 /> : <>{LOGO[key]}<span className="plat-name">{name}</span></>}
      </a>
    ))}
  </div>
);

export const Quote = () => (
  <section className="band navy center"><Reveal className="wrap"><p className="bigq serif">“{site.tagline}”</p><Btn to="/contact">Get in touch <ArrowRight size={18} /></Btn></Reveal></section>
);
