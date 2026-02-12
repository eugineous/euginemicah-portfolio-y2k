"use client";

import Link from "next/link";

export default function ShowsPage() {
    const shows = [
      {
              id: '1',
              title: 'Urban News',
              category: 'News',
              description: "Kenya's leading youth culture news show reaching 2M+ weekly viewers on PPP TV.",
              thumbnail: 'https://i.ytimg.com/vi/cX2qSGQ_vzc/hqdefault.jpg',
              episodes: 150,
              platform: 'PPP TV & YouTube',
              playlistUrl: 'https://www.youtube.com/playlist?list=PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz'
      },
      {
              id: '2',
              title: 'The Nairobi Podcast',
              category: 'Podcast',
              description: 'The Digital Kemoview: In-depth conversations with influential voices shaping African culture.',
              thumbnail: 'https://i.ytimg.com/vi/sr3eSfpC6jY/hqdefault.jpg',
              episodes: 45,
              platform: 'Spotify & YouTube',
              playlistUrl: 'https://www.youtube.com/playlist?list=PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz'
      },
      {
              id: '3',
              title: 'Campus Xposure',
              category: 'Reality',
              description: 'Bridging the gap between student innovation and national visibility.',
              thumbnail: 'https://i.ytimg.com/vi/waccHFWq9Z8/hqdefault.jpg',
              episodes: 60,
              platform: 'PPP TV',
              playlistUrl: 'https://www.youtube.com/playlist?list=PLxiuxBobXxN2WTp4OpjdI8zW5lo0FTPjL'
      },
      {
              id: '4',
              title: 'Hoods Finest',
              category: 'Documentary',
              description: 'Docuseries profiling artists, founders, and community leaders from Nairobi estates.',
              thumbnail: 'https://i.ytimg.com/vi/nR1sEvm8j-0/hqdefault.jpg',
              episodes: 20,
              platform: 'Roylandz Media',
              playlistUrl: 'https://www.youtube.com/playlist?list=PLxiuxBobXxN1GereB-vIDo80el58VK1Mi'
      },
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
                                            <Link href="/career" className="hover:text-[#009245] transition-colors">Career</Link>Link>
                                            <Link href="/shows" className="text-[#009245]">Shows</Link>Link>
                                            <Link href="/gallery" className="hover:text-[#009245] transition-colors">Gallery</Link>Link>
                                            <Link href="/press" className="hover:text-[#009245] transition-colors">Press Kit</Link>Link>
                                            <Link href="/contact" className="hover:text-[#009245] transition-colors">Contact</Link>Link>
                                </div>div>
                      </div>div>
              </nav>nav>
        
          {/* Hero */}
              <section className="pt-32 pb-16 px-6">
                      <div className="max-w-7xl mx-auto text-center">
                                <p className="text-[#009245] font-medium mb-4">ORIGINAL PRODUCTIONS</p>p>
                                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">THE MEDIA HUB</span>span>
                                </h1>h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                            From national TV to digital podcasts. Stories that matter, told with authenticity.
                                </p>p>
                      </div>div>
              </section>section>
        
          {/* Featured Show */}
              <section className="py-12 px-6">
                      <div className="max-w-7xl mx-auto">
                                <div className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-[#009245]/20">
                                            <img 
                                                            src={shows[0].thumbnail} 
                                              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                                              alt={shows[0].title} 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                                          <div className="flex items-center gap-3 mb-4">
                                                                          <span className="px-3 py-1 bg-[#009245] text-black text-xs font-bold rounded-md">TRENDING</span>span>
                                                                          <span className="text-white/60 text-xs font-bold tracking-widest">{shows[0].episodes} EPISODES</span>span>
                                                          </div>div>
                                                          <h4 className="text-4xl md:text-6xl font-display font-extrabold mb-4">{shows[0].title}</h4>h4>
                                                          <p className="text-gray-300 max-w-xl mb-8 leading-relaxed font-medium">{shows[0].description}</p>p>
                                                          <a 
                                                                            href={shows[0].playlistUrl} 
                                                            target="_blank" 
                                                            rel="noreferrer" 
                                                            className="inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-[#009245] hover:text-white transition-all"
                                                                          >
                                                                          Watch Now
                                                                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                                                                            <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                                                                          </svg>svg>
                                                          </a>a>
                                            </div>div>
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* Other Shows Grid */}
              <section className="py-16 px-6">
                      <div className="max-w-7xl mx-auto">
                                <h2 className="text-3xl font-bold mb-12">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">More Shows</span>span>
                                </h2>h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                  {shows.slice(1).map((show) => (
                        <div key={show.id} className="glass-card p-4 rounded-3xl group cursor-pointer hover:border-[#009245]/40 transition-all border border-[#009245]/20">
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                                          <img 
                                                                                src={show.thumbnail} 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                                                            alt={show.title} 
                                                          />
                                        </div>div>
                                        <div className="px-2">
                                                          <div className="flex justify-between items-center mb-3">
                                                                              <span className="text-[#009245] text-xs font-bold uppercase tracking-widest">{show.category}</span>span>
                                                                              <span className="text-gray-500 text-[10px] font-bold">{show.platform}</span>span>
                                                          </div>div>
                                                          <h5 className="text-2xl font-display font-bold mb-3">{show.title}</h5>h5>
                                                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">{show.description}</p>p>
                                                          <a 
                                                                                href={show.playlistUrl} 
                                                            target="_blank" 
                                                            rel="noreferrer" 
                                                            className="text-[#009245] font-bold text-sm hover:underline"
                                                                              >
                                                                              Watch Series →
                                                          </a>a>
                                        </div>div>
                        </div>div>
                      ))}
                                </div>div>
                      </div>div>
              </section>section>
        
          {/* CTA */}
              <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[#009245]/10">
                      <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-[#009245]/20">
                                <h2 className="text-3xl font-bold mb-4">
                                            <span className="bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">Want to Collaborate?</span>span>
                                </h2>h2>
                                <p className="text-gray-400 mb-8">Let's create something amazing together.</p>p>
                                <div className="flex flex-wrap justify-center gap-4">
                                            <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#009245] to-[#009245]/80 rounded-full font-semibold hover:opacity-90 transition-opacity">Get in Touch</Link>Link>
                                            <Link href="/press" className="px-8 py-3 glass-card rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors">View Press Kit</Link>Link>
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
