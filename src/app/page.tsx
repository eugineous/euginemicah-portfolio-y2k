import Link from "next/link";

const stats = [
  { label: "Total Reach", value: "20M+" },
  { label: "Subscribers", value: "3K+" },
  { label: "Weekly Viewers", value: "3M+" },
  { label: "Interviews", value: "500+" },
];

const shows = [
  { id: "PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz", title: "Urban News PPP TV", desc: "Fast, youth culture news from Nairobi. Headlines, interviews, and talent spotlights." },
  { id: "PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz", title: "The Nairobi Podcast", desc: "Conversations on city life, work, and youth issues with Eugine Micah and Lucy Ogunde." },
  { id: "PLxiuxBobXxN2WTp4OpjdI8zW5lo0FTPjL", title: "Campus Xposure", desc: "A campus road show featuring stories of student life, innovation, and talent." },
  { id: "PLxiuxBobXxN0hMXo1gSmYg98NywNBz4Zc", title: "Pacesetters Talent Search", desc: "National talent hunt from auditions to finals with stage interviews and spotlights." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="font-bold text-lg">EM TV HUB</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-red-500 transition">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link href="/career" className="text-gray-400 hover:text-white transition">Career</Link>
            <Link href="/shows" className="text-gray-400 hover:text-white transition">Shows</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition">Gallery</Link>
            <Link href="/press" className="text-gray-400 hover:text-white transition">Press Kit</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-30"
            src="https://www.youtube.com/embed/wROaKxIgMWs?autoplay=1&mute=1&loop=1&playlist=wROaKxIgMWs&controls=0&showinfo=0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="live-badge inline-block mb-6">LIVE</div>
          <p className="text-red-500 text-lg mb-4 tracking-widest">KENYAN JOURNALIST & STORYTELLER</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-float">EUGINE MICAH</h1>
          <p className="text-2xl md:text-3xl italic text-gray-300 mb-8 gradient-text">Born Broke, Built Loud</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shows" className="px-8 py-4 gradient-bg rounded-full font-semibold hover:opacity-90 transition glow-red">
              Watch Shows
            </Link>
            <Link href="/press" className="px-8 py-4 glass-card font-semibold hover:bg-white/10 transition">
              View Press Kit
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center stat-card animate-pulse-glow">
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-red-950/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card p-2 glow-red">
            <img src="https://i.ytimg.com/vi/wROaKxIgMWs/maxresdefault.jpg" alt="Eugine Micah" className="rounded-2xl w-full" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Empowering Africa through <span className="gradient-text">fearless journalism</span></h2>
            <p className="text-gray-300 text-lg mb-6">
              Eugine Micah is a Kenyan journalist, TV presenter, and digital media strategist. Head of Digital at PPP TV, 
              founder of Roylandz Media, and host of Urban News, Campus Xposure, and The Nairobi Podcast.
            </p>
            <p className="text-gray-400 mb-8">
              Born in Kisumu, raised in Lugari. TIBS College Valedictorian 2024. Building platforms that amplify African voices.
            </p>
            <Link href="/about" className="px-6 py-3 gradient-bg rounded-full font-semibold inline-block hover:opacity-90 transition">
              Read Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Featured <span className="gradient-text">Shows</span></h2>
          <p className="text-gray-400 text-center mb-12">Watch the latest episodes from my YouTube channel</p>
          <div className="grid md:grid-cols-2 gap-8">
            {shows.map((show, i) => (
              <div key={i} className="glass-card overflow-hidden group">
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/videoseries?list=${show.id}&autoplay=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition">{show.title}</h3>
                  <p className="text-gray-400">{show.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shows" className="px-8 py-4 glass-card font-semibold hover:bg-white/10 transition inline-block">
              View All Shows →
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-950/30 to-orange-950/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-4xl italic text-gray-200 leading-relaxed">
            "Media is my language. I build platforms that amplify voices often ignored. 
            I tell stories that connect youth to their culture and the world around them."
          </p>
          <p className="mt-8 text-red-500 font-semibold">— Eugine Micah</p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center glow-red">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-gray-400 mb-8">Available for hosting, interviews, speaking engagements, and media collaborations.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:eugine.micah@outlook.com" className="px-8 py-4 gradient-bg rounded-full font-semibold hover:opacity-90 transition">
              Get In Touch
            </a>
            <a href="tel:+254799886247" className="px-8 py-4 glass-card font-semibold hover:bg-white/10 transition">
              +254 799 886247
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="font-bold">Eugine Micah</span>
          </div>
          <div className="flex gap-6">
            <a href="https://www.youtube.com/@euginemicah" target="_blank" className="text-gray-400 hover:text-red-500 transition">YouTube</a>
            <a href="https://www.instagram.com/eugine.micah" target="_blank" className="text-gray-400 hover:text-red-500 transition">Instagram</a>
            <a href="https://www.tiktok.com/@eugine.micah" target="_blank" className="text-gray-400 hover:text-red-500 transition">TikTok</a>
            <a href="https://www.linkedin.com/in/euginemicah" target="_blank" className="text-gray-400 hover:text-red-500 transition">LinkedIn</a>
            <a href="https://x.com/eugineroylandz" target="_blank" className="text-gray-400 hover:text-red-500 transition">X</a>
          </div>
          <p className="text-gray-500 text-sm">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
