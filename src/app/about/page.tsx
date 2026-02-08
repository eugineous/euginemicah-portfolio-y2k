"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">EM</span>
            </div>
            <span className="font-bold text-xl">EM TV HUB</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
            <Link href="/about" className="text-red-400">About</Link>
            <Link href="/career" className="hover:text-red-400 transition-colors">Career</Link>
            <Link href="/shows" className="hover:text-red-400 transition-colors">Shows</Link>
            <Link href="/gallery" className="hover:text-red-400 transition-colors">Gallery</Link>
            <Link href="/press" className="hover:text-red-400 transition-colors">Press Kit</Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2">
                <img
                  src="/images/profile.jpg"
                  alt="Eugine Micah"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "https://i.ytimg.com/vi/wROaKxIgMWs/maxresdefault.jpg";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card px-6 py-4 rounded-2xl">
                <p className="text-red-400 font-bold text-2xl">Since 2019</p>
                <p className="text-gray-400 text-sm">In Media Industry</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="text-red-400 font-medium mb-4">ABOUT ME</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Eugine Micah</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Kenyan Journalist, TV Presenter, Head of Digital at PPP TV, and Founder of Roylandz Media.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Born on Christmas Eve 2001 in Kisumu, Kenya. Raised in Lugari, Kakamega County. 
                I've spent the last six years learning one thing: how to make stories impossible to ignore.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed">
                At 24, I've hosted a TV show reaching 3 million Kenyans every week, built a personal 
                audience of 3,000+ subscribers across platforms, and worked with brands to turn content 
                into real business results.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I build systems that connect stories to the people who need to hear them. Whether that's 
                through television, digital media, or whatever platform comes next, my job is the same: 
                take a message, find its audience, and make sure it lands with impact.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full font-semibold hover:opacity-90 transition-opacity">
                  Book Me
                </Link>
                <Link href="/press" className="px-8 py-3 glass-card rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Press Kit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-red-950/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">What I Do</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📺",
                title: "TV Presenting & Hosting",
                description: "Co-host Urban News on PPP TV, reaching 3M+ weekly viewers. Live anchoring, interviews, and entertainment hosting."
              },
              {
                icon: "🎙️",
                title: "Podcast Production",
                description: "Host of The Nairobi Podcast and Young and Famous Podcast. Conversations on city life, work, and youth issues."
              },
              {
                icon: "📱",
                title: "Digital Strategy",
                description: "Head of Digital at PPP TV. SEO, analytics, social growth playbooks, and AI-powered content workflows."
              },
              {
                icon: "🎬",
                title: "Video Production",
                description: "Field production, interviews, scripting, story editing, and short-form video systems."
              },
              {
                icon: "🎤",
                title: "MC & Event Hosting",
                description: "Professional MC for corporate events, campus tours, talent shows, and live broadcasts."
              },
              {
                icon: "📚",
                title: "Mentorship & Training",
                description: "Training teams on on-camera work, newsroom systems, and digital content creation."
              }
            ].map((skill, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                <p className="text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">My Journey</span>
          </h2>
          
          <div className="space-y-8">
            {[
              { year: "2001", title: "Born in Kisumu", description: "Christmas Eve. Russia Hospital. Wrapped in a jacket because the hospital had no blankets." },
              { year: "2007-2019", title: "Education", description: "Mahemas Primary, Lumakanda Township Primary, Murgusi SDA High School. Valedictorian at TIBS College 2024." },
              { year: "2020", title: "TIBS College", description: "Started Diploma in Journalism and Mass Communication. Created 'The Overview Show' and 'Roylandz' brand." },
              { year: "2022", title: "Citizen TV", description: "News Reporter at Royal Media Services. Field reports, live hits, and bulletins on politics and youth issues." },
              { year: "2024", title: "PPP TV", description: "Head of Digital and TV Presenter. Co-host of Urban News reaching 3M+ weekly viewers." },
              { year: "Present", title: "Roylandz Media", description: "Founder & CEO. Shows, podcasts, and branded content for youth and culture." }
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 glow-red"></div>
                  {index < 5 && <div className="w-0.5 h-full bg-gradient-to-b from-red-500 to-transparent"></div>}
                </div>
                <div className="glass-card p-6 rounded-2xl flex-1 mb-4">
                  <p className="text-red-400 font-bold mb-1">{item.year}</p>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-red-950/30 to-orange-950/30">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-light italic text-gray-300 mb-6">
            "Born broke taught me resilience. Built loud taught me voice. The combination changed my life."
          </blockquote>
          <p className="text-red-400 font-semibold">— Eugine Micah, "Born Broke, Built Loud"</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.youtube.com/@euginemicah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">YouTube</a>
            <a href="https://www.instagram.com/eugine.micah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@eugine.micah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">TikTok</a>
            <a href="https://www.linkedin.com/in/euginemicah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">LinkedIn</a>
            <a href="https://x.com/eugineroylandz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">X</a>
          </div>
          <p className="text-gray-500">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
