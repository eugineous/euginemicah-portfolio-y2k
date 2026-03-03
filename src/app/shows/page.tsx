"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const SHOWS = [
  { title: "URBAN NEWS", role: "Host & Content Director", platform: "PPP TV — NTV — KBC TV", episodes: "150+", desc: "Flagship youth news program reaching over 2 million viewers weekly across Kenya. The show covers trending entertainment, social media culture, and the stories shaping Kenya\u2019s youth.", color: "#FF2D2D", tag: "FLAGSHIP", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz", thumb: "https://i.ytimg.com/vi/cX2qSGQ_vzc/hqdefault.jpg" },
  { title: "TWENDE TUSAIDIE TUSHINDE", role: "Creator & Host", platform: "PPP TV — NTV — KBC TV", episodes: "47 Counties", desc: "Charity show traveling across all 47 Kenyan counties helping families in need. Hosted by Padi Wubonn, airing Saturdays 10PM. Building the Tushinde Family community.", color: "#00E5A0", tag: "CHARITY", url: "#", thumb: "" },
  { title: "CAMPUS XPOSURE", role: "Host & Producer", platform: "PPP TV", episodes: "60+", desc: "TV series spotlighting student culture and innovation across Kenyan universities. Bridging the gap between student talent and national visibility.", color: "#00B4FF", tag: "EDUCATION", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN2WTp4OpjdI8zW51o0FTPjL", thumb: "https://i.ytimg.com/vi/waccHFWq9Z8/hqdefault.jpg" },
  { title: "THE NAIROBI PODCAST", role: "Co-Host", platform: "Spotify — YouTube", episodes: "45+", desc: "Youth-driven podcast exploring Nairobi creative economy and digital culture. Co-hosted with Lucy Ogunde, Mary Maina, and Rania Biketi.", color: "#A855F7", tag: "PODCAST", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz", thumb: "https://i.ytimg.com/vi/sr3eSfpC6jY/hqdefault.jpg" },
  { title: "PACESETTERS TALENT SEARCH", role: "Host", platform: "PPP TV", episodes: "30+", desc: "National talent hunt discovering Kenya\u2019s next generation of entertainers. Auditions, performances, and star-making moments.", color: "#FFB800", tag: "TALENT", url: "https://www.youtube.com/playlist?list=PLxiuxBobXxN0hMXo1gSmYg98NywNBz4Zc", thumb: "https://i.ytimg.com/vi/MRY_U1kw5sg/hqdefault.jpg" },
  { title: "CAMPUS RAVE", role: "Founder & Host", platform: "Live Events", episodes: "Multi-Campus", desc: "Founded Campus Rave \u2014 first event at University of Nairobi raised over KSh 1.5 million. Live events blending entertainment and community.", color: "#FF6B35", tag: "EVENTS", url: "#", thumb: "" },
];

export default function ShowsPage() {
  const [hoveredShow, setHoveredShow] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader
        label="SHOWS & PRODUCTIONS"
        title="Six shows. Millions of viewers. One mission."
        subtitle="From national TV to digital podcasts. Stories that matter, told with authenticity."
      />

      {/* FEATURED: URBAN NEWS */}
      <section className="sect-pad" style={{ padding: "40px 40px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <a href={SHOWS[0].url} target="_blank" rel="noopener noreferrer" style={{
            display: "block", position: "relative", padding: "48px 44px", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,45,45,.08) 0%, rgba(255,45,45,.02) 100%)",
            border: "1px solid rgba(255,45,45,.15)",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#FF2D2D" }}/>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{
                padding: "6px 14px", background: "rgba(255,45,45,.15)", border: "1px solid rgba(255,45,45,.3)",
                fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "#FF2D2D", textTransform: "uppercase",
              }}>FLAGSHIP SHOW</span>
              <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>{SHOWS[0].episodes} EPISODES</span>
            </div>
            <h2 style={{ fontFamily: "'Instrument Serif',serif", fontSize: "3.5rem", fontWeight: 400, fontStyle: "italic", marginBottom: 12 }}>
              {SHOWS[0].title}
            </h2>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,.35)", textTransform: "uppercase", marginBottom: 6 }}>{SHOWS[0].role}</div>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 1.5, color: "#FF2D2D", marginBottom: 20 }}>{SHOWS[0].platform}</div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(255,255,255,.45)", maxWidth: 600 }}>{SHOWS[0].desc}</p>
            <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 3, color: "#FF2D2D", textTransform: "uppercase", marginTop: 28 }}>WATCH NOW →</div>
          </a>
        </div>
      </section>

      {/* ALL SHOWS GRID */}
      <section className="sect-pad" style={{ padding: "40px 40px 120px", background: "rgba(255,255,255,.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 32 }}>ALL PRODUCTIONS</div>
          <div className="show-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {SHOWS.slice(1).map((s, i) => (
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
