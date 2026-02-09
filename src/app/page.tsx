import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { label: 'Total Reach', value: '20M+' },
  { label: 'Subscribers', value: '3K+' },
  { label: 'Weekly Viewers', value: '3M+' },
  { label: 'Interviews', value: '500+' },
  ];

const shows = [
  { id: 'PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz', title: 'Urban News PPP TV', desc: 'Fast, youth culture news from Nairobi' },
  { id: 'PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz', title: 'The Nairobi Podcast', desc: 'Conversations on city life, work, and youth' },
  { id: 'PLxiuxBobXxN2WTp4OpjdI8zW51o0FTPjL', title: 'Campus Xposure', desc: 'Stories of student life and innovation' },
  { id: 'PLxiuxBobXxN0hMXo1gSmYg98NywNBz4Zc', title: 'Pacesetters Talent Search', desc: 'National talent hunt from auditions to finals' },
  { id: 'PLxiuxBobXxN1GereB-vIDo80el58VK1Mi', title: 'Hoods Finest', desc: 'Docuseries profiling artists and community leaders' },
  { id: 'PLxiuxBobXxN3g4EoZcuuiP1y4LUjj8W3L', title: 'Celebrity Interviews', desc: 'One-on-one talks with entertainers and creators' },
  ];

export default function Home() {
    return (
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                  <Link href="/" className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                            <span className="text-black font-bold text-sm">EM</span>span>
                                              </div>div>
                                              <span className="font-bold text-xl tracking-tight">EUGINE MICAH</span>span>
                                  </Link>Link>
                                  <div className="hidden md:flex items-center gap-8">
                                              <Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link>Link>
                                              <Link href="/career" className="text-white/70 hover:text-white transition-colors">Career</Link>Link>
                                              <Link href="/shows" className="text-white/70 hover:text-white transition-colors">Shows</Link>Link>
                                              <Link href="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link>Link>
                                              <Link href="/press" className="text-white/70 hover:text-white transition-colors">Press</Link>Link>
                                              <Link href="/contact" className="px-5 py-2 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-medium hover:opacity-90 transition-opacity">Contact</Link>Link>
                                  </div>div>
                        </div>div>
                </nav>nav>
          
            {/* Hero Section - Cinematic */}
                <section className="relative min-h-screen flex items-center justify-center pt-20">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#009245]/20 via-transparent to-[#0a0a0a]"></div>div>
                        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                                  <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-6">Journalist • TV Host • Media Personality</p>p>
                                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
                                              EUGINE<br />MICAH
                                  </h1>h1>
                                  <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
                                              Shaping African culture through storytelling, media, and conversation.
                                  </p>p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <Link href="/shows" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity">
                                                            Watch My Shows
                                              </Link>Link>
                                              <Link href="/about" className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                                                            Learn More
                                              </Link>Link>
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* Authority Stats */}
                <section className="py-20 border-y border-white/10">
                        <div className="max-w-6xl mx-auto px-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {stats.map((stat, i) => (
                          <div key={i} className="text-center">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">{stat.value}</div>div>
                                          <div className="text-white/50 mt-2 uppercase tracking-wider text-sm">{stat.label}</div>div>
                          </div>div>
                        ))}
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* Featured Shows - Netflix Style */}
                <section className="py-24">
                        <div className="max-w-7xl mx-auto px-6">
                                  <div className="flex items-center justify-between mb-12">
                                              <h2 className="text-3xl md:text-4xl font-bold">Featured Shows</h2>h2>
                                              <Link href="/shows" className="text-[#009245] hover:text-[#00b359] transition-colors">View All →</Link>Link>
                                  </div>div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {shows.map((show) => (
                          <a key={show.id} href={`https://www.youtube.com/playlist?list=${show.id}`} target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors">
                                          <img src={`https://i.ytimg.com/vi/${show.id.slice(0,11)}/maxresdefault.jpg`} alt={show.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>div>
                                          <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <h3 className="text-xl font-bold mb-2">{show.title}</h3>h3>
                                                            <p className="text-white/70 text-sm">{show.desc}</p>p>
                                          </div>div>
                          </a>a>
                        ))}
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* About Snapshot */}
                <section className="py-24 bg-gradient-to-b from-transparent via-[#009245]/5 to-transparent">
                        <div className="max-w-6xl mx-auto px-6">
                                  <div className="grid md:grid-cols-2 gap-16 items-center">
                                              <div>
                                                            <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-4">About</p>p>
                                                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Born Broke,<br />Built Loud</h2>h2>
                                                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                                                            From Kisumu to national television, Eugine Micah has become one of Kenya's most influential young journalists. As Head of Digital at PPP TV and founder of Roylandz Media, he shapes how millions experience news and culture.
                                                            </p>p>
                                                            <Link href="/about" className="inline-flex items-center gap-2 text-[#009245] font-semibold hover:gap-4 transition-all">
                                                                            Read Full Story <span>→</span>span>
                                                            </Link>Link>
                                              </div>div>
                                              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-[#009245]/30 to-[#FCEE21]/20"></div>div>
                                              </div>div>
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* Philosophy Quote */}
                <section className="py-32">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                                  <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light italic leading-relaxed">
                                              "Storytelling is how culture remembers itself."
                                  </blockquote>blockquote>
                                  <p className="mt-8 text-white/50">— Eugine Micah</p>p>
                        </div>div>
                </section>section>
          
            {/* Final CTA */}
                <section className="py-24 bg-gradient-to-t from-[#009245]/20 to-transparent">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Together</h2>h2>
                                  <p className="text-white/70 text-xl mb-10">Available for bookings, media inquiries, and collaborations.</p>p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity">
                                                            Book Me
                                              </Link>Link>
                                              <Link href="/press" className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                                                            Media Inquiries
                                              </Link>Link>
                                  </div>div>
                        </div>div>
                </section>section>
          
            {/* Footer */}
                <footer className="py-12 border-t border-white/10">
                        <div className="max-w-7xl mx-auto px-6">
                                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                              <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                                            <span className="text-black font-bold text-xs">EM</span>span>
                                                            </div>div>
                                                            <span className="font-bold">EUGINE MICAH</span>span>
                                              </div>div>
                                              <div className="flex items-center gap-6 text-white/50">
                                                            <a href="https://youtube.com/@euginemicah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>a>
                                                            <a href="https://instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>a>
                                                            <a href="https://tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>a>
                                                            <a href="https://x.com/eugineroylandz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>a>
                                              </div>div>
                                              <p className="text-white/30 text-sm">© 2026 Eugine Micah. All rights reserved.</p>p>
                                  </div>div>
                        </div>div>
                </footer>footer>
          </div>div>
        );
}</div>
