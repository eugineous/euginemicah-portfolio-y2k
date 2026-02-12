"use client";

import Link from "next/link";

export default function CareerPage() {
    const workHistory = [
      { company: "PPP TV", role: "TV Presenter, Head of Digital, Creative Lead", period: "2024 - Present", description: "Co-host Urban News and Campus Xposure. Lead digital growth, packaging, analytics, and shortform systems." },
      { company: "Citizen TV", role: "News Reporter", period: "2022 - 2023", description: "Field reports, live hits, and bulletins on politics, community, and youth issues at Royal Media Services." },
      { company: "Roylandz Media", role: "Founder & CEO", period: "2020 - Present", description: "Shows, podcasts, and branded content for youth and culture. The Nairobi Podcast, Hoods Finest, and more." },
      { company: "TIBS TV & FM", role: "TV and Radio Host", period: "2020 - 2022", description: "Campus shows including TIBS Got Talent, Rhumba Jouissance, and The Overview Show." },
      { company: "Base Radio", role: "Radio Host & Social Media", period: "2023", description: "Interactive drive-time show blending news, music, and real-time conversations." },
        ];

  const shows = [
    { title: "Urban News", network: "PPP TV", format: "TV & Web Series", genre: "News, Pop Culture", year: "2024", reach: "3M+ weekly viewers", thumbnail: "https://i.ytimg.com/vi/cX2qSGQ_vzc/hqdefault.jpg" },
    { title: "Campus Xposure", network: "PPP TV", format: "TV & Web Series", genre: "Reality, Education", year: "2024", reach: "Campus tours nationwide", thumbnail: "https://i.ytimg.com/vi/waccHFWq9Z8/hqdefault.jpg" },
    { title: "The Nairobi Podcast", network: "Roylandz Media", format: "Podcast", genre: "Talk, Society", year: "2024", reach: "Weekly episodes", thumbnail: "https://i.ytimg.com/vi/sr3eSfpC6jY/hqdefault.jpg" },
    { title: "Hoods Finest", network: "Roylandz Media", format: "Docuseries", genre: "Documentary", year: "2023", reach: "Nairobi estates", thumbnail: "https://i.ytimg.com/vi/nR1sEvm8j-0/hqdefault.jpg" },
      ];

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
                                            <Link href="/career" className="text-[#009245]">Career</Link>Link>
                                            <Link href="/shows" className="hover:text-[#009245] transition-colors">Shows</Link>Link>
                                            <Link href="/gallery" className="hover:text-[#009245] transition-colors">Gallery</Link>Link>
                                            <Link href="/press" className="hover:text-[#009245] transition-colors">Press Kit</Link>Link>
                                            <Link href="/contact" className="hover:text-[#009245] transition-colors">Contact</Link>Link>
                                </div>div>
                      </div>div>
              </nav>nav>
        
          {/* Hero */}
              <section className="pt-32 pb-16 px-6">
                      <div className="max-w-7xl mx-auto text-center">
                                <p className="text-[#009245] font-medium mb-4">CAREER HIGHLIGHTS</p>p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Building Media Excellence</span>span>
                                </h1>h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                            From campus radio to national television. A journey of persistence, growth, and impact.
                                </p>p>
                      </div>div>
              </section>section>
        
          {/* Stats */}
              <section className="py-12 px-6">
                      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
          { value: "3M+", label: "Weekly Viewers" },
          { value: "3K+", label: "Subscribers" },
          { value: "500+", label: "Interviews" },
          { value: "2019", label: "Started Career" },
                    ].map((stat, index) => (
                                  <div key={index} className="glass-card p-6 rounded-2xl text-center border border-[#009245]/20">
                                                <p className="text-3xl font-bold bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">{stat.value}</p>p>
                                                <p className="text-gray-400">{stat.label}</p>p>
                                  </div>div>
                                ))}
                      </div>div>
              </section>section>
        
          {/* Work History */}
              <section className="py-16 px-6">
                      <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold mb-12"><span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Work Experience</span>span></h2>h2>
                                <div className="space-y-6">
                                  {workHistory.map((job, index) => (
                        <div key={index} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform border border-[#009245]/20">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                                          <div>
                                                                              <h3 className="text-xl font-bold">{job.company}</h3>h3>
                                                                              <p className="text-[#009245]">{job.role}</p>p>
                                                          </div>div>
                                                          <p className="text-gray-400">{job.period}</p>p>
                                        </div>div>
                                        <p className="text-gray-400">{job.description}</p>p>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* Shows */}
              <section className="py-16 px-6 bg-gradient-to-b from-transparent to-[#009245]/10">
                      <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold mb-12"><span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Shows & Series</span>span></h2>h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                  {shows.map((show, index) => (
                        <div key={index} className="glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform border border-[#009245]/20">
                                        <img src={show.thumbnail} alt={show.title} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                                          <div className="flex items-center gap-2 mb-2">
                                                                              <span className="px-3 py-1 bg-[#009245]/20 text-[#009245] rounded-full text-sm">{show.network}</span>span>
                                                                              <span className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">{show.format}</span>span>
                                                          </div>div>
                                                          <h3 className="text-xl font-bold mb-2">{show.title}</h3>h3>
                                                          <p className="text-gray-400 text-sm">Genre: {show.genre} • Year: {show.year}</p>p>
                                                          <p className="text-[#009245] text-sm mt-2">{show.reach}</p>p>
                                        </div>div>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* CTA */}
              <section className="py-20 px-6">
                      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#009245]/20">
                                <h2 className="text-3xl font-bold mb-4"><span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Work With Me</span>span></h2>h2>
                                <p className="text-gray-400 mb-8">Hosting, interviews, shows, strategy, mentorship.</p>p>
                                <div className="flex flex-wrap justify-center gap-4">
                                            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-full font-semibold hover:opacity-90 transition-opacity">Start a Booking</Link>Link>
                                            <Link href="/shows" className="px-8 py-3 glass-card rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors">View Shows</Link>Link>
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
