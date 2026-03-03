import Image from "next/image";

const SOCIALS = [
  { name: "YouTube", url: "https://youtube.com/@euginemicah" },
  { name: "Instagram", url: "https://instagram.com/eugine.micah" },
  { name: "TikTok", url: "https://tiktok.com/@eugine.micah" },
  { name: "X", url: "https://x.com/eugineroylandz" },
  { name: "LinkedIn", url: "https://linkedin.com/in/euginemicah" },
];

export default function Footer() {
  return (
    <footer style={{ padding: "40px", borderTop: "1px solid rgba(255,255,255,.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src="/Eugine Mican con.png" alt="EM" width={28} height={28} style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>EUGINE MICAH</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {SOCIALS.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,.2)", textTransform: "uppercase", transition: "color .3s" }}>{s.name}</a>
          ))}
        </div>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 9, color: "rgba(255,255,255,.15)", letterSpacing: 1 }}>© 2026 EUGINE MICAH. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
