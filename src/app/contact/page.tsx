"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SOCIALS = [
  { name: "YouTube", url: "https://youtube.com/@euginemicah", handle: "@euginemicah" },
  { name: "Instagram", url: "https://instagram.com/eugine.micah", handle: "@eugine.micah" },
  { name: "TikTok", url: "https://tiktok.com/@eugine.micah", handle: "@eugine.micah" },
  { name: "X", url: "https://x.com/eugineroylandz", handle: "@eugineroylandz" },
  { name: "LinkedIn", url: "https://linkedin.com/in/euginemicah", handle: "/in/euginemicah" },
  { name: "Muck Rack", url: "https://muckrack.com/eugine-micah/portfolio", handle: "Portfolio" },
];

export default function ContactPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader
        label="CONTACT"
        title="Let's build something together."
        subtitle="Bookings, interviews, collaborations, and media inquiries."
      />

      <section className="sect-pad" style={{ padding: "40px 40px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            {/* LEFT: INFO */}
            <div>
              {[
                { label: "BOOKING & SPEAKING", value: "euginemicah@gmail.com", href: "mailto:euginemicah@gmail.com" },
                { label: "PORTFOLIO", value: "muckrack.com/eugine-micah", href: "https://muckrack.com/eugine-micah/portfolio" },
                { label: "WEBSITE", value: "euginemicah.tech", href: "https://www.euginemicah.tech/" },
                { label: "LOCATION", value: "Nairobi, Kenya", href: "" },
              ].map((c, i) => (
                <div key={i} style={{ marginBottom: 32 }}>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 8 }}>{c.label}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.05rem", color: "#fff", borderBottom: "1px solid rgba(255,255,255,.15)", paddingBottom: 2, transition: "border-color .3s" }}>{c.value}</a>
                  ) : (
                    <div style={{ fontSize: "1.05rem" }}>{c.value}</div>
                  )}
                </div>
              ))}

              <div style={{ padding: "24px 28px", background: "rgba(0,229,160,.04)", border: "1px solid rgba(0,229,160,.12)", marginBottom: 32 }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "#00E5A0", textTransform: "uppercase", marginBottom: 10 }}>AVAILABLE FOR</div>
                <p style={{ fontSize: ".88rem", lineHeight: 1.7, color: "rgba(255,255,255,.45)" }}>
                  TV Hosting · Brand Collaborations · Speaking Engagements · Media Appearances · Podcast Interviews · Charity Partnerships · Digital Strategy Consulting
                </p>
              </div>
            </div>

            {/* RIGHT: SOCIALS + CTA */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 16 }}>CONNECT</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-pill" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 20px", border: "1px solid rgba(255,255,255,.06)",
                  }}>
                    <span style={{ fontWeight: 600, fontSize: ".95rem" }}>{s.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, color: "rgba(255,255,255,.3)" }}>{s.handle}</span>
                  </a>
                ))}
              </div>

              <a href="mailto:euginemicah@gmail.com?subject=Booking%20Inquiry" className="cta-btn" style={{
                display: "block", textAlign: "center", marginTop: 24,
                padding: "16px 32px", background: "#FF2D2D", color: "#000", border: "1px solid #FF2D2D",
                fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
              }}>SEND BOOKING INQUIRY →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
