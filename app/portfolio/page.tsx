"use client"; // client side component 

import { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false); // boolean state for menu open/close

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};



  return (
    <div className="w-screen min-h-screen relative overflow-hidden bg-black text-white"> 



{/* ===== Fixed Top Bar ===== */}
<div className="fixed top-0 left-0 w-full flex items-center justify-center px-4 py-4 z-50 bg-transparent">
{/* Menu Icon */}
<div className="absolute left-4 z-50">
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

{/* Letter Icon (RIGHT) */}
<div className="absolute right-4 z-50">
  <button
    onClick={scrollToBottom}
    aria-label="Contact"
    className="relative w-8 h-6 flex items-center justify-center transition-opacity duration-300 hover:opacity-70"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  </button>
</div>



  {/* Center Logo */}
  <img
    src="/HeirLogo_white.png"
    alt="HEIRLOOM"
    className="h-10 sm:h-12 object-contain z-50"
  />
</div>

{/* ===== Top Gradient Overlay ===== */}
<div
  className="fixed top-0 left-0 w-full h-40 z-40 pointer-events-none"
  style={{
    background: "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0))",
  }}
/>








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
      "/portfolio_items/RICK.png",
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

{/* ===== Bottom Portfolio Stuff + Divider ===== */}
<div className="w-full flex flex-col items-center mt-1">
  {/* bottom divider centered */}
  <div className="flex justify-center w-full mb-1">
    <div className="w-full max-w-[600px] h-px bg-white/20" />
  </div>

  {/* Portfolio stuff image */}
  <div className="flex justify-center w-full max-w-[600px]">
    <img
      src="/portfolio_items/Portfolio_stuff.png"
      alt="Feature strip"
      className="w-full h-auto block"
    />
  </div>
</div>

{/* ===== Another centered divider if needed ===== */}
<div className="flex justify-center w-full mb-1">
  <div className="w-full max-w-[600px] h-px bg-white/20" />
</div>

{/* ===== Bottom Instagram + Email Buttons ===== */}
<div className="w-full flex flex-col items-center mt-4 mb-4 space-y-2">
  {[
    ["INSTAGRAM", "https://www.instagram.com/helrloom/"],
    ["EMAIL", "mailto:heirloom3345@gmail.com"],
  ].map(([label, link]) => (
    <a
      key={label}
      href={link}
      target="_blank"
      className="row-link text-center"
    >
      {label}
    </a>
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
