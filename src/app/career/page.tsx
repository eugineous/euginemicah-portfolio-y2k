"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const TIMELINE = [
  { year: "2026", title: "Head of Digital Operations", org: "PPP TV Kenya", type: "CURRENT", desc: "Leading digital strategy. 700K+ YouTube subscribers. 20M+ monthly views." },
  { year: "2026", title: "Tushinde.com", org: "Charity Platform", type: "LAUNCH", desc: "Launched Tushinde.com for the Twende Tusaidie Tushinde charity initiative." },
  { year: "2025", title: "LinkedIn Newsletter", org: "Digital Publishing", type: "MEDIA", desc: "Launched Unfiltered with Eugine Micah covering AI in Africa and media strategy." },
  { year: "2024", title: "Male TikToker of the Year Nominee", org: "People Choice Awards Kenya", type: "AWARD", desc: "Recognized for innovative content on TikTok." },
  { year: "2024", title: "Valedictorian", org: "TIBS College", type: "EDUCATION", desc: "Top academic performance. Studied broadcast journalism and digital communication." },
  { year: "2024", title: "Published Author \u2014 Born Broke Built Loud", org: "Memoir", type: "BOOK", desc: "14,000+ word memoir from Manyonyi Village to national television." },
  { year: "2023", title: "Global Cyber Alliance Contributor", org: "International Publication", type: "PRESS", desc: "Contributed to toolkit on journalist safety and digital ethics." },
  { year: "2022", title: "Reporter \u2014 Citizen TV", org: "Royal Media Services", type: "CAREER", desc: "Four-month stint at Kenya\u2019s most prestigious media organization." },
  { year: "2022", title: "Founded Roylandz SMMA", org: "Roylandz Media", type: "BUSINESS", desc: "Social media marketing agency for businesses." },
  { year: "2021", title: "The Overview Show \u2014 First Broadcast", org: "YouTube & Facebook", type: "ORIGIN", desc: "Co-founded with Elijah Maingi. The beginning of everything." },
];

const TYPE_COLORS: Record<string, string> = {
  CURRENT: "#FF2D2D", LAUNCH: "#00E5A0", MEDIA: "#A855F7", AWARD: "#FFB800",
  EDUCATION: "#00B4FF", BOOK: "#FF6B35", PRESS: "#00E5A0", CAREER: "#FF2D2D",
  BUSINESS: "#FFB800", ORIGIN: "#A855F7",
};

const WORK_HISTORY = [
  { company: "PPP TV", role: "TV Presenter, Head of Digital, Creative Lead", period: "2024 \u2013 Present", description: "Co-host Urban News and Campus Xposure. Lead digital growth, packaging, analytics, and shortform systems." },
  { company: "Citizen TV", role: "News Reporter", period: "2022 \u2013 2023", description: "Field reports, live hits, and bulletins on politics, community, and youth issues at Royal Media Services." },
  { company: "Roylandz Media", role: "Founder & CEO", period: "2020 \u2013 Present", description: "Shows, podcasts, and branded content for youth and culture. The Nairobi Podcast, Hoods Finest, and more." },
  { company: "TIBS TV & FM", role: "TV and Radio Host", period: "2020 \u2013 2022", description: "Campus shows including TIBS Got Talent, Rhumba Jouissance, and The Overview Show." },
  { company: "Base Radio", role: "Radio Host & Social Media", period: "2023", description: "Interactive drive-time show blending news, music, and real-time conversations." },
];

export default function CareerPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader
        label="CAREER"
        title="Career Timeline"
        subtitle="From campus radio to national television. A journey of persistence, growth, and impact."
      />

      {/* STATS BAR */}
      <section style={{ padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[
              { value: "2021", label: "Career Started", accent: "#A855F7" },
              { value: "5+", label: "Organizations", accent: "#FF2D2D" },
              { value: "6", label: "Active Shows", accent: "#FFB800" },
              { value: "700K+", label: "YouTube Subscribers", accent: "#00E5A0" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "28px 20px", background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2rem", fontWeight: 400, color: s.accent, lineHeight: 1, marginBottom: 6, fontStyle: "italic" }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="sect-pad" style={{ padding: "80px 40px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>WORK EXPERIENCE</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.8rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, marginBottom: 48 }}>Positions held</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {WORK_HISTORY.map((job, i) => (
              <div key={i} className="info-card" style={{ padding: "28px 32px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 2 }}>{job.company}</h3>
                    <div style={{ fontSize: ".9rem", color: "#FF2D2D" }}>{job.role}</div>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.25)" }}>{job.period}</span>
                </div>
                <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "rgba(255,255,255,.4)" }}>{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="sect-pad" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>JOURNEY</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.8rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, marginBottom: 56 }}>Key milestones</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} className="tl-entry" style={{
                display: "flex", gap: 24, padding: "28px 20px 28px 0",
                borderBottom: "1px solid rgba(255,255,255,.04)", position: "relative",
              }}>
                <div style={{ width: 80, flexShrink: 0, position: "relative", textAlign: "right", paddingRight: 24 }}>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.3)", letterSpacing: 1 }}>{t.year}</span>
                  <div className="tl-dot" style={{
                    position: "absolute", right: -5, top: 8, width: 9, height: 9, borderRadius: "50%",
                    background: i === 0 ? "#FF2D2D" : "rgba(255,255,255,.15)", border: "2px solid #000",
                    color: TYPE_COLORS[t.type] || "#fff",
                  }}/>
                  {i < TIMELINE.length - 1 && <div style={{ position: "absolute", right: -1, top: 20, width: 1, height: "calc(100% + 16px)", background: "rgba(255,255,255,.06)" }}/>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{
                      padding: "2px 8px", background: `${TYPE_COLORS[t.type]}10`, border: `1px solid ${TYPE_COLORS[t.type]}25`,
                      fontFamily: "'JetBrains Mono'", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: TYPE_COLORS[t.type], textTransform: "uppercase",
                    }}>{t.type}</span>
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 4 }}>{t.title}</h3>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 8 }}>{t.org}</div>
                  <p style={{ fontSize: ".85rem", lineHeight: 1.65, color: "rgba(255,255,255,.4)" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
