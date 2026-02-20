"use client";

import Link from "next/link";

export default function PressPage() {
    const pressResources = [
      { label: "Official Press Photos (2025)", size: "48MB", type: "ZIP" },
      { label: "Bio & Brand Story (PDF)", size: "2MB", type: "PDF" },
      { label: "Roylandz Media Logos (SVG)", size: "1MB", type: "ZIP" },
      { label: "Speaker One-Sheet (PDF)", size: "5MB", type: "PDF" },
        ];

  return (
        <div className="min-h-screen bg-black text-white">
          {/* Navigation */}
              <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
                      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                          <span className="text-black font-bold text-lg">EM</span>
                                            </div>
                                            <span className="font-bold text-xl">EUGINE MICAH</span>
                                </Link>
                                <div className="hidden md:flex items-center gap-8">
                                            <Link href="/" className="hover:text-[#009245] transition-colors">Home</Link>
                                            <Link href="/about" className="hover:text-[#009245] transition-colors">About</Link>
                                            <Link href="/career" className="hover:text-[#009245] transition-colors">Career</Link>
                                            <Link href="/shows" className="hover:text-[#009245] transition-colors">Shows</Link>
                                            <Link href="/gallery" className="hover:text-[#009245] transition-colors">Gallery</Link>
                                            <Link href="/press" className="text-[#009245]">Press Kit</Link>
                                            <Link href="/contact" className="hover:text-[#009245] transition-colors">Contact</Link>
                                </div>
                      </div>
              </nav>
        
          {/* Hero */}
              <section className="pt-32 pb-16 px-6">
                      <div className="max-w-7xl mx-auto text-center">
                                <p className="text-[#009245] font-medium mb-4">RESOURCES</p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">PRESS KIT</span>
                                </h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                            Download high-resolution assets, official biographies, and media logos for coverage and business collaborations.
                                </p>
                      </div>
              </section>
        
          {/* Content */}
              <section className="py-16 px-6">
                      <div className="max-w-7xl mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                  {/* Downloads */}
                                            <div>
                                                          <h2 className="text-3xl font-bold mb-8">
                                                                          <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Download Assets</span>
                                                          </h2>
                                                          <div className="space-y-4">
                                                            {pressResources.map((item, idx) => (
                            <button key={idx} className="w-full p-6 glass-card rounded-2xl flex items-center justify-between group hover:border-[#009245]/50 transition-all border border-[#009245]/20">
                                                <div className="flex items-center gap-4">
                                                                      <span className="text-[#009245] font-bold text-sm">{item.type}</span>
                                                                      <h5 className="font-bold text-white">{item.label}</h5>
                                                </div>
                                                <span className="text-xs text-gray-500 font-bold uppercase">{item.size} • DOWNLOAD</span>
                            </button>
                          ))}
                                                          </div>
                                            </div>
                                
                                  {/* Bio */}
                                            <div className="glass-card p-12 rounded-3xl border border-[#009245]/20">
                                                          <h4 className="text-2xl font-display font-bold text-[#009245] mb-6">QUICK BIO</h4>
                                                          <div className="text-gray-300 leading-relaxed space-y-4 font-light text-sm italic">
                                                                          <p>
                                                                                            "Eugine Micah is an award-winning Kenyan journalist, TV presenter, and digital media strategist. As Head of Digital at PPP TV and host of Urban News, Campus Xposure, and The Nairobi Podcast, he has built a reputation for authentic storytelling that resonates with Kenya's youth culture."
                                                                          </p>
                                                                          <p>
                                                                                            "With over 20 million monthly reach across platforms and 700K+ YouTube subscribers, Eugine has interviewed hundreds of influential figures while pioneering innovative content strategies that bridge traditional media and digital innovation."
                                                                          </p>
                                                          </div>
                                                          <button className="mt-8 px-6 py-2 border border-[#009245] text-[#009245] font-bold text-xs rounded-lg hover:bg-[#009245] hover:text-black transition-all">
                                                                          COPY FULL BIO
                                                          </button>
                                            </div>
                                </div>
                      </div>
              </section>
        
          {/* Stats */}
              <section className="py-16 px-6 bg-gradient-to-b from-transparent to-[#009245]/10">
                      <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold mb-12 text-center">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Media Impact</span>
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                  {[
          { value: "20M+", label: "Monthly Reach" },
          { value: "700K+", label: "YouTube Subscribers" },
          { value: "500+", label: "Interviews Conducted" },
          { value: "3M+", label: "Weekly TV Viewers" },
                      ].map((stat, index) => (
                                      <div key={index} className="glass-card p-6 rounded-2xl text-center border border-[#009245]/20">
                                                      <p className="text-3xl font-bold bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">{stat.value}</p>
                                                      <p className="text-gray-400">{stat.label}</p>
                                      </div>
                                    ))}
                                </div>
                      </div>
              </section>
        
          {/* CTA */}
              <section className="py-20 px-6">
                      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#009245]/20">
                                <h2 className="text-3xl font-bold mb-4">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Media Inquiries</span>
                                </h2>
                                <p className="text-gray-400 mb-8">For interviews, features, or collaboration requests.</p>
                                <div className="flex flex-wrap justify-center gap-4">
                                            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-full font-semibold hover:opacity-90 transition-opacity">Contact Us</Link>
                                            <a href="mailto:eugine.micah@outlook.com" className="px-8 py-3 glass-card rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors">Email Direct</a>
                                </div>
                      </div>
              </section>
        
          {/* Footer */}
              <footer className="py-12 px-6 border-t border-white/10">
                      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                          <span className="text-black font-bold text-sm">EM</span>
                                            </div>
                                            <span className="font-bold">EUGINE MICAH</span>
                                </div>
                                <p className="text-gray-500 text-sm">© 2025 Eugine Micah. All rights reserved.</p>
                                <div className="flex gap-6">
                                            <a href="https://youtube.com/@euginemicah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">YouTube</a>
                                            <a href="https://instagram.com/eugine.micah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">Instagram</a>
                                            <a href="https://tiktok.com/@eugine.micah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">TikTok</a>
                                </div>
                      </div>
              </footer>
        </div>
      );
}</div>
