"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-black flex flex-col">

      {/* ===== Dense Camera Gold Dust Background ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="gold-glow-top" />

        {Array.from({ length: 25 }).map((_, i) => (
          <span key={`init-${i}`} className={`dust dust-init dust-${i % 4}`} />
        ))}

        {Array.from({ length: 35 }).map((_, i) => (
          <span key={`dust-${i}`} className={`dust dust-rise dust-${i % 6}`} />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={`bokeh-${i}`} className="dust dust-rise dust-xl" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={`bloom-${i}`} className="dust dust-rise dust-xxl" />
        ))}
      </div>

      {/* ===== Foreground Content ===== */}
      <div className="relative z-10 flex flex-col justify-between text-white bg-black/30 min-h-screen px-4 sm:px-6 py-4 sm:py-6">

        {/* ===== Main Content ===== */}
        <div className="flex flex-col items-center w-full">

          {/* Menu + Dropdown (Top Left) */}
          <div className="relative mb-4 self-start">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-8 h-6 z-50"
              aria-label="Menu"
            >
              <span
                className={`absolute left-0 top-1/2 h-[2px] bg-white transition-all duration-300
                  ${menuOpen ? "w-6 rotate-45" : "w-6 -translate-y-2"}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] bg-white transition-all duration-300
                  ${menuOpen ? "w-6 -rotate-45" : "w-4 translate-y-2"}`}
              />
            </button>

            {menuOpen && (
              <div className="absolute top-0 left-full ml-2 flex flex-col gap-3 text-lg tracking-widest uppercase text-white z-50 slide-in-right">
                <Link href="/portfolio" onClick={() => setMenuOpen(false)}>
                  Portfolio
                </Link>
              </div>
            )}
          </div>

          {/* Main Logo */}
          <div className="w-full flex justify-center">
            <img
              src="/logogo.png"
              alt="HEIRLOOM"
              className="w-full max-w-[600px] min-w-[300px]"
            />
          </div>

          {/* Album Cover */}
          <div className="w-full flex justify-center">
            <img
              src="/WAIT4U.gif"
              alt="Album Cover"
              className="w-full max-w-[600px] rounded-2xl mt-6 shadow-xl"
            />
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col items-center mt-6 gap-3">

            {/* Instagram + TikTok side-by-side */}
            <div className="flex w-full max-w-[600px] gap-3">
              <a href="https://www.instagram.com/helrloom" target="_blank" className="flex-1">
                <div className="btn-outline flex justify-center items-center">
                  <img src="/ig.png" alt="Instagram" className="h-12 w-auto" />
                </div>
              </a>
              <a href="https://www.tiktok.com/@helrloom" target="_blank" className="flex-1">
                <div className="btn-outline flex justify-center items-center">
                  <img src="/tik.png" alt="TikTok" className="h-12 w-auto" />
                </div>
              </a>
            </div>

            {/* Other Buttons */}
            {[
              ["Spotify", "https://open.spotify.com/track/0yTj5gQUy6MXTmpOrsNWtn"],
              ["Apple", "https://music.apple.com/au/album/speaker-freak/1830684385?i=1830684386"],
              ["SoundCloud", "https://soundcloud.com/heirloom9236/speaker-freak"],
              ["YouTube", "https://music.youtube.com/watch?v=ShTf3mWDkIo"],
            ].map(([label, link]) => (
              <a
                key={label}
                href={link}
                target="_blank"
                className="w-full px-2 mt-3 sm:max-w-[600px]"
              >
                <div className="btn-outline">
                  <span>{label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Logo */}
        <div className="w-full flex justify-center mt-4">
          <img src="/SOMF_radio_logo.png" alt="Bottom Logo" className="w-32 sm:w-40" />
        </div>
      </div>

      {/* ===== Styles ===== */}
      <style>{`
        .slide-in-right {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInRight {
          from { transform: translateX(-40%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .btn-outline {
          height: clamp(60px, 12vw, 80px);
          border-radius: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4px solid white;
          padding: 0 12px;
          background: white;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }
        .btn-outline span {
          font-family: ".SF Numeric UltraCompressedUltralightG4", sans-serif;
          font-weight: 900;
          font-size: clamp(20px, 5vw, 48px);
          letter-spacing: clamp(2px, 1vw, 6px);
          text-transform: uppercase;
          color: black;
          mix-blend-mode: normal;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: transparent;
        }
        .btn-outline:hover span {
          color: white;
        }

        .gold-glow-top {
          position: absolute;
          top: -40%;
          left: -25%;
          width: 150%;
          height: 70%;
          background: radial-gradient(
            ellipse at top,
            rgba(255,215,120,0.25),
            rgba(255,215,120,0.08),
            transparent 70%
          );
          filter: blur(100px);
        }

        .dust {
          position: absolute;
          border-radius: 50%;
          opacity: 0;
          animation: floatDust linear infinite;
          background: radial-gradient(
            circle,
            rgba(255,220,150,0.9),
            rgba(255,220,150,0.35),
            transparent 70%
          );
          left: calc(100% * var(--x));
          top: calc(130% * var(--y));
        }

        .dust-0 { width: 6px; height: 6px; filter: blur(1px); animation-duration: 20s; }
        .dust-1 { width: 10px; height: 10px; filter: blur(2px); animation-duration: 28s; }
        .dust-2 { width: 16px; height: 16px; filter: blur(4px); animation-duration: 36s; }
        .dust-3 { width: 22px; height: 22px; filter: blur(6px); animation-duration: 44s; }
        .dust-4 { width: 30px; height: 30px; filter: blur(9px); animation-duration: 55s; }
        .dust-5 { width: 40px; height: 40px; filter: blur(12px); animation-duration: 65s; }
        .dust-xl {
          width: 90px;
          height: 90px;
          filter: blur(25px);
          animation-duration: 80s;
          background: radial-gradient(
            circle,
            rgba(255,230,180,0.6),
            rgba(255,230,180,0.25),
            transparent 75%
          );
        }
        .dust-xxl {
          width: 150px;
          height: 150px;
          filter: blur(40px);
          animation-duration: 110s;
          background: radial-gradient(
            circle,
            rgba(255,240,200,0.55),
            rgba(255,240,200,0.2),
            transparent 80%
          );
        }
        .dust:nth-child(3n)  { --x: 0.1; --y: 1.1; animation-delay: 0s; }
        .dust:nth-child(4n)  { --x: 0.3; --y: 1.25; animation-delay: 12s; }
        .dust:nth-child(5n)  { --x: 0.55; --y: 1.15; animation-delay: 22s; }
        .dust:nth-child(6n)  { --x: 0.8; --y: 1.3; animation-delay: 34s; }
        .dust:nth-child(7n)  { --x: 0.65; --y: 1.05; animation-delay: 48s; }

        @keyframes floatDust {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          20% { opacity: 0.7; }
          50% { opacity: 1; }
          85% { opacity: 0.4; }
          100% { transform: translateY(-180vh) scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
