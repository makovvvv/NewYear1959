"use client";

import { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-black text-white">

      {/* ===== Dense Camera Gold Dust Background (SAME AS HOME) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="gold-glow-top" />

        {/* Background / mid dust */}
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={`dust-${i}`} className={`dust dust-${i % 6}`} />
        ))}

        {/* Foreground bokeh */}
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={`bokeh-${i}`} className="dust dust-xl" />
        ))}

        {/* Extreme foreground bloom */}
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={`bloom-${i}`} className="dust dust-xxl" />
        ))}
      </div>

      {/* ===== Menu + Dropdown ===== */}
      <div className="fixed top-4 left-4 z-50">
        <div className="relative">
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
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ===== Scrollable Content ===== */}
      <div className="relative z-10 flex flex-col items-start min-h-screen px-4 sm:px-6 py-4 sm:py-6">

        {/* Title graphic */}
        <div className="w-full flex justify-center mt-12 mb-6">
          <img
            src="/portfolioTitle.png"
            alt="Portfolio"
            className="w-full max-w-[600px] min-w-[300px]"
          />
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 w-full max-w-[1200px] mx-auto">
          {[
            "/portfolio_items/somfradio.png",
            "/portfolio_items/burb.jpg",
            "/portfolio_items/wait4u_poster_v2.png",
            "/portfolio_items/cloak.png",
            "/portfolio_items/tvgirl.png",
            "/portfolio_items/workout.jpg",
            "/portfolio_items/change.jpg",
            "/cover.png",
            "/portfolio_items/10bucks.jpg",
            "/portfolio_items/Wait4U_sh.jpg",
            "/portfolio_items/HareGod.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid rounded-lg overflow-hidden"
            >
              <img src={src} className="w-full h-auto object-cover rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Styles ===== */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(-40%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .slide-in-right {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* ---------- GOLD ATMOSPHERE ---------- */

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
          0%   { transform: translateY(0) scale(0.6); opacity: 0; }
          20%  { opacity: 0.7; }
          50%  { opacity: 1; }
          85%  { opacity: 0.4; }
          100% {
            transform: translateY(-180vh) scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
