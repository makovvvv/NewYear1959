"use client"; // client side component 

import { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false); // boolean state for menu open/close

  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-black text-white">

      {/* ===== Gold Dust Background ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="gold-glow-top" />
        {Array.from({ length: 50 }).map((_, i) => (
          <span key={`dust-${i}`} className={`dust dust-${i % 6}`} />
        ))}
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={`bokeh-${i}`} className="dust dust-xl" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={`bloom-${i}`} className="dust dust-xxl" />
        ))}
      </div>

      {/* ===== Fixed Menu Button ===== */}
      <div className="fixed top-4 left-4 z-[60]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-8 h-6"
          aria-label="Menu"
        >
          <span
            className={`absolute left-0 top-1/2 h-[2px] transition-all duration-300
            ${menuOpen ? "w-6 rotate-45 bg-black" : "w-6 -translate-y-2 bg-white"}`}
          />
          <span
            className={`absolute left-0 top-1/2 h-[2px] transition-all duration-300
            ${menuOpen ? "w-6 -rotate-45 bg-black" : "w-4 translate-y-2 bg-white"}`}
          />
        </button>
      </div>

{/* ===== Center Logo (Fixed, Top Middle) ===== */}
<div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center h-6">
  <img
    src="/HeirLogo_white.png"
    alt="HEIRLOOM"
    className="h-10 sm:h-12 object-contain"
  />
</div>


      {/* ===== Full-Screen Gradient Menu Panel ===== */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-gradient-to-r from-white to-white/0 animate-slide-in-left flex items-center pl-8">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="panel-link"
          >
            Home
          </Link>
        </div>
      )}

      {/* ===== Scrollable Content ===== */}
      <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 py-4 sm:py-6">

{/* ===== Feature Image + Title Stack ===== */}
<div className="w-full flex flex-col items-center mt-12 mb-6">

                    {/* top divider */}
          <div className="w-full max-w-[600px] h-px bg-white/20 mb-3" />

  {/* Portfolio stuff image */}
  <div className="w-full max-w-[600px] mb-2">
    <img
      src="/portfolio_items/Portfolio_stuff.png"
      alt="Feature strip"
      className="w-full h-auto block"
    />
  </div>

  {/* Portfolio title */}
  <div className="w-full flex justify-center">
    <img
      src="/portfolioTitle.png"
      alt="Portfolio"
      className="w-full max-w-[600px] min-w-[300px]"
    />
  </div>

</div>





        {/* ===== Masonry Grid ===== */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 w-full max-w-[1200px] mx-auto">
          {[
            "/portfolio_items/HareGod.jpeg",
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
            "/portfolio_items/Burby.png",
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
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .panel-link {
          padding: 22px 0;
          font-size: 14px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: black;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .panel-link:hover {
          opacity: 0.5;
          transform: translateX(4px);
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
        }

        @keyframes floatDust {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-180vh) scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
