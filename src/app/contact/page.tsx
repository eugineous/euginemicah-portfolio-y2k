"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">EM</span>
            </div>
            <span className="font-bold text-xl">EM TV HUB</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <Link href="/about" className="hover:text-red-400">About</Link>
            <Link href="/career" className="hover:text-red-400">Career</Link>
            <Link href="/shows" className="hover:text-red-400">Shows</Link>
            <Link href="/gallery" className="hover:text-red-400">Gallery</Link>
            <Link href="/press" className="hover:text-red-400">Press Kit</Link>
            <Link href="/contact" className="text-red-400">Contact</Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-400 font-medium mb-4">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="gradient-text">Let's Work Together</span></h1>
            <p className="text-xl text-gray-400">Bookings, interviews, collaborations, and media inquiries.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h2>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-red-400 text-sm mb-1">Email</p>
                  <a href="mailto:eugine.micah@outlook.com" className="text-xl font-medium hover:text-red-400">eugine.micah@outlook.com</a>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-red-400 text-sm mb-1">Phone</p>
                  <a href="tel:+254799886247" className="text-xl font-medium hover:text-red-400">+254 799 886247</a>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <p className="text-red-400 text-sm mb-1">Location</p>
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
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 glass-card rounded-full text-sm hover:bg-red-500/20 hover:text-red-400 transition-colors">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:outline-none" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:outline-none" />
                </div>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:outline-none">
                  <option value="">Select Request Type</option>
                  <option>MC / Event Hosting</option>
                  <option>Interview Request</option>
                  <option>Show Collaboration</option>
                  <option>Speaking Engagement</option>
                  <option>Mentorship</option>
                  <option>Press Inquiry</option>
                  <option>Other</option>
                </select>
                <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-red-500 focus:outline-none resize-none"></textarea>
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
