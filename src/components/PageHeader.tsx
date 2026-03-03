export default function PageHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <section style={{
      padding: "160px 40px 80px",
      position: "relative",
      background: "radial-gradient(ellipse at 30% 40%,rgba(255,45,45,.05) 0%,transparent 55%)",
    }}>
      <div style={{ position: "absolute", left: "8%", top: "15%", width: 1, height: "60%", background: "linear-gradient(to bottom,transparent,rgba(255,45,45,.12),transparent)" }}/>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", color: "#FF2D2D", marginBottom: 20 }}>{label}</div>
        <h1 className="page-title" style={{
          fontFamily: "'Instrument Serif',serif", fontSize: "4.5rem", fontWeight: 400,
          fontStyle: "italic", lineHeight: .95, marginBottom: subtitle ? 20 : 0, maxWidth: 800,
        }}>{title}</h1>
        {subtitle && (
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(255,255,255,.4)", maxWidth: 560, marginTop: 8 }}>{subtitle}</p>
        )}
      </div>
    </section>
  );
}
