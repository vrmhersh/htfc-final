import { useEffect, useState } from "react";
import { Link, NavLink, Routes, Route, useLocation } from "react-router-dom";
import { Menu, X, Linkedin } from "lucide-react";
import { site } from "./content/site.js";
import { WhatsAppLogo } from "./Logos.jsx";
import Home from "./pages/Home.jsx";
import { NotFound, Region, TourPage, Tours } from "./pages/Tours.jsx";
import { Podcast, Sponsor } from "./pages/Podcast.jsx";
import { About, Lectures, Testimonials, Writings } from "./pages/Pages.jsx";
import Contact from "./pages/Contact.jsx";

const NAV = [["/", "Home"], ["/tours", "Tours"], ["/podcast", "Podcast"], ["/lectures", "Lectures"], ["/writings", "Writings"], ["/testimonials", "Testimonials"], ["/about", "About"], ["/contact", "Contact"]];

function Header() {
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => { setOpen(false); if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30); on();
    window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`header${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="bar">
        <Link to="/" className="logo" aria-label={`${site.name} home`}><img src={site.logo} alt={site.name} /></Link>
        <nav className={open ? "open" : ""} aria-label="Main">
          {NAV.map(([to, t]) => <NavLink key={to} to={to} end={to === "/"}>{t}</NavLink>)}
        </nav>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="wrap">
      <div className="frow"><div className="fbrand"><h3 className="serif">{site.name}</h3>
          <div className="fsocial">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Join our WhatsApp group"><WhatsAppLogo size={26} /></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={24} /></a>
          </div></div>
        <div className="flinks">
          {[["/", "Home"], ["/tours", "Tours"], ["/podcast", "Podcast"], ["/lectures", "Lectures"], ["/writings", "Writings"], ["/about", "About"], ["/contact", "Contact"], ["/sponsor", "Sponsor the podcast"]].map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}
        </div>
      </div>
      <div className="fbot"><span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span></div>
    </div></footer>
  );
}

export default function App() {
  return (<>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/region/:slug" element={<Region />} />
        <Route path="/tours/:id" element={<TourPage />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/writings" element={<Writings />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </>);
}
