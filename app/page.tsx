"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-white">



      {/* ===== FULL SCREEN GIF ===== */}
      <div className="relative w-screen h-screen z-10">
        <img
          src="/FILM.gif"
          alt="Album Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ===== Fixed Top Bar ===== */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-center px-4 py-4 z-50 bg-transparent">
        {/* Menu */}
        <div className="absolute left-4 -translate-y-[2px] z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative w-8 h-6"
            aria-label="Menu"
          >
            <span
              className={`absolute left-0 top-1/2 h-[2px] bg-black transition-all duration-300
              ${menuOpen ? "w-6 rotate-45" : "w-6 -translate-y-2"}`}
            />
            <span
              className={`absolute left-0 top-1/2 h-[2px] bg-black transition-all duration-300
              ${menuOpen ? "w-6 -rotate-45" : "w-4 translate-y-2"}`}
            />
          </button>
        </div>




        {/* Center Logo */}
<img
  src="/HeirLogo.png"
  alt="HEIRLOOM"
  className="h-10 sm:h-12 object-contain z-50 mix-blend-difference"
/>

      </div>

      {/* ===== Full-Screen Gradient Panel ===== */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-40 flex flex-col justify-center items-start pl-8 bg-gradient-to-r from-white to-white/0 animate-slide-in-left">
          <Link
            href="/portfolio"
            onClick={() => setMenuOpen(false)}
            className="row-link"
          >
            Portfolio
          </Link>
        </div>
      )}

      {/* ===== CONTENT AFTER HERO ===== */}
      <div className="relative z-20 flex flex-col items-center px-4 sm:px-6 py-16 bg-white">

        {/* Minimal Link List */}
        <div className="w-full max-w-[520px] flex flex-col">
          {[
            ["SPOTIFY", "https://open.spotify.com/track/0yTj5gQUy6MXTmpOrsNWtn"],
            ["APPLE MUSIC", "https://music.apple.com/au/album/speaker-freak/1830684385?i=1830684386"],
            ["SOUNDCLOUD", "https://soundcloud.com/heirloom9236/speaker-freak"],
            ["YOUTUBE", "https://www.youtube.com/watch?v=ShTf3mWDkIo"],
            ["INSTAGRAM", "https://www.instagram.com/helrloom"],
            ["TIKTOK", "https://www.tiktok.com/@helrloom"],
          ].map(([label, link], i) => (
            <a key={label} href={link} target="_blank" className="row-link">
              <span>{label}</span>
              {i < 5 && <div className="divider" />}
            </a>
          ))}
        </div>

        {/* Bottom Logo */}
        <div className="flex justify-center mt-4">
          <img
            src="/SOMF.png"
            alt="Bottom Logo"
            className="w-24 sm:w-28 opacity-80"
          />
        </div>
      </div>

{/* ===== Scrolling Whisper Text ===== */}
{/* <div className="whisper-container">
  <div className="whisper-track">
    <div className="whisper-group">
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
    </div>

    <div className="whisper-group">
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
      <span>Wait4Me and I’ll Wait4U · Die4Me and I’ll Die4U</span>
    </div>
  </div>
</div> */}



      

      {/* ===== Styles ===== */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .row-link {
          padding: 22px 0;
          font-size: 14px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: black;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .row-link:hover {
          opacity: 0.5;
          transform: translateX(4px);
        }

        .divider {
          margin-top: 20px;
          height: 1px;
          width: 100%;
          background: rgba(0,0,0,0.15);
        }


/* ===== Whisper Marquee ===== */
.whisper-container {
  position: relative;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 16px;
  overflow: hidden;
  pointer-events: none;
}

.whisper-track {
  display: flex;
  width: max-content;
  animation: whisper-scroll 50s linear infinite;
}

.whisper-group {
  display: flex;
}

.whisper-track span {
  margin-right: 4rem;
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  white-space: nowrap;
}

/* Edge fade */
.whisper-container::before,
.whisper-container::after {
  content: "";
  position: absolute;
  top: 0;
  width: 120px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.whisper-container::before {
  left: 0;
  background: linear-gradient(to right, white, transparent);
}

.whisper-container::after {
  right: 0;
  background: linear-gradient(to left, white, transparent);
}

@keyframes whisper-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}




      `}</style>
    </div>
  );
}
