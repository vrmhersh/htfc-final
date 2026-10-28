import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "../content/site.js";
import { WhatsAppLogo } from "../Logos.jsx";
import { Btn, Page } from "../ui.jsx";

const TOPICS = ["Tour enquiry", "Speaking engagement", "Podcast sponsorship", "Podcast feedback", "Other"];

// Sends the message to your inbox without opening anyone's email app.
// 1) With a Web3Forms key in site.js it uses Web3Forms.  2) Without one it uses FormSubmit (free; the first test message asks the inbox owner to click "Activate").
async function deliver(f) {
  const subject = `${f.topic || "Enquiry"} from ${f.name}`;
  const base = { name: f.name, email: f.email, phone: f.phone || "-", topic: f.topic || "-", message: f.message };
  const url = site.web3formsKey ? "https://api.web3forms.com/submit" : `https://formsubmit.co/ajax/${site.email}`;
  const body = site.web3formsKey
    ? { access_key: site.web3formsKey, subject, from_name: site.name, ...base }
    : { _subject: subject, _template: "table", _captcha: "false", ...base };
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
  const r = await res.json().catch(() => ({}));
  return { ok: res.ok && (r.success === true || r.success === "true"), msg: r.message };
}

export default function Contact() {
  const [q] = useSearchParams(); const tour = q.get("tour"); const topic = q.get("topic");
  const [f, setF] = useState({ name: "", email: "", phone: "", topic: tour ? "Tour enquiry" : TOPICS.includes(topic) ? topic : "", message: tour ? `I would like to find out more about: ${tour}.` : "" });
  const [st, setSt] = useState({ s: "idle", msg: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (new FormData(e.target).get("_honey")) return; // bots fill this hidden field
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) return setSt({ s: "bademail" });
    setSt({ s: "sending" });
    try {
      const r = await deliver({ ...f, email: f.email.trim() });
      if (r.ok) { setSt({ s: "sent" }); setF({ name: "", email: "", phone: "", topic: "", message: "" }); }
      else setSt({ s: "error", msg: r.msg });
    } catch { setSt({ s: "error" }); }
  }

  return (<Page title="Contact" img={site.pageImages.contact} hint="site.js → pageImages.contact">
    <section className="band navy"><div className="wrap two">
      <form onSubmit={submit}>
        <input type="text" name="_honey" tabIndex="-1" autoComplete="off" style={{ display: "none" }} />
        <label><span className="lbl">Full name <i aria-hidden="true">*</i></span><input required autoComplete="name" value={f.name} onChange={set("name")} /></label>
        <label><span className="lbl">Email <i aria-hidden="true">*</i></span><input required type="email" autoComplete="email" value={f.email} onChange={set("email")} /></label>
        <label><span className="lbl">Phone (optional)</span><input type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} /></label>
        <label><span className="lbl">What is your enquiry about?</span>
          <select value={f.topic} onChange={set("topic")}><option value="">Select an option</option>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label><span className="lbl">Message <i aria-hidden="true">*</i></span><textarea required rows="5" value={f.message} onChange={set("message")} /></label>
        <button className="btn" disabled={st.s === "sending"}>{st.s === "sending" ? "Sending..." : "Send message"} <ArrowRight size={18} /></button>
        {st.s === "sent" && <p className="msg ok" role="status">Thank you, your message has been sent. We will be in touch soon.</p>}
        {st.s === "bademail" && <p className="msg bad" role="alert">Please enter a valid email address.</p>}
        {st.s === "error" && <p className="msg bad" role="alert">Sorry, that did not send{st.msg ? ` (${st.msg})` : ""}. Please email <a href={`mailto:${site.email}`}>{site.email}</a> directly.</p>}
      </form>

      <div className="info">
        <h2 className="serif">Get in touch</h2>
        <p className="lead2">Whether you are enquiring about a heritage tour, arranging a speaking engagement or exploring a podcast sponsorship, we would love to hear from you. Send a message with the form, or reach us directly below.</p>
        <ul className="clist">
          <li><Mail size={20} /><span>Email: <a href={`mailto:${site.email}`}>{site.email}</a></span></li>
          <li><Mail size={20} /><span>Speaking arrangements: <a href={`mailto:${site.email}`}>{site.email}</a></span></li>
          <li><Mail size={20} /><span>Admin: <a href={`mailto:${site.adminEmail}`}>{site.adminEmail}</a></span></li>
          <li><Phone size={20} /><span>Phone: <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></span></li>
          <li><WhatsAppLogo size={22} /><span><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">Join our WhatsApp group</a></span></li>
          <li><WhatsAppLogo size={22} /><span>Message us on WhatsApp: <a href={site.whatsappPm} target="_blank" rel="noopener noreferrer">{site.whatsappPmDisplay}</a></span></li>
          <li><Linkedin size={20} /><span><a href={site.linkedin} target="_blank" rel="noopener noreferrer">Rabbi Aubrey Hersh on LinkedIn</a></span></li>
        </ul>
        <div className="btns"><Btn to="/sponsor" className="ghost">Sponsor the podcast <ArrowRight size={18} /></Btn></div>
      </div>
    </div></section>
  </Page>);
}
