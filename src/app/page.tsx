import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { label: 'Total Reach', value: '20M+' },
  { label: 'Subscribers', value: '3K+' },
  { label: 'Weekly Viewers', value: '3M+' },
  { label: 'Interviews', value: '500+' },
  ];

const shows = [
  { id: 'PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz', title: 'Urban News', desc: "Kenya's leading youth culture news show reaching 2M+ weekly viewers on PPP TV.", episodes: 150, platform: 'PPP TV & YouTube' },
  { id: 'PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz', title: 'The Nairobi Podcast', desc: 'The Digital Kemoview: In-depth conversations with influential voices shaping African culture.', episodes: 45, platform: 'Spotify & YouTube' },
  { id: 'PLxiuxBobXxN2WTp4OpjdI8zW51o0FTPjL', title: 'Campus Xposure', desc: 'Bridging the gap between student innovation and national visibility.', episodes: 60, platform: 'PPP TV' },
  { id: 'PLxiuxBobXxN0hMXo1gSmYg98NywNBz4Zc', title: 'Pacesetters Talent Search', desc: 'National talent hunt from auditions to finals', episodes: 30, platform: 'PPP TV' },
  { id: 'PLxiuxBobXxN1GereB-vIDo80el58VK1Mi', title: 'Hoods Finest', desc: 'Docuseries profiling artists and community leaders', episodes: 25, platform: 'YouTube' },
  { id: 'PLxiuxBobXxN3g4EoZcuuiP1y4LUjj8W3L', title: 'Celebrity Interviews', desc: 'One-on-one talks with entertainers and creators', episodes: 100, platform: 'YouTube' },
  ];

const roylandzRules = [
  { id: 1, text: "The world listens louder when you speak from scars, not ego.", label: "Vulnerability" },
  { id: 3, text: "When life gives you cow dung, make it your foundation.", label: "Origins" },
  { id: 11, text: "Silence is survival only until you realize noise is power.", label: "The Shift" },
  { id: 17, text: "Belief is the most valuable investment anyone can make in you.", label: "Accountability" },
  { id: 28, text: "Create a version of yourself brave enough to do what you're scared to attempt.", label: "Persona" },
  { id: 38, text: "Success shows you who you became; therapy shows you why. You need both.", label: "Balance" },
  ];

const timeline = [
  { year: '2024 - Present', role: 'Digital Landmark Builder', company: 'PPP TV / Roylandz Media', details: 'Converting childhood noise into national utility. Reaching 20M+ monthly across digital ecosystems.' },
  { year: '2024', role: 'Valedictorian (The Pivot)', company: 'TIBS College', details: 'Proving that marks do not define worth - utility and confidence do. Graduated top of class.' },
  { year: '2021', role: 'The Foundation Test', company: 'Lumakanda', details: 'Navigating the loss of Grandpa David and Grandma Gladys while standing on national stages.' },
  { year: '2008', role: 'The First Audience', company: 'Manyonyi Village', details: 'Managing the "Danson Audience" (younger brother) and reading to chickens to survive silence.' },
  ];

export default function Home() {
    return (
          <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
                        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                                  <Link href="/" className="flex items-center gap-3">
                                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                            <span className="text-black font-bold text-sm">EM</span>
                                              </div>
                                              <span className="font-bold text-xl tracking-tight">EUGINE MICAH</span>
                                  </Link>
                                  <div className="hidden md:flex items-center gap-8">
                                              <Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
                                              <Link href="/career" className="text-white/70 hover:text-white transition-colors">Career</Link>
                                              <Link href="/shows" className="text-white/70 hover:text-white transition-colors">Shows</Link>
                                              <Link href="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link>
                                              <Link href="/press" className="text-white/70 hover:text-white transition-colors">Press</Link>
                                              <Link href="/contact" className="px-5 py-2 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-medium hover:opacity-90 transition-opacity">Contact</Link>
                                  </div>
                        </div>
                </nav>
          
            {/* Hero Section - Cinematic */}
                <section className="relative min-h-screen flex items-center justify-center pt-20">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#009245]/20 via-transparent to-[#0a0a0a]"></div>
                        <div className="absolute inset-0 z-0">
                                  <iframe 
                                                className="w-full h-full scale-[1.3] pointer-events-none opacity-30 blur-[2px]"
                                                src="https://www.youtube.com/embed/wROaKxIgMWs?autoplay=1&mute=1&loop=1&playlist=wROaKxIgMWs&controls=0&modestbranding=1&rel=0&playsinline=1"
                                                title="Eugine Micah Digital Legacy"
                                                frameBorder="0"
                                                allow="autoplay; encrypted-media"
                                              ></iframe>
                        </div>
                        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                                  <div className="inline-flex items-center gap-4 px-6 py-2 bg-[#009245]/10 backdrop-blur-xl rounded-full text-[#FCEE21] text-[10px] font-black mb-10 border border-[#009245]/30 tracking-[0.3em] uppercase animate-pulse">
                                              Official Site of Eugine Micah
                                  </div>
                                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
                                              <span className="block opacity-90">BORN BROKE</span>
                                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#009245] via-[#FCEE21] to-white">BUILT LOUD</span>
                                  </h1>
                                  <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
                                              Journalist • TV Presenter • Author<br />
                                              <span className="text-white/60">Converting silence into national narrative currency.</span>
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <Link href="#shop" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-[0_15px_50px_rgba(0,146,69,0.5)]">
                                                            THE MEMOIR
                                              </Link>
                                              <Link href="/shows" className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                                                            WATCH SHOWS
                                              </Link>
                                  </div>
                        </div>
                </section>
          
            {/* Authority Stats */}
                <section className="py-20 border-y border-white/10">
                        <div className="max-w-6xl mx-auto px-6">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {stats.map((stat, i) => (
                          <div key={i} className="text-center">
                                          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#009245] to-[#FCEE21] bg-clip-text text-transparent">{stat.value}</div>
                                          <div className="text-white/50 mt-2 uppercase tracking-wider text-sm">{stat.label}</div>
                          </div>
                        ))}
                                  </div>
                        </div>
                </section>
          
            {/* Featured Shows */}
                <section className="py-24">
                        <div className="max-w-7xl mx-auto px-6">
                                  <div className="flex items-center justify-between mb-12">
                                              <h2 className="text-3xl md:text-4xl font-bold">Featured Shows</h2>
                                              <Link href="/shows" className="text-[#009245] hover:text-[#00b359] transition-colors">View All →</Link>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {shows.map((show) => (
                          <a key={show.id} href={`https://www.youtube.com/playlist?list=${show.id}`} target="_blank" rel="noopener noreferrer" className="group relative aspect-video rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors">
                                          <img src={`https://i.ytimg.com/vi/${show.id.slice(0,11)}/maxresdefault.jpg`} alt={show.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                          <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                                <span className="px-2 py-1 bg-[#009245]/20 text-[#FCEE21] text-xs rounded-full">{show.platform}</span>
                                                                                <span className="text-white/50 text-xs">{show.episodes} episodes</span>
                                                            </div>
                                                            <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                                                            <p className="text-white/70 text-sm">{show.desc}</p>
                                          </div>
                          </a>
                        ))}
                                  </div>
                        </div>
                </section>
          
            {/* Roylandz Rules */}
                <section className="py-24 bg-gradient-to-b from-transparent via-[#009245]/5 to-transparent">
                        <div className="max-w-6xl mx-auto px-6">
                                  <div className="text-center mb-16">
                                              <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-4">Philosophy</p>
                                              <h2 className="text-4xl md:text-5xl font-bold">The Roylandz Rules</h2>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {roylandzRules.map((rule) => (
                          <div key={rule.id} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-[#009245]/50 transition-all">
                                          <div className="flex items-center gap-3 mb-4">
                                                            <span className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#009245] to-[#FCEE21] rounded-full text-black font-bold text-sm">#{rule.id}</span>
                                                            <span className="text-[#FCEE21] text-xs uppercase tracking-widest">{rule.label}</span>
                                          </div>
                                          <p className="text-white/80 italic">"{rule.text}"</p>
                          </div>
                        ))}
                                  </div>
                        </div>
                </section>
          
            {/* Career Timeline */}
                <section className="py-24">
                        <div className="max-w-4xl mx-auto px-6">
                                  <div className="text-center mb-16">
                                              <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-4">Journey</p>
                                              <h2 className="text-4xl md:text-5xl font-bold">Career Timeline</h2>
                                  </div>
                                  <div className="space-y-8">
                                    {timeline.map((item, i) => (
                          <div key={i} className="relative pl-8 border-l-2 border-[#009245]/30 hover:border-[#009245] transition-colors">
                                          <div className="absolute left-[-9px] top-0 w-4 h-4 bg-gradient-to-br from-[#009245] to-[#FCEE21] rounded-full"></div>
                                          <div className="text-[#FCEE21] text-sm font-bold mb-2">{item.year}</div>
                                          <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                                          <p className="text-[#009245] text-sm mb-2">{item.company}</p>
                                          <p className="text-white/60">{item.details}</p>
                          </div>
                        ))}
                                  </div>
                        </div>
                </section>
          
            {/* About Snapshot */}
                <section className="py-24 bg-gradient-to-b from-transparent via-[#009245]/5 to-transparent">
                        <div className="max-w-6xl mx-auto px-6">
                                  <div className="grid md:grid-cols-2 gap-16 items-center">
                                              <div>
                                                            <p className="text-[#FCEE21] font-medium tracking-widest uppercase mb-4">About</p>
                                                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Born Broke,<br />Built Loud</h2>
                                                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                                                            From Kisumu to national television, Eugine Micah has become one of Kenya's most influential young journalists. As Head of Digital at PPP TV and founder of Roylandz Media, he shapes how millions experience news and culture.
                                                            </p>
                                                            <Link href="/about" className="inline-flex items-center gap-2 text-[#009245] font-semibold hover:gap-4 transition-all">
                                                                            Read Full Story <span>→</span>
                                                            </Link>
                                              </div>
                                              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5">
                                                            <div className="absolute inset-0 bg-gradient-to-br from-[#009245]/30 to-[#FCEE21]/20"></div>
                                              </div>
                                  </div>
                        </div>
                </section>
          
            {/* Philosophy Quote */}
                <section className="py-32">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                                  <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light italic leading-relaxed">
                                              "Storytelling is how culture remembers itself."
                                  </blockquote>
                                  <p className="mt-8 text-white/50">— Eugine Micah</p>
                        </div>
                </section>
          
            {/* Contact Section */}
                <section id="contact" className="py-24 bg-[#121214]">
                        <div className="max-w-7xl mx-auto px-6">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                              <div>
                                                            <h2 className="text-[#FCEE21] font-bold text-sm tracking-[0.3em] uppercase mb-4">Get In Touch</h2>
                                                            <h3 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">LET'S CONNECT</h3>
                                                            <div className="space-y-12 mt-12">
                                                                            <div>
                                                                                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Booking & Speaking</h5>
                                                                                              <p className="text-2xl font-bold hover:text-[#009245] transition-all cursor-pointer">eugine.micah@outlook.com</p>
                                                                            </div>
                                                                            <div>
                                                                                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Location</h5>
                                                                                              <p className="text-2xl font-bold">Nairobi, Kenya</p>
                                                                            </div>
                                                                            <div>
                                                                                              <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Social</h5>
                                                                                              <div className="flex gap-6 mt-4">
                                                                                                                  <a href="https://instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#009245] transition-all uppercase tracking-widest">Instagram</a>
                                                                                                                  <a href="https://x.com/eugineroylandz" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#009245] transition-all uppercase tracking-widest">X</a>
                                                                                                                  <a href="https://tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#009245] transition-all uppercase tracking-widest">TikTok</a>
                                                                                                                  <a href="https://youtube.com/@euginemicah" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#009245] transition-all uppercase tracking-widest">YouTube</a>
                                                                                                                  <a href="https://linkedin.com/in/euginemicah" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-gray-400 hover:text-[#009245] transition-all uppercase tracking-widest">LinkedIn</a>
                                                                                                </div>
                                                                            </div>
                                                            </div>
                                              </div>
                                              <div className="p-10 md:p-14 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
                                                            <div className="space-y-6">
                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                                              <div>
                                                                                                                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Name</label>
                                                                                                                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#009245] transition-all" />
                                                                                                </div>
                                                                                              <div>
                                                                                                                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Email</label>
                                                                                                                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#009245] transition-all" />
                                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Subject</label>
                                                                                              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#009245] transition-all appearance-none text-gray-300">
                                                                                                                  <option>Media Inquiry</option>
                                                                                                                  <option>Speaking Engagement</option>
                                                                                                                  <option>Brand Collaboration</option>
                                                                                                                  <option>Book Feedback</option>
                                                                                                </select>
                                                                            </div>
                                                                            <div>
                                                                                              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Message</label>
                                                                                              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-[#009245] transition-all resize-none"></textarea>
                                                                            </div>
                                                                            <button type="submit" className="w-full py-5 bg-gradient-to-r from-[#009245] to-[#00b359] text-white font-bold text-lg rounded-xl hover:opacity-90 transition-all shadow-xl">
                                                                                              SEND MESSAGE
                                                                            </button>
                                                            </div>
                                              </div>
                                  </div>
                        </div>
                </section>
          
            {/* Final CTA */}
                <section className="py-24 bg-gradient-to-t from-[#009245]/20 to-transparent">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Together</h2>
                                  <p className="text-white/70 text-xl mb-10">Available for bookings, media inquiries, and collaborations.</p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-[#009245] to-[#00b359] rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity">
                                                            Book Me
                                              </Link>
                                              <Link href="/press" className="px-8 py-4 border border-white/30 rounded-full text-white font-semibold text-lg hover:bg-white/10 transition-colors">
                                                            Media Inquiries
                                              </Link>
                                  </div>
                        </div>
                </section>
          
            {/* Footer */}
                <footer className="py-12 border-t border-white/10">
                        <div className="max-w-7xl mx-auto px-6">
                                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                              <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#009245] to-[#FCEE21] flex items-center justify-center">
                                                                            <span className="text-black font-bold text-xs">EM</span>
                                                            </div>
                                                            <span className="font-bold">EUGINE MICAH</span>
                                              </div>
                                              <div className="flex items-center gap-6 text-white/50">
                                                            <a href="https://youtube.com/@euginemicah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                                                            <a href="https://instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                                                            <a href="https://tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                                                            <a href="https://x.com/eugineroylandz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>
                                              </div>
                                              <p className="text-white/30 text-sm">© 2026 Eugine Micah. All rights reserved.</p>
                                  </div>
                        </div>
                </footer>
          </div>
        );
}
