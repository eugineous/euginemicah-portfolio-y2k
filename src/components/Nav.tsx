"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/shows", label: "SHOWS" },
  { href: "/career", label: "CAREER" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/press", label: "PRESS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 998,
        background: scrollY > 80 ? "rgba(0,0,0,.92)" : "transparent",
        backdropFilter: scrollY > 80 ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrollY > 80 ? "1px solid rgba(255,255,255,.05)" : "none",
        transition: "all .5s", padding: "18px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Link href="/" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Image src="/Eugine Mican con.png" alt="EM" width={36} height={36} style={{ objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>
            EUGINE MICAH
          </span>
        </Link>

        <div className="nav-desk" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(n => (
            <Link key={n.href} href={n.href} className="nav-item" style={{
              fontFamily: "'JetBrains Mono'", fontSize: 10, fontWeight: 600,
              letterSpacing: 2.5, textTransform: "uppercase",
              color: pathname === n.href ? "#FF2D2D" : "rgba(255,255,255,.35)",
            }}>{n.label}</Link>
          ))}
          <a href="mailto:euginemicah@gmail.com" className="cta-btn" style={{
            padding: "8px 20px", border: "1px solid rgba(255,255,255,.2)",
            fontFamily: "'JetBrains Mono'", fontSize: 9, fontWeight: 600, letterSpacing: 2.5,
            textTransform: "uppercase", cursor: "pointer",
          }}>BOOK ME</a>
        </div>

        <div className="ham" onClick={() => setMenuOpen(!menuOpen)} style={{
          cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4,
        }}>
          <span style={{ width: 22, height: 1.5, background: "#fff", transition: ".3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }}/>
          <span style={{ width: 22, height: 1.5, background: "#fff", transition: ".3s", opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ width: 22, height: 1.5, background: "#fff", transition: ".3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }}/>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-menu" style={{
          position: "fixed", inset: 0, zIndex: 997, background: "rgba(0,0,0,.97)", backdropFilter: "blur(40px)",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 28,
        }}>
          {NAV_LINKS.map(n => (
            <Link key={n.href} href={n.href} style={{
              fontFamily: "'Instrument Serif',serif", fontSize: 32, fontStyle: "italic",
              color: pathname === n.href ? "#FF2D2D" : "#fff",
            }}>{n.label.charAt(0) + n.label.slice(1).toLowerCase()}</Link>
          ))}
        </div>
      )}
    </>
  );
}
