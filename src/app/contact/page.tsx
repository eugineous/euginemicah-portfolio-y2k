"use client";

import Link from "next/link";

export default function ContactPage() {
    return (
          <div className="min-h-screen bg-[#0a0a0a] text-white">
                <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                  <Link href="/" className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                            <span className="text-black font-bold text-sm">EM</span>
                                              </div>
                                              <span className="font-bold text-xl tracking-tight">EUGINE MICAH</span>
                                  </Link>
                                  <div className="hidden md:flex items-center gap-8">
                                              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
                                              <Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
                                              <Link href="/career" className="text-white/70 hover:text-white transition-colors">Career</Link>
                                              <Link href="/shows" className="text-white/70 hover:text-white transition-colors">Shows</Link>
                                              <Link href="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link>
                                              <Link href="/press" className="text-white/70 hover:text-white transition-colors">Press</Link>
                                              <Link href="/contact" className="px-5 py-2 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-medium">Contact</Link>
                                  </div>
                        </div>
                </nav>
          
                <section className="pt-32 pb-16 px-6">
                        <div className="max-w-7xl mx-auto">
                                  <div className="text-center mb-16">
                                              <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-4">GET IN TOUCH</p>
                                              <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Work Together</h1>
                                              <p className="text-xl text-gray-400">Bookings, interviews, collaborations, and media inquiries.</p>
                                  </div>
                        
                                  <div className="grid md:grid-cols-2 gap-12">
                                              <div>
                                                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Contact Information</h2>
                                                            <div className="space-y-6">
                                                                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                                                                              <p className="text-[#FCEE21] text-sm mb-1">Email</p>
                                                                                              <a href="mailto:eugine.micah@outlook.com" className="text-xl font-medium hover:text-[#009245] transition-colors">eugine.micah@outlook.com</a>
                                                                            </div>
                                                                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                                                                              <p className="text-[#FCEE21] text-sm mb-1">Phone</p>
                                                                                              <a href="tel:+254799886247" className="text-xl font-medium hover:text-[#009245] transition-colors">+254 799 886247</a>
                                                                            </div>
                                                                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                                                                                              <p className="text-[#FCEE21] text-sm mb-1">Location</p>
                                                                                              <p className="text-xl font-medium">Nairobi, Kenya</p>
                                                                            </div>
                                                            </div>
                                              
                                                            <h3 className="text-xl font-bold mt-8 mb-4">Follow Me</h3>
                                                            <div className="flex flex-wrap gap-3">
                                                              {[
            { name: "YouTube", url: "https://www.youtube.com/@euginemicah" },
            { name: "Instagram", url: "https://www.instagram.com/eugine.micah" },
            { name: "TikTok", url: "https://www.tiktok.com/@eugine.micah" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/euginemicah" },
            { name: "X", url: "https://x.com/eugineroylandz" },
                            ].map((social) => (
                                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 hover:bg-[#009245]/20 hover:text-[#FCEE21] hover:border-[#009245]/50 transition-all">
                                                  {social.name}
                                                </a>
                                              ))}
                                                            </div>
                                              </div>
                                  
                                              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                                                            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Send a Message</h2>
                                                            <form className="space-y-4">
                                                                            <div className="grid md:grid-cols-2 gap-4">
                                                                                              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#009245] focus:outline-none transition-colors" />
                                                                                              <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#009245] focus:outline-none transition-colors" />
                                                                            </div>
                                                                            <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#009245] focus:outline-none transition-colors text-gray-300">
                                                                                              <option value="">Select Request Type</option>
                                                                                              <option>MC / Event Hosting</option>
                                                                                              <option>Interview Request</option>
                                                                                              <option>Show Collaboration</option>
                                                                                              <option>Speaking Engagement</option>
                                                                                              <option>Mentorship</option>
                                                                                              <option>Press Inquiry</option>
                                                                                              <option>Other</option>
                                                                            </select>
                                                                            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-[#009245] focus:outline-none transition-colors resize-none"></textarea>
                                                                            <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-xl font-semibold hover:opacity-90 transition-opacity">
                                                                                              Send Message
                                                                            </button>
                                                            </form>
                                              </div>
                                  </div>
                        </div>
                </section>
          
                <footer className="py-12 px-6 border-t border-white/10">
                        <div className="max-w-7xl mx-auto text-center">
                                  <p className="text-gray-500">© 2026 Eugine Micah. All rights reserved.</p>
                        </div>
                </footer>
          </div>
        );
}</div>
