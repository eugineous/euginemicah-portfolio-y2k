"use client";

import Link from "next/link";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">EM</span>
            </div>
            <span className="font-bold text-xl">EM TV HUB</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-red-400 transition-colors">About</Link>
            <Link href="/career" className="hover:text-red-400 transition-colors">Career</Link>
            <Link href="/shows" className="hover:text-red-400 transition-colors">Shows</Link>
            <Link href="/gallery" className="hover:text-red-400 transition-colors">Gallery</Link>
            <Link href="/press" className="text-red-400">Press Kit</Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 font-medium mb-4">PRESS KIT</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Media Resources</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need for press coverage, interviews, and media features.
          </p>
        </div>
      </section>

      {/* Bio Sections */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Short Bio */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Short Bio (50 words)</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Eugine Micah is a Kenyan journalist, TV presenter, and digital media strategist. 
              Head of Digital at PPP TV, founder of Roylandz Media, and host of Urban News, 
              Campus Xposure, and The Nairobi Podcast. TIBS College valedictorian 2024.
            </p>
            <button className="px-6 py-2 glass-card rounded-full text-sm hover:bg-white/10 transition-colors">
              Copy Bio
            </button>
          </div>

          {/* Long Bio */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Long Bio (150 words)</h2>
            <p className="text-gray-300 leading-relaxed text-sm mb-6">
              Eugine Micah is a Kenyan journalist, digital content creator, TV presenter, and media entrepreneur. 
              He serves as Head of Digital Strategy and hosts youth-centered shows including Urban News and 
              Campus Xposure on PPP TV, reaching 3 million weekly viewers. Founder and CEO of Roylandz Media. 
              Born in Kisumu and raised in Kakamega County, Eugine earned a Diploma in Journalism and Mass 
              Communication from TIBS, graduating as valedictorian in 2024. He began at Citizen TV and has 
              grown into a strong voice in broadcast journalism and digital media. He combines journalism, 
              technology, and youth engagement to reach millions monthly. Author of "Born Broke, Built Loud."
            </p>
            <button className="px-6 py-2 glass-card rounded-full text-sm hover:bg-white/10 transition-colors">
              Copy Bio
            </button>
          </div>
        </div>
      </section>

      {/* Fast Facts */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8"><span className="gradient-text">Fast Facts</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Full Name", value: "Eugine Micah" },
              { label: "Born", value: "December 24, 2001" },
              { label: "Birthplace", value: "Kisumu, Kenya" },
              { label: "Raised", value: "Lugari, Kakamega County" },
              { label: "Current Role", value: "Head of Digital & TV Presenter, PPP TV" },
              { label: "Company", value: "Roylandz Media (Founder & CEO)" },
              { label: "Education", value: "TIBS College - Valedictorian 2024" },
              { label: "Weekly Viewers", value: "3M+" },
              { label: "Subscribers", value: "3K+" },
              { label: "Shows", value: "Urban News, Campus Xposure, The Nairobi Podcast" },
              { label: "Book", value: "Born Broke, Built Loud" },
              { label: "Email", value: "eugine.micah@outlook.com" },
            ].map((fact, index) => (
              <div key={index} className="glass-card p-4 rounded-xl">
                <p className="text-red-400 text-sm">{fact.label}</p>
                <p className="text-white font-medium">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-12 px-6 bg-gradient-to-b from-transparent to-red-950/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8"><span className="gradient-text">Pull Quotes</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Media is my language. I build platforms that amplify voices often ignored.",
              "I tell stories that connect youth to their culture and the world around them.",
              "Born broke taught me resilience. Built loud taught me voice. The combination changed my life.",
              "Your voice is your weapon. Learn to use it before life forces you to."
            ].map((quote, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl">
                <p className="text-xl italic text-gray-300">"{quote}"</p>
                <p className="text-red-400 mt-4">— Eugine Micah</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8"><span className="gradient-text">Downloads</span></h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Press Kit PDF", description: "Complete press kit with bios, facts, and quotes", icon: "📄" },
              { title: "High-Res Photos", description: "Professional headshots and action shots", icon: "📸" },
              { title: "Logos & Branding", description: "Roylandz Media and EM TV Hub logos", icon: "🎨" },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <button className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-500 rounded-full text-sm font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Press */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4"><span className="gradient-text">Press Inquiries</span></h2>
          <p className="text-gray-400 mb-6">For interviews, features, and media inquiries:</p>
          <a href="mailto:eugine.micah@outlook.com" className="text-2xl font-bold text-red-400 hover:text-red-300 transition-colors">
            eugine.micah@outlook.com
          </a>
          <p className="text-gray-400 mt-4">+254 799 886247</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
