"use client";

import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const categories = ["all", "professional", "events", "behind-scenes", "personal"];
  
  const images = [
    { src: "/images/gallery/professional-1.jpg", category: "professional", alt: "Eugine Micah at PPP TV Studio" },
    { src: "/images/gallery/professional-2.jpg", category: "professional", alt: "Urban News Hosting" },
    { src: "/images/gallery/events-1.jpg", category: "events", alt: "Campus Xposure Event" },
    { src: "/images/gallery/events-2.jpg", category: "events", alt: "TIBS Got Talent" },
    { src: "/images/gallery/behind-1.jpg", category: "behind-scenes", alt: "Behind the Scenes" },
    { src: "/images/gallery/behind-2.jpg", category: "behind-scenes", alt: "Studio Setup" },
    { src: "/images/gallery/personal-1.jpg", category: "personal", alt: "Graduation Day" },
    { src: "/images/gallery/personal-2.jpg", category: "personal", alt: "Valedictorian Speech" },
  ];

  // Fallback YouTube thumbnails for demo
  const fallbackImages = [
    { src: "https://i.ytimg.com/vi/wROaKxIgMWs/maxresdefault.jpg", category: "professional", alt: "Valedictorian Speech at TIBS" },
    { src: "https://i.ytimg.com/vi/cX2qSGQ_vzc/maxresdefault.jpg", category: "professional", alt: "Urban News PPP TV" },
    { src: "https://i.ytimg.com/vi/sr3eSfpC6jY/maxresdefault.jpg", category: "events", alt: "The Nairobi Podcast" },
    { src: "https://i.ytimg.com/vi/waccHFWq9Z8/maxresdefault.jpg", category: "events", alt: "Campus Xposure" },
    { src: "https://i.ytimg.com/vi/nR1sEvm8j-0/maxresdefault.jpg", category: "behind-scenes", alt: "Hoods Finest Documentary" },
    { src: "https://i.ytimg.com/vi/MRY_U1kw5sg/maxresdefault.jpg", category: "behind-scenes", alt: "Pacesetters Talent Search" },
    { src: "https://i.ytimg.com/vi/KMqn52mkWR4/maxresdefault.jpg", category: "personal", alt: "Celebrity Interviews" },
    { src: "https://i.ytimg.com/vi/PyRZVv4J9C8/maxresdefault.jpg", category: "personal", alt: "Young and Famous Podcast" },
    { src: "https://i.ytimg.com/vi/z7spbLStImk/maxresdefault.jpg", category: "professional", alt: "PPP TV News" },
    { src: "https://i.ytimg.com/vi/ZyIhZ0yYjdA/maxresdefault.jpg", category: "professional", alt: "Citizen TV Reporting" },
    { src: "https://i.ytimg.com/vi/ATQYAiAuUhQ/maxresdefault.jpg", category: "events", alt: "Dare to Dream Interview" },
    { src: "https://i.ytimg.com/vi/gKY5LpzBWOU/maxresdefault.jpg", category: "behind-scenes", alt: "Roylandz Media Projects" },
  ];

  const displayImages = fallbackImages;
  const filteredImages = selectedCategory === "all" 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory);

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
            <Link href="/about" className="hover:text-red-400 transition-colors">About</Link>
            <Link href="/career" className="hover:text-red-400 transition-colors">Career</Link>
            <Link href="/shows" className="hover:text-red-400 transition-colors">Shows</Link>
            <Link href="/gallery" className="text-red-400">Gallery</Link>
            <Link href="/press" className="hover:text-red-400 transition-colors">Press Kit</Link>
            <Link href="/contact" className="hover:text-red-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 font-medium mb-4">PHOTO GALLERY</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Moments Captured</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            A visual journey through my career in media, from campus shows to national television.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                    : "glass-card text-gray-300 hover:text-white"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-video rounded-2xl overflow-hidden glass-card cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium">{image.alt}</p>
                    <p className="text-red-400 text-sm capitalize">{image.category.replace("-", " ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Highlights */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-red-950/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Video Highlights</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video rounded-2xl overflow-hidden glass-card">
              <iframe
                src="https://www.youtube.com/embed/wROaKxIgMWs?autoplay=0&mute=1"
                title="Valedictorian Speech"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden glass-card">
              <iframe
                src="https://www.youtube.com/embed/ZyIhZ0yYjdA?autoplay=0&mute=1"
                title="Citizen TV Reporting"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4"><span className="gradient-text">Need High-Res Photos?</span></h2>
          <p className="text-gray-400 mb-8">Download the press kit for high-resolution images and media assets.</p>
          <Link href="/press" className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full font-semibold inline-block">
            Download Press Kit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Eugine Micah. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
