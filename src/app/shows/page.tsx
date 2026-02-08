import Link from "next/link";

const playlists = [
  { id: "PLxiuxBobXxN2Swp44BE8FpO-qajoJ9Dxz", title: "Urban News PPP TV", desc: "Fast, youth culture news from Nairobi. Headlines, interviews, and talent spotlights. Hosted by Eugine Micah and Lucy Ogunde on PPP TV.", category: "ppp" },
  { id: "PLxiuxBobXxN1n5I5Awd8VxpfzsxSlZBmz", title: "The Nairobi Podcast", desc: "Conversations on city life, work, and youth issues. Co-hosted by Eugine Micah and Lucy Ogunde. Open, real, and weekly.", category: "podcast" },
  { id: "PLxiuxBobXxN2WTp4OpjdI8zW5lo0FTPjL", title: "Campus Xposure", desc: "A campus road show. Stories of student life, innovation, and talent across Kenyan universities.", category: "ppp" },
  { id: "PLxiuxBobXxN0hMXo1gSmYg98NywNBz4Zc", title: "Pacesetters Talent Search", desc: "National talent hunt from auditions to finals. Hosting, stage interviews, and spotlights for new acts.", category: "roylandz" },
  { id: "PLxiuxBobXxN1GereB-vIDo80el58VK1Mi", title: "Hoods Finest", desc: "Docuseries profiling artists, founders, and community leaders. Stories from Nairobi's estates.", category: "roylandz" },
  { id: "PLxiuxBobXxN3g4EoZcuuiP1y4LUjj8W3L", title: "Celebrity Interviews", desc: "One-on-one talks with entertainers and creators. Depth, context, and takeaways for fans and makers.", category: "roylandz" },
  { id: "PLxiuxBobXxN3hW7m3GfbRiSk4Tgezg3ZJ", title: "Young and Famous Podcast", desc: "Interviews with young builders and artists. Lessons on work and growth.", category: "podcast" },
  { id: "PLxiuxBobXxN1QSfHoVEh0OIKQecehvYy1", title: "PPP TV News", desc: "Daily and weekly news segments with a youth lens. Field updates and studio reads.", category: "ppp" },
];

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="font-bold text-lg">EM TV HUB</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-400 hover:text-white transition">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">About</Link>
            <Link href="/career" className="text-gray-400 hover:text-white transition">Career</Link>
            <Link href="/shows" className="text-white hover:text-red-500 transition">Shows</Link>
            <Link href="/gallery" className="text-gray-400 hover:text-white transition">Gallery</Link>
            <Link href="/press" className="text-gray-400 hover:text-white transition">Press Kit</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 hero-gradient">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">My <span className="gradient-text">Shows</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch all my YouTube playlists featuring news, podcasts, interviews, and documentaries. 
            All videos autoplay for seamless viewing.
          </p>
        </div>
      </section>

      {/* Playlists Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {playlists.map((playlist, i) => (
              <div key={i} className="glass-card overflow-hidden group">
                <div className="video-container">
                  <iframe
                    src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}&autoplay=1&mute=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      playlist.category === 'ppp' ? 'bg-red-500/20 text-red-400' :
                      playlist.category === 'podcast' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {playlist.category === 'ppp' ? 'PPP TV' : 
                       playlist.category === 'podcast' ? 'Podcast' : 'Roylandz'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-red-500 transition">{playlist.title}</h3>
                  <p className="text-gray-400">{playlist.desc}</p>
                  <a 
                    href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                    target="_blank"
                    className="inline-block mt-4 text-red-500 hover:text-red-400 transition font-semibold"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto glass-card p-12 text-center glow-red">
          <h2 className="text-3xl font-bold mb-4">Subscribe to My Channel</h2>
          <p className="text-gray-400 mb-8">Join 3K+ subscribers for weekly content on news, culture, and African stories.</p>
          <a 
            href="https://www.youtube.com/@euginemicah?sub_confirmation=1" 
            target="_blank"
            className="px-8 py-4 gradient-bg rounded-full font-semibold inline-block hover:opacity-90 transition"
          >
            Subscribe on YouTube
          </a>
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
          <p className="text-gray-500 text-sm">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
