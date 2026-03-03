"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const PRESS_RESOURCES = [
  { label: "Official Press Photos (2025)", size: "48MB", type: "ZIP" },
  { label: "Bio & Brand Story (PDF)", size: "2MB", type: "PDF" },
  { label: "Roylandz Media Logos (SVG)", size: "1MB", type: "ZIP" },
  { label: "Speaker One-Sheet (PDF)", size: "5MB", type: "PDF" },
];

export default function PressPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Nav />
      <PageHeader
        label="PRESS KIT"
        title="Media Resources"
        subtitle="Download high-resolution assets, official biographies, and media logos for coverage and business collaborations."
      />

      {/* CONTENT */}
      <section className="sect-pad" style={{ padding: "40px 40px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="press-cols" style={{ display: "flex", gap: 64 }}>
            {/* DOWNLOADS */}
            <div style={{ flex: "1 1 50%" }}>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 24 }}>DOWNLOAD ASSETS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {PRESS_RESOURCES.map((item, i) => (
                  <div key={i} className="download-row" style={{
                    padding: "20px 24px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
                    display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{
                        padding: "4px 10px", background: "rgba(255,45,45,.1)", border: "1px solid rgba(255,45,45,.2)",
                        fontFamily: "'JetBrains Mono'", fontSize: 8, fontWeight: 600, letterSpacing: 2, color: "#FF2D2D",
                      }}>{item.type}</span>
                      <span style={{ fontSize: ".95rem", fontWeight: 500 }}>{item.label}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,.2)", textTransform: "uppercase" }}>{item.size} · DOWNLOAD</span>
                  </div>
                ))}
              </div>

              {/* STATS */}
              <div style={{ marginTop: 48 }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 24 }}>MEDIA IMPACT</div>
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { value: "20M+", label: "Monthly Reach", accent: "#FF2D2D" },
                    { value: "700K+", label: "YouTube Subscribers", accent: "#FF6B35" },
                    { value: "500+", label: "Interviews", accent: "#FFB800" },
                    { value: "3M+", label: "Weekly TV Viewers", accent: "#00E5A0" },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: "24px 20px", background: "rgba(255,255,255,.015)", border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1.8rem", fontWeight: 400, color: s.accent, lineHeight: 1, marginBottom: 4, fontStyle: "italic" }}>{s.value}</div>
                      <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 8, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BIO */}
            <div style={{ flex: "1 1 45%" }}>
              <div style={{
                padding: "40px 36px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 24 }}>QUICK BIO</div>
                <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.8, color: "rgba(255,255,255,.45)", marginBottom: 20 }}>
                  Eugine Micah is a Kenyan journalist, TV presenter, and digital media strategist. As Head of Digital at PPP TV and host of Urban News, Campus Xposure, and The Nairobi Podcast, he has built a reputation for authentic storytelling that resonates with Kenya&apos;s youth culture.
                </p>
                <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.8, color: "rgba(255,255,255,.45)", marginBottom: 28 }}>
                  With over 20 million monthly reach across platforms and 700K+ YouTube subscribers, Eugine has interviewed hundreds of influential figures while pioneering innovative content strategies that bridge traditional media and digital innovation.
                </p>
                <button onClick={() => navigator.clipboard.writeText("Eugine Micah is a Kenyan journalist, TV presenter, and digital media strategist. As Head of Digital at PPP TV and host of Urban News, Campus Xposure, and The Nairobi Podcast, he has built a reputation for authentic storytelling that resonates with Kenya's youth culture. With over 20 million monthly reach across platforms and 700K+ YouTube subscribers, Eugine has interviewed hundreds of influential figures while pioneering innovative content strategies that bridge traditional media and digital innovation.")} className="cta-btn" style={{
                  padding: "10px 24px", background: "transparent", color: "#FF2D2D", border: "1px solid rgba(255,45,45,.3)",
                  fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                }}>COPY FULL BIO</button>
              </div>

              {/* NETWORKS */}
              <div style={{ marginTop: 24, padding: "32px 36px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,255,255,.25)", marginBottom: 16 }}>BROADCAST NETWORKS</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["PPP TV", "NTV Kenya", "KBC TV", "Citizen TV", "StarTimes"].map((n, i) => (
                    <span key={i} style={{
                      padding: "6px 14px", border: "1px solid rgba(255,255,255,.08)",
                      fontFamily: "'JetBrains Mono'", fontSize: 10, color: "rgba(255,255,255,.35)", letterSpacing: 1,
                    }}>{n}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: 24, padding: "28px 36px", background: "rgba(255,45,45,.03)", border: "1px solid rgba(255,45,45,.1)" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 3, color: "#FF2D2D", textTransform: "uppercase", marginBottom: 10 }}>MEDIA INQUIRIES</div>
                <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "rgba(255,255,255,.4)", marginBottom: 16 }}>For interviews, features, or collaboration requests.</p>
                <Link href="/contact" className="cta-btn" style={{
                  padding: "10px 24px", background: "#FF2D2D", color: "#000", border: "1px solid #FF2D2D",
                  fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", display: "inline-block",
                }}>CONTACT →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
