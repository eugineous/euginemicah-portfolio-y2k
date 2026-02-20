"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
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
                                              <Link href="/about" className="text-[#009245]">About</Link>
                                              <Link href="/career" className="hover:text-[#009245] transition-colors">Career</Link>
                                              <Link href="/shows" className="hover:text-[#009245] transition-colors">Shows</Link>
                                              <Link href="/gallery" className="hover:text-[#009245] transition-colors">Gallery</Link>
                                              <Link href="/press" className="hover:text-[#009245] transition-colors">Press Kit</Link>
                                              <Link href="/contact" className="hover:text-[#009245] transition-colors">Contact</Link>
                                  </div>
                        </div>
                </nav>
          
            {/* Hero Section */}
                <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#009245]/10 to-transparent"></div>
                        <div className="max-w-7xl mx-auto relative">
                                  <div className="grid md:grid-cols-2 gap-16 items-center">
                                              <div className="relative">
                                                            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#009245]/30">
                                                                            <div className="w-full h-full bg-gradient-to-br from-[#009245]/20 to-[#FCEE21]/10 flex items-center justify-center">
                                                                                              <span className="text-6xl">📸</span>
                                                                            </div>
                                                            </div>
                                                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#009245] to-[#FCEE21] rounded-2xl flex items-center justify-center">
                                                                            <span className="text-black font-bold text-2xl">EM</span>
                                                            </div>
                                              </div>
                                              <div>
                                                            <p className="text-[#009245] font-medium mb-4 tracking-wider">ABOUT</p>
                                                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                                                            Eugine Micah
                                                            </h1>
                                                            <p className="text-xl text-gray-300 mb-4">
                                                                            Journalist • TV Host • Media Personality • Author
                                                            </p>
                                                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                                                            Born in Kisumu, raised in Lugari, and now shaping Kenya's media landscape from Nairobi. 
                                                                            I believe storytelling is how culture remembers itself.
                                                            </p>
                                                            <div className="flex gap-4">
                                                                            <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                                                                                              Work With Me
                                                                            </Link>
                                                                            <Link href="/shows" className="px-8 py-4 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-colors">
                                                                                              View Shows
                                                                            </Link>
                                                            </div>
                                              </div>
                                  </div>
                        </div>
                </section>
          
            {/* Story Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[#009245]/5">
                        <div className="max-w-4xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-8 text-center">My Story</h2>
                                  <div className="prose prose-lg prose-invert mx-auto">
                                              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                                            "Storytelling is how culture remembers itself."
                                              </p>
                                              <p className="text-gray-400 leading-relaxed mb-6">
                                                            From the dusty roads of Lugari to the bright lights of national television, my journey has been 
                                                            one of relentless pursuit. I started with nothing but a voice and a dream—to tell stories that matter, 
                                                            to amplify voices that deserve to be heard, and to shape the narrative of a generation.
                                              </p>
                                              <p className="text-gray-400 leading-relaxed mb-6">
                                                            As the Head of Digital at PPP TV and host of Urban News, I've had the privilege of interviewing 
                                                            hundreds of changemakers, covering stories that impact millions, and building a media presence 
                                                            that reaches over 20 million people monthly.
                                              </p>
                                              <p className="text-gray-400 leading-relaxed">
                                                            My book "Born Broke, Built Loud" captures this journey—from a boy who read to chickens in a 
                                                            mud-walled house to a journalist whose voice now echoes across the nation.
                                              </p>
                                  </div>
                        </div>
                </section>
          
            {/* Timeline Section */}
                <section className="py-20 px-6">
                        <div className="max-w-4xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-12 text-center">My Journey</h2>
                                  <div className="space-y-8">
                                    {[
            { year: "2001", title: "Born in Kisumu", desc: "Christmas Eve, Russia Hospital" },
            { year: "2016", title: "Murgusi Secondary School", desc: "Entertainment Captain, CU Leader" },
            { year: "2020", title: "TIBS College", desc: "Diploma in Journalism, Founded Roylandz" },
            { year: "2022", title: "Citizen TV", desc: "News Reporter, Royal Media Services" },
            { year: "2024", title: "PPP TV", desc: "Head of Digital, TV Presenter" },
            { year: "2024", title: "Valedictorian", desc: "TIBS College Graduation" },
                        ].map((item, i) => (
                                        <div key={i} className="flex gap-8 items-start">
                                                        <div className="text-[#009245] font-bold text-2xl w-20 flex-shrink-0">{item.year}</div>
                                                        <div className="flex-1 pb-8 border-l-2 border-[#009245]/30 pl-8 relative">
                                                                          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#009245]"></div>
                                                                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                                                          <p className="text-gray-400">{item.desc}</p>
                                                        </div>
                                        </div>
                                      ))}
                                  </div>
                        </div>
                </section>
          
            {/* Philosophy Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-[#009245]/5 to-transparent">
                        <div className="max-w-4xl mx-auto text-center">
                                  <h2 className="text-3xl font-bold mb-12">What I Believe</h2>
                                  <div className="grid md:grid-cols-3 gap-8">
                                    {[
            { title: "Culture is Memory", desc: "Stories preserve who we are and where we come from." },
            { title: "Media Shapes Identity", desc: "What we consume defines how we see ourselves." },
            { title: "Stories Build Nations", desc: "Every great movement started with a narrative." },
                        ].map((item, i) => (
                                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                                                        <h3 className="text-xl font-semibold mb-4 text-[#009245]">{item.title}</h3>
                                                        <p className="text-gray-400">{item.desc}</p>
                                        </div>
                                      ))}
                                  </div>
                        </div>
                </section>
          
            {/* Impact Stats */}
                <section className="py-20 px-6">
                        <div className="max-w-6xl mx-auto">
                                  <h2 className="text-3xl font-bold mb-12 text-center">Impact</h2>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
            { number: "20M+", label: "Monthly Reach" },
            { number: "3K+", label: "YouTube Subscribers" },
            { number: "3M+", label: "Weekly Viewers" },
            { number: "500+", label: "Interviews" },
                        ].map((stat, i) => (
                                        <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#009245]/10 to-transparent border border-[#009245]/20">
                                                        <div className="text-4xl md:text-5xl font-bold text-[#009245] mb-2">{stat.number}</div>
                                                        <div className="text-gray-400">{stat.label}</div>
                                        </div>
                                      ))}
                                  </div>
                        </div>
                </section>
          
            {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[#009245]/10">
                        <div className="max-w-4xl mx-auto text-center">
                                  <h2 className="text-4xl font-bold mb-6">Let's Create Something Meaningful</h2>
                                  <p className="text-xl text-gray-400 mb-8">
                                              Whether it's a speaking engagement, media appearance, or collaboration opportunity.
                                  </p>
                                  <div className="flex justify-center gap-4 flex-wrap">
                                              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                                                            Get In Touch
                                              </Link>
                                              <Link href="/press" className="px-8 py-4 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-colors">
                                                            Press Kit
                                              </Link>
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
