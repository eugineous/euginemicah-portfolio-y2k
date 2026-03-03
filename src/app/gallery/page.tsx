"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const CATEGORIES = ["ALL", "TV", "STUDIO", "BTS", "EVENTS"];

const GALLERY = [
  { id: 1, category: "TV", src: "https://i.ytimg.com/vi/cX2qSGQ_vzc/maxresdefault.jpg", title: "Urban News \u2014 On Set", color: "#FF2D2D" },
  { id: 2, category: "STUDIO", src: "https://i.ytimg.com/vi/sr3eSfpC6jY/maxresdefault.jpg", title: "The Nairobi Podcast", color: "#A855F7" },
  { id: 3, category: "BTS", src: "https://i.ytimg.com/vi/wROaKxIgMWs/maxresdefault.jpg", title: "The Valedictorian Speech", color: "#FFB800" },
  { id: 4, category: "EVENTS", src: "https://i.ytimg.com/vi/nR1sEvm8j-0/maxresdefault.jpg", title: "Estate Storytelling", color: "#00E5A0" },
  { id: 5, category: "TV", src: "https://i.ytimg.com/vi/waccHFWq9Z8/maxresdefault.jpg", title: "Campus Xposure", color: "#00B4FF" },
  { id: 6, category: "STUDIO", src: "https://i.ytimg.com/vi/MRY_U1kw5sg/maxresdefault.jpg", title: "Pacesetters Talent Search", color: "#FFB800" },
  { id: 7, category: "BTS", src: "https://i.ytimg.com/vi/KMqn52mkWR4/maxresdefault.jpg", title: "Celebrity Interviews", color: "#FF6B35" },
  { id: 8, category: "EVENTS", src: "https://i.ytimg.com/vi/PyRZVv4J9C8/maxresdefault.jpg", title: "Young and Famous Podcast", color: "#A855F7" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("ALL");
  const items = filter === "ALL" ? GALLERY : GALLERY.filter(g => g.category === filter);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader
        label="GALLERY"
        title="Celebrity Aura"
        subtitle="Behind the scenes, on the stage, and everywhere in between."
      />

      {/* FILTERS */}
      <section style={{ padding: "0 40px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className="filter-btn" style={{
              padding: "8px 20px", background: filter === cat ? "#FF2D2D" : "transparent",
              color: filter === cat ? "#000" : "rgba(255,255,255,.3)",
              border: `1px solid ${filter === cat ? "#FF2D2D" : "rgba(255,255,255,.08)"}`,
              fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase",
            }}>{cat}</button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="sect-pad" style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {items.map(item => (
              <div key={item.id} className="gallery-item" style={{
                position: "relative", border: "1px solid rgba(255,255,255,.04)", background: "rgba(255,255,255,.015)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.title} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }}/>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%)",
                  opacity: 0, transition: "opacity .4s",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 20px",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                >
                  <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: item.color, textTransform: "uppercase", marginBottom: 4 }}>{item.category}</span>
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.2rem", fontStyle: "italic" }}>{item.title}</span>
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
