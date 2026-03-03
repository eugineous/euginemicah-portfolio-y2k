"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";

export default function AboutPage() {
  const SKILLS_TOOLS = ["iZotope", "Adobe Audition", "Adobe Podcast AI", "Premiere Pro", "After Effects", "CapCut", "Photoshop", "Illustrator", "WordPress", "SEO", "AI Content Tools", "Digital Marketing", "Swahili-English Bilingual"];

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader label="ABOUT" title="I build media for Africa's largest and most misunderstood generation." />

      {/* BIO + DETAILS */}
      <section className="sect-pad" style={{ padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="about-cols" style={{ display: "flex", gap: 64 }}>
            <div style={{ flex: "1 1 55%" }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.55)", marginBottom: 24 }}>
                From Kakamega County to the national broadcast stage — Eugine Micah is a TV host, journalist, and digital strategist who leads content and digital operations at PPP TV Kenya, one of the country&apos;s most-watched entertainment channels on the StarTimes platform.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.55)", marginBottom: 24 }}>
                He hosts Urban News — PPP TV&apos;s flagship youth news show — and co-hosts The Nairobi Podcast. He created Campus Xposure, Pacesetters Talent Search, and Twende Tusaidie Tushinde, a charity show covering all 47 Kenyan counties. He founded Campus Rave, whose first University of Nairobi event raised over KSh 1.5 million.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "rgba(255,255,255,.55)", marginBottom: 32 }}>
                A former Citizen TV reporter, TIBS College valedictorian, published author, Global Cyber Alliance contributor, and People&apos;s Choice Awards nominee — his work sits at the intersection of media, marketing, and technology. He uses data and AI tools to choose stories, plan releases, and speed up editing.
              </p>

              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 14 }}>TOOLS & SKILLS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SKILLS_TOOLS.map((t, i) => (
                  <span key={i} style={{
                    padding: "6px 14px", border: "1px solid rgba(255,255,255,.08)",
                    fontFamily: "'JetBrains Mono'", fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            <div style={{ flex: "1 1 40%", display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "CURRENT ROLE", main: "Host & Head of Digital Operations", sub: "PPP TV Kenya — StarTimes Platform" },
                { label: "EDUCATION", main: "Diploma in Journalism & Mass Communication", sub: "TIBS College — Class Valedictorian 2024" },
                { label: "ORIGIN", main: "Kakamega County, Western Kenya", sub: "Abatongoi Clan, Bunyore — Son of Joab Ob\u2019bayi" },
                { label: "NEWSLETTER", main: "Unfiltered with Eugine Micah", sub: "LinkedIn — AI, Media, African Storytelling" },
              ].map((card, i) => (
                <div key={i} className="info-card" style={{
                  padding: "28px 32px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,.25)", textTransform: "uppercase", marginBottom: 10 }}>{card.label}</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 4 }}>{card.main}</div>
                  <div style={{ fontSize: ".85rem", color: "#FF2D2D" }}>{card.sub}</div>
                </div>
              ))}
              <div style={{ padding: "24px 28px", borderLeft: "3px solid #FF2D2D", background: "rgba(255,45,45,.03)" }}>
                <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6, color: "rgba(255,255,255,.5)" }}>
                  &quot;I&apos;ve spent the last six years learning one thing: how to make stories impossible to ignore.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="sect-pad" style={{ padding: "100px 40px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>PHILOSOPHY</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.8rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, marginBottom: 56, maxWidth: 600 }}>
            What I believe.
          </h2>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { title: "Culture is Memory", desc: "Stories preserve who we are and where we come from. Every broadcast is an archive.", color: "#FF2D2D" },
              { title: "Media Shapes Identity", desc: "What a generation consumes defines how they see themselves. I choose to show possibility.", color: "#FFB800" },
              { title: "Stories Build Nations", desc: "Every great movement started with a narrative. I build narratives for the generation that will lead Africa.", color: "#00E5A0" },
            ].map((item, i) => (
              <div key={i} className="info-card" style={{ padding: "36px 32px", background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ width: 3, height: 28, background: item.color, marginBottom: 20 }}/>
                <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.4rem", fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "rgba(255,255,255,.4)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="sect-pad" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>IMPACT</div>
          <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[
              { value: "20M+", label: "Monthly Reach", accent: "#FF2D2D" },
              { value: "700K+", label: "YouTube Subscribers", accent: "#FF6B35" },
              { value: "3M+", label: "Weekly TV Viewers", accent: "#FFB800" },
              { value: "500+", label: "Interviews Conducted", accent: "#00E5A0" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 24px", background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.5rem", fontWeight: 400, color: s.accent, lineHeight: 1, marginBottom: 8, fontStyle: "italic" }}>{s.value}</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
