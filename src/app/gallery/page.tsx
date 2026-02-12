"use client";

import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "tv", "studio", "bts", "events"];

  const gallery = [
    { id: 1, category: "tv", src: "https://i.ytimg.com/vi/cX2qSGQ_vzc/maxresdefault.jpg", title: "The Red Tally Light" },
    { id: 2, category: "studio", src: "https://i.ytimg.com/vi/sr3eSfpC6jY/maxresdefault.jpg", title: "Digital Kemoview Set" },
    { id: 3, category: "bts", src: "https://i.ytimg.com/vi/wROaKxIgMWs/maxresdefault.jpg", title: "The Valedictorian Speech" },
    { id: 4, category: "events", src: "https://i.ytimg.com/vi/nR1sEvm8j-0/maxresdefault.jpg", title: "Estate Storytelling" },
    { id: 5, category: "tv", src: "https://i.ytimg.com/vi/waccHFWq9Z8/maxresdefault.jpg", title: "Campus Xposure" },
    { id: 6, category: "studio", src: "https://i.ytimg.com/vi/MRY_U1kw5sg/maxresdefault.jpg", title: "Pacesetters Talent Search" },
    { id: 7, category: "bts", src: "https://i.ytimg.com/vi/KMqn52mkWR4/maxresdefault.jpg", title: "Celebrity Interviews" },
    { id: 8, category: "events", src: "https://i.ytimg.com/vi/PyRZVv4J9C8/maxresdefault.jpg", title: "Young and Famous Podcast" },
      ];

  const filteredItems = selectedCategory === "all" ? gallery : gallery.filter(item => item.category === selectedCategory);

  return (
        <div className="min-h-screen bg-black text-white">
          {/* Navigation */}
              <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
                      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                          <span className="text-black font-bold text-lg">EM</span>span>
                                            </div>div>
                                            <span className="font-bold text-xl">EUGINE MICAH</span>span>
                                </Link>Link>
                                <div className="hidden md:flex items-center gap-8">
                                            <Link href="/" className="hover:text-[#009245] transition-colors">Home</Link>Link>
                                            <Link href="/about" className="hover:text-[#009245] transition-colors">About</Link>Link>
                                            <Link href="/career" className="hover:text-[#009245] transition-colors">Career</Link>Link>
                                            <Link href="/shows" className="hover:text-[#009245] transition-colors">Shows</Link>Link>
                                            <Link href="/gallery" className="text-[#009245]">Gallery</Link>Link>
                                            <Link href="/press" className="hover:text-[#009245] transition-colors">Press Kit</Link>Link>
                                            <Link href="/contact" className="hover:text-[#009245] transition-colors">Contact</Link>Link>
                                </div>div>
                      </div>div>
              </nav>nav>
        
          {/* Hero */}
              <section className="pt-32 pb-16 px-6">
                      <div className="max-w-7xl mx-auto text-center">
                                <p className="text-[#009245] font-medium mb-4">MOMENTS</p>p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">CELEBRITY AURA</span>span>
                                </h1>h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                            Behind the scenes, on the stage, and everywhere in between.
                                </p>p>
                      </div>div>
              </section>section>
        
          {/* Filter */}
              <section className="py-8 px-6">
                      <div className="max-w-7xl mx-auto">
                                <div className="flex flex-wrap justify-center gap-3">
                                  {categories.map(cat => (
                        <button
                                          key={cat}
                                          onClick={() => setSelectedCategory(cat)}
                                          className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                                              selectedCategory === cat ? "bg-[#009245] text-black shadow-lg" : "bg-white/5 text-gray-500 hover:text-white"
                                          }`}
                                        >
                          {cat}
                        </button>button>
                      ))}
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* Gallery Grid */}
              <section className="py-12 px-6">
                      <div className="max-w-7xl mx-auto">
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                                  {filteredItems.map((item) => (
                        <div 
                                          key={item.id} 
                                        className="relative group rounded-3xl overflow-hidden glass-card cursor-pointer border border-white/5 break-inside-avoid shadow-xl hover:border-[#009245]/50 transition-all"
                                        >
                                        <img 
                                                            src={item.src} 
                                          alt={item.title} 
                                          className="w-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                                          <span className="text-[#009245] text-[10px] font-bold uppercase tracking-widest mb-2">{item.category}</span>span>
                                                          <h4 className="text-xl font-display font-bold">{item.title}</h4>h4>
                                        </div>div>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* CTA */}
              <section className="py-20 px-6">
                      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#009245]/20">
                                <h2 className="text-3xl font-bold mb-4"><span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Need Professional Photos?</span>span></h2>h2>
                                <p className="text-gray-400 mb-8">Download high-resolution press photos and media assets.</p>p>
                                <div className="flex flex-wrap justify-center gap-4">
                                            <Link href="/press" className="px-8 py-3 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-full font-semibold hover:opacity-90 transition-opacity">View Press Kit</Link>Link>
                                            <Link href="/contact" className="px-8 py-3 glass-card rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors">Get in Touch</Link>Link>
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* Footer */}
              <footer className="py-12 px-6 border-t border-white/10">
                      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                          <span className="text-black font-bold text-sm">EM</span>span>
                                            </div>div>
                                            <span className="font-bold">EUGINE MICAH</span>span>
                                </div>div>
                                <p className="text-gray-500 text-sm">© 2025 Eugine Micah. All rights reserved.</p>p>
                                <div className="flex gap-6">
                                            <a href="https://youtube.com/@euginemicah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">YouTube</a>a>
                                            <a href="https://instagram.com/eugine.micah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">Instagram</a>a>
                                            <a href="https://tiktok.com/@eugine.micah" target="_blank" className="text-gray-400 hover:text-[#009245] transition-colors">TikTok</a>a>
                                </div>div>
                      </div>div>
              </footer>footer>
        </div>div>
      );
}</div>
