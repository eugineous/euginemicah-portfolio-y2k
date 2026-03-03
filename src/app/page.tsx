"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const ROLES = ["TV Host", "Journalist", "Digital Strategist", "Culture Commentator", "Author", "Producer"];

const STATS = [
  { value: "700K+", label: "YouTube Subscribers", accent: "#FF2D2D" },
  { value: "20M+", label: "Monthly Views", accent: "#FF6B35" },
  { value: "3M+", label: "Daily Reach Across TV & Social", accent: "#FFB800" },
  { value: "100+", label: "Brand Partners", accent: "#00E5A0" },
];

const SHOWS = [
  { title: "URBAN NEWS", role: "Host & Content Director", platform: "PPP TV — NTV — KBC TV", episodes: "150+", desc: "Flagship youth news program reaching over 2 million viewers weekly across Kenya.", color: "#FF2D2D", tag: "FLAGSHIP", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz" },
  { title: "TWENDE TUSAIDIE TUSHINDE", role: "Creator & Host", platform: "PPP TV — YouTube", episodes: "47 Counties", desc: "Charity show traveling across all 47 Kenyan counties helping families in need.", color: "#00E5A0", tag: "CHARITY", url: "#" },
  { title: "CAMPUS XPOSURE", role: "Host & Producer", platform: "PPP TV", episodes: "60+", desc: "TV series spotlighting student culture and innovation across Kenyan universities.", color: "#00B4FF", tag: "EDUCATION", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN2WTp4OpjdI8zW51o0FTPjL" },
  { title: "THE NAIROBI PODCAST", role: "Co-Host", platform: "Spotify — YouTube", episodes: "45+", desc: "Youth-driven podcast exploring Nairobi creative economy and digital culture.", color: "#A855F7", tag: "PODCAST", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz" },
];

const NETWORKS = ["PPP TV", "NTV Kenya", "KBC TV", "Citizen TV", "StarTimes"];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [hoveredShow, setHoveredShow] = useState<number | null>(null);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => setRoleIndex(prev => (prev + 1) % ROLES.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Nav />

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", padding: "140px 40px 100px",
        background: "radial-gradient(ellipse at 30% 40%,rgba(255,45,45,.07) 0%,transparent 55%),radial-gradient(ellipse at 70% 60%,rgba(168,85,247,.04) 0%,transparent 50%)",
      }}>
        <div style={{ position: "absolute", left: "8%", top: "10%", width: 1, height: "70%", background: "linear-gradient(to bottom,transparent,rgba(255,45,45,.15),transparent)" }}/>
        <div style={{ position: "absolute", right: "12%", top: "20%", width: 1, height: "40%", background: "linear-gradient(to bottom,transparent,rgba(255,255,255,.04),transparent)" }}/>

        {/* Live indicator */}
        <div className={loaded ? "fu" : ""} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF2D2D", animation: "glow 2s infinite" }}/>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.35)" }}>
            ON AIR — NAIROBI, KENYA
          </span>
        </div>

        <h1 className={`hero-name ${loaded ? "fu fu1" : ""}`} style={{
          fontFamily: "'Instrument Serif',serif", fontSize: "7rem", fontWeight: 400,
          lineHeight: .92, marginBottom: 20, fontStyle: "italic", maxWidth: 800,
        }}>
          Eugine<br/><span style={{ color: "#FF2D2D" }}>Micah</span>
        </h1>

        <div className={`hero-tagline ${loaded ? "fu fu2" : ""}`} style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: "1.6rem", fontWeight: 300,
          color: "rgba(255,255,255,.5)", marginBottom: 12, height: 40, overflow: "hidden",
        }}>
          <div key={roleIndex} style={{ animation: "roleSlide 2s ease" }}>{ROLES[roleIndex]}</div>
        </div>

        <p className={loaded ? "fu fu3" : ""} style={{
          fontSize: ".95rem", lineHeight: 1.7, color: "rgba(255,255,255,.4)",
          maxWidth: 560, marginBottom: 40, fontWeight: 400,
        }}>
          I tell stories that move people and grow brands. I host youth culture shows and lead digital strategy at PPP TV. I build audiences, ship content at speed, and turn ideas into results that can be measured.
        </p>

        <div className={`cta-group ${loaded ? "fu fu4" : ""}`} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/shows" className="cta-btn" style={{
            padding: "14px 32px", background: "#FF2D2D", color: "#000", border: "1px solid #FF2D2D",
            fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
          }}>WATCH MY SHOWS</Link>
          <a href="mailto:euginemicah@gmail.com" className="cta-outline" style={{
            padding: "14px 32px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.15)",
            fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
          }}>BOOK FOR EVENT</a>
        </div>

        <div className={`stat-grid ${loaded ? "fu fu5" : ""}`} style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40, marginTop: 80, maxWidth: 900,
        }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.8rem", fontWeight: 400, color: s.accent, lineHeight: 1, marginBottom: 6, fontStyle: "italic" }}>{s.value}</div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* NETWORKS BAR */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", padding: "20px 0", overflow: "hidden" }}>
        <div className="networks-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 48, padding: "0 40px" }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "rgba(255,255,255,.2)", textTransform: "uppercase", flexShrink: 0 }}>AS SEEN ON</span>
          {NETWORKS.map((n, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.12)", flexShrink: 0 }}>{n}</span>
          ))}
        </div>
      </div>

      {/* SHOWS PREVIEW */}
      <section className="sect-pad" style={{ padding: "120px 40px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>SHOWS & PRODUCTIONS</div>
          <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.8rem", fontWeight: 400, fontStyle: "italic", lineHeight: 1.1, marginBottom: 56 }}>
            Six shows. Millions of viewers. One mission.
          </h2>

          <div className="show-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {SHOWS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className="show-card"
                onMouseEnter={() => setHoveredShow(i)} onMouseLeave={() => setHoveredShow(null)}
                style={{
                  padding: "36px 32px", background: "rgba(255,255,255,.015)",
                  border: "1px solid rgba(255,255,255,.04)", position: "relative", overflow: "hidden",
                }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: 2,
                  width: hoveredShow === i ? "100%" : "0%",
                  background: s.color, transition: "width .5s cubic-bezier(.16,1,.3,1)",
                }}/>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{
                    padding: "4px 10px", background: `${s.color}15`, border: `1px solid ${s.color}30`,
                    fontFamily: "'JetBrains Mono'", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: s.color, textTransform: "uppercase",
                  }}>{s.tag}</span>
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>{s.episodes}</span>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic", marginBottom: 6 }}>{s.title}</h3>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 4 }}>{s.role}</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 1.5, color: s.color, marginBottom: 14 }}>{s.platform}</div>
                <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "rgba(255,255,255,.4)" }}>{s.desc}</p>
              </a>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/shows" className="cta-btn" style={{
              padding: "14px 36px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.15)",
              fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase",
              display: "inline-block",
            }}>VIEW ALL SHOWS →</Link>
          </div>
        </div>
      </section>

      {/* MEMOIR BANNER */}
      <div style={{
        padding: "64px 40px",
        background: "linear-gradient(135deg,rgba(255,107,53,.06) 0%,rgba(168,85,247,.03) 100%)",
        borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 4, color: "#FF6B35", textTransform: "uppercase", marginBottom: 16 }}>THE MEMOIR — 2024</div>
        <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "2.5rem", fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>Born Broke, Built Loud</h2>
        <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.4)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.7 }}>
          14,000+ words. From Manyonyi Village to national television. The story of building yourself loud enough for the world to hear.
        </p>
        <a href="mailto:euginemicah@gmail.com?subject=Born%20Broke%20Built%20Loud%20Inquiry" className="cta-btn" style={{
          padding: "12px 28px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,.15)",
          fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", display: "inline-block",
        }}>INQUIRE ABOUT THE BOOK →</a>
      </div>

      {/* QUICK LINKS */}
      <section className="sect-pad" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { label: "ABOUT", title: "The full story", desc: "From Kakamega County to national broadcast — the journey, philosophy, and mission.", href: "/about", color: "#FF2D2D" },
              { label: "CAREER", title: "Timeline & milestones", desc: "Every role, every achievement, every step from 2021 to today.", href: "/career", color: "#FFB800" },
              { label: "CONTACT", title: "Let\u2019s build together", desc: "Booking inquiries, speaking, brand collaborations, and media appearances.", href: "/contact", color: "#00E5A0" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="info-card" style={{
                padding: "40px 32px", background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)",
                display: "block",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: item.color, textTransform: "uppercase", marginBottom: 16 }}>{item.label}</div>
                <h3 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.6rem", fontWeight: 400, fontStyle: "italic", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "rgba(255,255,255,.35)" }}>{item.desc}</p>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,.2)", textTransform: "uppercase", marginTop: 20 }}>EXPLORE →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
