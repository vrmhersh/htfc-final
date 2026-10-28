import { Link, useParams } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "../content/site.js";
import { tours } from "../content/tours.js";
import { regions } from "../content/regions.js";
import { WhatsAppLogo } from "../Logos.jsx";
import { Btn, Gallery, Page, Pic, Reveal, Status, TourRow, dates, past, today, upcoming } from "../ui.jsx";

const WaBtn = () => <Btn href={site.whatsapp} className="ghost"><WhatsAppLogo size={20} className="wa-ic" /> Join our WhatsApp group</Btn>;

export function NotFound() {
  return <Page title="Page not found"><section className="band navy"><div className="wrap narrow center">
    <p>Sorry, we could not find that page. It may have moved when the website was rebuilt.</p>
    <div className="btns mid"><Btn to="/">Home</Btn><Btn to="/tours" className="ghost">Tours</Btn></div></div></section></Page>;
}

/* ===== /tours : upcoming tours, then past tours, then the three region pictures ===== */
export function Tours() {
  const up = upcoming(), pa = past();
  return (<Page title="Tours" img={site.pageImages.tours} hint="site.js → pageImages.tours">
    <section className="band navy"><div className="wrap narrow">
      <h2 className="serif">Upcoming tours</h2>
      <div className="tlist">{up.length ? up.map((t) => <TourRow key={t.id} t={t} />) : <p>New tours will be announced soon. Join the WhatsApp group to hear first.</p>}</div>
    </div></section>

    <section className="band green"><div className="wrap narrow">
      <h2 className="serif">Past tours</h2><p>{site.pastCountries}</p>
      {pa.length > 0 && <div className="tlist dim">{pa.map((t) => <TourRow key={t.id} t={t} />)}</div>}
    </div></section>

    <section className="band navy"><div className="wrap"><div className="cards3">
      {regions.map((r, k) =>
        <Reveal key={r.slug} delay={k * 100}>
          <Link to={`/tours/region/${r.slug}`} className="tile">
            <Pic src={r.img} alt="" label={r.title} hint="src/content/regions.js → img" ratio="4/3" />
            <h3 className="serif">{r.title}</h3>
          </Link>
        </Reveal>)}
    </div></div></section>

    <section className="band green"><div className="wrap narrow center">
      {site.toursIntro.map((p) => <p key={p}>{p}</p>)}
      <div className="btns mid"><WaBtn /></div>
    </div></section>
  </Page>);
}

/* ===== /tours/region/western-europe etc : a gallery of pictures with captions, nothing else ===== */
export function Region() {
  const { slug } = useParams(); const r = regions.find((x) => x.slug === slug);
  if (!r) return <NotFound />;
  return (<Page title={r.title} tab={`${r.title} photos`} img={r.img} hint="src/content/regions.js → img">
    <section className="band navy"><div className="wrap"><Gallery items={r.gallery} hint="src/content/regions.js → gallery" /></div></section>
  </Page>);
}

/* ===== /tours/some-tour : every tour has its own page ===== */
export function TourPage() {
  const { id } = useParams(); const t = tours.find((x) => x.id === id && !x.hidden);
  if (!t) return <NotFound />;
  const priv = t.status === "private"; const over = t.end < today();
  const banner = priv ? site.privateImage : (t.image || site.pageImages.tours);
  const full = t.status === "soldout" || t.status === "waitlist";
  const enquiry = `/contact?tour=${encodeURIComponent(`${t.title} (${dates(t)})`)}`;
  const hasInfo = t.summary || (t.details && t.details.length) || t.leaders || t.price;
  return (<Page title={t.title} img={banner} hint={priv ? "site.js → privateImage (shared by all private tours)" : "this tour's image in src/content/tours.js"}>
    <section className="band navy"><div className="wrap narrow">
      <p className="eyebrow">{dates(t)} <Status t={t} /></p>
      {priv ? <>
        <p className="lead">{site.privateText}</p>
        <div className="btns"><Btn href={site.whatsappPm}><WhatsAppLogo size={20} className="wa-ic dark" /> WhatsApp {site.whatsappPmDisplay}</Btn>
          <Btn href={`mailto:${site.adminEmail}`} className="ghost"><Mail size={18} /> {site.adminEmail}</Btn></div>
      </> : <>
        {t.summary && <p className="lead">{t.summary}</p>}
        {(t.details || []).map((p) => <p key={p}>{p}</p>)}
        {t.leaders && <p><b>Accompanied by:</b> {t.leaders}</p>}
        {t.price && <p><b>Price:</b> {t.price}</p>}
        {!hasInfo && <p>Full details for this tour will be added soon. To ask a question or register your interest, please get in touch.</p>}
        {t.gallery && t.gallery.length > 0 && <div className="strip">{t.gallery.map((s) => <img key={s} src={s} alt={t.title} loading="lazy" />)}</div>}
        {over ? <p className="muted">This tour has taken place. See the upcoming tours for what is next.</p>
          : <div className="btns"><Btn to={enquiry}>{full ? "Join the waiting list" : "Register interest"} <ArrowRight size={18} /></Btn></div>}
      </>}
      <div className="btns"><Btn to="/tours" className="ghost">All tours</Btn></div>
    </div></section>
  </Page>);
}
