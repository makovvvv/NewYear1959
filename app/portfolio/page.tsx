"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type PortfolioImage = {
  src: string;
  alt: string;
};

type PortfolioItem = {
  title: string;
  description?: string;
  src?: string;
  images?: PortfolioImage[];
  video?: string;
  layout?: "styling" | "graphic-design" | "placeholder" | "video";
  spotifyEmbed?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Styling",
    layout: "styling",
    description:
      "Conceptual styling for various projects and promotional material including album covers, posters, and social media content.",
    images: [
      {
        src: "/portfolio_items/Burby.png",
        alt: "Burby styling",
      },
      {
        src: "/portfolio_items/HareGod.jpeg",
        alt: "Hare God styling",
      },
      {
        src: "/portfolio_items/RICK.png",
        alt: "Rick styling",
      },
    ],
  },

  {
    title: "Graphic Design",
    layout: "graphic-design",
    description:
      "Graphic design for music releases, promotional campaigns, digital media, and visual identities.",
    images: [
      {
        src: "/portfolio_items/10bucks.jpg",
        alt: "10 Bucks graphic design",
      },
      {
        src: "/portfolio_items/somfradio.png",
        alt: "SOMF Radio graphic design",
      },
      {
        src: "/portfolio_items/WAIT4U_COVER_new.png",
        alt: "Wait 4 U cover graphic design",
      },
    ],
  },

  {
    title: "Working with Edward Skeltrix & Music production",
    layout: "placeholder",
    description:
      "Music production with artists such as Edward Skeletrix on the project 'Body of Work'. ",
      spotifyEmbed:
    "https://open.spotify.com/embed/track/575dwAqwswg22jaauxebab?utm_source=generator&si=1cf68fba65754184",
    images: [
      {
        src: "/portfolio_items/AISTLOOM_cover.png",
        alt: "Placeholder project one",
      },
      {
        src: "/portfolio_items/BodyOfWork_cover.png",
        alt: "Placeholder project two",
      },
    ],
  },

  {
    title: "Wait4U",
    layout: "video",
    description:
      "Music video production, direction and editing for the single 'Wait4U'.",
    video: "/portfolio_items/Wait4U_video.mp4",
  },
];

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const portfolioScrollRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const scrollToBottom = (): void => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const clamp = (
      value: number,
      minimum: number,
      maximum: number
    ): number => {
      return Math.min(Math.max(value, minimum), maximum);
    };

    const smoothStep = (value: number): number => {
      const clampedValue = clamp(value, 0, 1);

      return (
        clampedValue *
        clampedValue *
        (3 - 2 * clampedValue)
      );
    };

    const updatePortfolio = (): void => {
      const container = portfolioScrollRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const portfolioHasStarted = rect.top <= 0;

      /*
       * Scroll space used for the first image to enter.
       */
      const entranceDistance =
        viewportHeight * 0.14;

      /*
       * Scroll space used for each normal portfolio transition.
       */
      const scrollDistancePerItem =
        viewportHeight * 1.35;

      const sectionScroll = Math.max(
        -rect.top,
        0
      );

      const entranceProgress = clamp(
        sectionScroll / entranceDistance,
        0,
        1
      );

      const easedEntranceProgress =
        smoothStep(entranceProgress);

      /*
       * Normal portfolio progress begins only after
       * the first image finishes entering.
       */
      const animationScroll = Math.max(
        sectionScroll - entranceDistance,
        0
      );

      const rawProgress =
        animationScroll /
        scrollDistancePerItem;

      const portfolioProgress = clamp(
        rawProgress,
        0,
        portfolioItems.length - 1
      );

      const isMobile =
        viewportWidth < 640;

      const isTablet =
        viewportWidth >= 640 &&
        viewportWidth < 1024;

      itemRefs.current.forEach(
        (item, index) => {
          if (!item) return;

          /*
           * Keep every item hidden while the intro
           * title screen is still visible.
           */
          if (!portfolioHasStarted) {
            item.style.opacity = "0";
            item.style.visibility =
              "hidden";
            item.style.pointerEvents =
              "none";
            return;
          }

          /*
           * During the first entrance, only show
           * the first portfolio item.
           */
          if (
            entranceProgress < 1 &&
            index !== 0
          ) {
            item.style.opacity = "0";
            item.style.visibility =
              "hidden";
            item.style.pointerEvents =
              "none";
            return;
          }

          const distance =
            index - portfolioProgress;

          const absoluteDistance =
            Math.abs(distance);

          const side =
            index % 2 === 0 ? -1 : 1;

          /*
           * Cards stay mostly flat while they are
           * close to their active position.
           */
          const restingZone = 0.32;

          const transitionDistance =
            clamp(
              (absoluteDistance -
                restingZone) /
                (1 - restingZone),
              0,
              1
            );

          const easedTransition =
            smoothStep(
              transitionDistance
            );

          let activeHorizontalPosition: number;

          if (isMobile) {
            activeHorizontalPosition = 0;
          } else if (isTablet) {
            activeHorizontalPosition =
              side *
              viewportWidth *
              0.14;
          } else {
            activeHorizontalPosition =
              side *
              viewportWidth *
              0.19;
          }

          const movementDirection =
            distance === 0
              ? 0
              : Math.sign(distance);

          const verticalPosition =
            movementDirection *
            easedTransition *
            viewportHeight *
            0.58;

          const restingMovement =
            distance *
            viewportHeight *
            0.08;

          const finalVerticalPosition =
            absoluteDistance <=
            restingZone
              ? restingMovement
              : verticalPosition;

          const horizontalPosition =
            activeHorizontalPosition *
            (1 -
              easedTransition *
                0.22);

          const scale =
            1 -
            easedTransition *
              0.38;

          const opacity =
            1 -
            easedTransition *
              1.05;

          const activeRotation =
            side * 2;

          const exitingRotation =
            side * 32;

          const rotateY =
            activeRotation +
            easedTransition *
              (exitingRotation -
                activeRotation);

          const rotateX =
            -movementDirection *
            easedTransition *
            10;

          const translateZ =
            -easedTransition *
            280;

          /*
           * Smooth entrance for the first item.
           */
          const isFirstItemEntering =
            index === 0 &&
            entranceProgress < 1;

          const entranceOpacity =
            isFirstItemEntering
              ? easedEntranceProgress
              : 1;

          const entranceOffset =
            isFirstItemEntering
              ? (1 -
                  easedEntranceProgress) *
                viewportHeight *
                0.16
              : 0;

          const entranceScale =
            isFirstItemEntering
              ? 0.9 +
                easedEntranceProgress *
                  0.1
              : 1;

          const entranceRotation =
            isFirstItemEntering
              ? (1 -
                  easedEntranceProgress) *
                6
              : 0;

          item.style.opacity =
            String(
              clamp(
                opacity *
                  entranceOpacity,
                0,
                1
              )
            );

          item.style.visibility =
            absoluteDistance > 1.18
              ? "hidden"
              : "visible";

          item.style.pointerEvents =
            absoluteDistance < 0.4 &&
            entranceProgress >= 1
              ? "auto"
              : "none";

          item.style.zIndex =
            String(
              100 -
                Math.round(
                  absoluteDistance *
                    10
                )
            );

          item.style.transform = `
            translate(-50%, -50%)
            translate3d(
              ${horizontalPosition}px,
              ${
                finalVerticalPosition +
                entranceOffset
              }px,
              ${translateZ}px
            )
            rotateX(${
              rotateX +
              entranceRotation
            }deg)
            rotateY(${rotateY}deg)
            scale(${
              scale *
              entranceScale
            })
          `;
        }
      );
    };

    const requestUpdate = (): void => {
      if (
        animationFrameRef.current !==
        null
      ) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(
          () => {
            updatePortfolio();
            animationFrameRef.current =
              null;
          }
        );
    };

    updatePortfolio();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-white text-black">
      {/* ===== Fixed Top Bar ===== */}
      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-center px-4 py-4">
        {/* Menu Icon */}
        <div className="absolute left-4 z-50">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(
                (currentValue) =>
                  !currentValue
              );
            }}
            className="relative h-6 w-8"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`
                absolute left-0 top-1/2 h-[2px]
                transition-all duration-300
                ${
                  menuOpen
                    ? "w-6 rotate-45 bg-black"
                    : "w-6 -translate-y-2 bg-black"
                }
              `}
            />

            <span
              className={`
                absolute left-0 top-1/2 h-[2px]
                transition-all duration-300
                ${
                  menuOpen
                    ? "w-6 -rotate-45 bg-black"
                    : "w-4 translate-y-2 bg-black"
                }
              `}
            />
          </button>
        </div>

        {/* Contact Icon */}
        <div className="absolute right-4 z-50">
          <button
            type="button"
            onClick={scrollToBottom}
            aria-label="Scroll to contact details"
            className="flex h-6 w-8 items-center justify-center transition-opacity duration-300 hover:opacity-70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                menuOpen
                  ? "black"
                  : "black"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 transition-colors duration-300"
            >
              <rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                ry="2"
              />

              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>
        </div>

        {/* Center Logo */}
        <img
          src="/HeirLogo_white.png"
          alt="HEIRLOOM"
          className={`
            z-50 h-10 object-contain invert
            transition-opacity duration-300
            sm:h-12
            ${
              menuOpen
                ? "opacity-0"
                : "opacity-100"
            }
          `}
        />
      </header>

      {/* ===== Top Gradient ===== */}
      <div
        className={`
          pointer-events-none fixed
          left-0 top-0 z-40
          h-40 w-full
          transition-opacity duration-300
          ${
            menuOpen
              ? "opacity-0"
              : "opacity-100"
          }
        `}
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.96), rgba(255,255,255,0))",
        }}
      />

      {/* ===== Menu Panel ===== */}
      <div
        className={`
          fixed inset-0 z-40
          flex items-center pl-8
          bg-gradient-to-r
          from-black via-black/95 to-black/0
          transition-all duration-500
          ${
            menuOpen
              ? "visible translate-x-0 opacity-100"
              : "invisible -translate-x-full opacity-0"
          }
        `}
      >
        <Link
          href="/"
          onClick={() =>
            setMenuOpen(false)
          }
          className="panel-link menu-panel-link"
        >
          Home
        </Link>
      </div>

      <main>
        {/* ===== Full-Screen Portfolio Intro ===== */}
        <section className="relative z-10 flex h-screen w-full items-center justify-center px-4 sm:px-6">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mb-3 h-px w-full max-w-[600px] bg-black/15" />

            <img
              src="/portfolioTitle.png"
              alt="Portfolio"
              className="w-full min-w-[280px] max-w-[600px] invert"
            />

            <div className="mt-8 flex flex-col items-center">
              <p className="text-[9px] uppercase tracking-[0.45em] text-black/40">
                Scroll to explore
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="scroll-arrow mt-4 h-5 w-5 text-black/40"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m6 13 6 6 6-6" />
              </svg>
            </div>
          </div>
        </section>

        {/* ===== Portfolio Scroll Area ===== */}
        <section
          ref={portfolioScrollRef}
          className="relative -mt-[52vh]"
          style={{
            /*
             * Extra height includes the first-item
             * entrance plus the normal item transitions.
             */
            height: `calc(${
              portfolioItems.length *
              135
            }vh + 24vh)`,
          }}
        >
          {/* ===== Sticky Portfolio Stage ===== */}
          <div
            className="sticky top-0 h-screen w-full overflow-hidden"
            style={{
              perspective: "1300px",
              perspectiveOrigin:
                "50% 50%",
            }}
          >
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="cylinder-glow" />

              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-black/[0.08] to-transparent" />
            </div>

            {/* Portfolio Images */}
            <div
              className="relative h-full w-full"
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >
              {portfolioItems.map(
                (
                  portfolioItem,
                  index
                ) => {
                  const isLeft =
                    index % 2 === 0;

                  return (
                    <article
                      key={`${portfolioItem.title}-${index}`}
                      ref={(
                        element:
                          | HTMLElement
                          | null
                      ) => {
                        itemRefs.current[
                          index
                        ] = element;
                      }}
                      className={`portfolio-card absolute left-1/2 top-1/2 ${
                        portfolioItem.images || portfolioItem.video
                          ? `grouped-card ${portfolioItem.layout}-card`
                          : ""
                      }`}
                      style={{
                        transformStyle:
                          "preserve-3d",
                        willChange:
                          "transform, opacity",
                        opacity: 0,
                        visibility:
                          "hidden",
                      }}
                    >
                      <div
                        className={`
                          flex h-full flex-col
                          ${
                            isLeft
                              ? "items-start"
                              : "items-end"
                          }
                        `}
                      >
                        <div className="portfolio-image-frame">
                          {portfolioItem.video ? (
                            <video
                              src={portfolioItem.video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              aria-label={portfolioItem.title}
                              className="portfolio-video"
                            />
                          ) : portfolioItem.images ? (
                            <div
                              className={`project-spread ${portfolioItem.layout}-spread`}
                              aria-label={`${portfolioItem.title} projects`}
                            >
                              {portfolioItem.images.map(
                                (image, imageIndex) => (
                                  <img
                                    key={image.src}
                                    src={image.src}
                                    alt={image.alt}
                                    loading={
                                      index <= 1
                                        ? "eager"
                                        : "lazy"
                                    }
                                    decoding="async"
                                    className={`project-image ${portfolioItem.layout}-image ${portfolioItem.layout}-image-${imageIndex + 1}`}
                                  />
                                )
                              )}
                            </div>
                          ) : (
                            <img
                              src={portfolioItem.src}
                              alt={portfolioItem.title}
                              loading={
                                index < 3
                                  ? "eager"
                                  : "lazy"
                              }
                              decoding="async"
                              className="h-full w-full object-contain"
                            />
                          )}
                        </div>

                        <div
                          className={`
                            mt-3 flex
                            items-center gap-3
                            ${
                              isLeft
                                ? "flex-row"
                                : "flex-row-reverse"
                            }
                          `}
                        >
                          <span className="text-[9px] tracking-[0.35em] text-black/35">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div className="h-px w-10 bg-white/25" />

                          <div
                            className={`portfolio-copy ${
                              isLeft
                                ? "text-left"
                                : "text-right"
                            }`}
                          >
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-black/65">
                              {
                                portfolioItem.title
                              }
                            </h2>

                            {portfolioItem.description && (
                              <p className="portfolio-description">
                                {
                                  portfolioItem.description
                                }
                              </p>
                            )}

                            {portfolioItem.spotifyEmbed && (
                              <div className="spotify-embed">
                                <iframe
                                  src={portfolioItem.spotifyEmbed}
                                  width="100%"
                                  height="80"
                                  frameBorder="0"
                                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                  allowFullScreen
                                  loading="lazy"
                                  title={`${portfolioItem.title} on Spotify`}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.5em] text-black/20">
              Heirloom Portfolio
            </div>
          </div>
        </section>

        {/* ===== Bottom Portfolio Content ===== */}
        <section className="relative z-10 flex w-full flex-col items-center bg-white px-4 pb-10 pt-14 sm:px-6">
          <div className="mb-5 h-px w-full max-w-[600px] bg-black/25" />

          <div className="flex w-full flex-col items-center space-y-2">
            <a
              href="https://www.instagram.com/helrloom/"
              target="_blank"
              rel="noreferrer"
              className="row-link text-center"
            >
              Instagram
            </a>

            <a
              href="mailto:heirloom3345@gmail.com"
              className="row-link text-center"
            >
              Email
            </a>
          </div>
        </section>
      </main>

      <style jsx>{`
        .grouped-card {
          width: min(72vw, 1040px);
          height: min(76vh, 820px);
        }

        .grouped-card .portfolio-image-frame {
          height: calc(100% - 76px);
        }

        .project-spread {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }

        .project-image {
          position: absolute;
          left: 50%;
          top: 50%;
          object-fit: contain;
          filter: drop-shadow(0 24px 34px rgba(0, 0, 0, 0.55));
          transform-origin: 50% 50%;
        }

        .styling-image {
          width: 42%;
          height: 72%;
        }

        /* Rick — upper left */
        .styling-image-1 {
          z-index: 1;
          transform: translate(-112%, -82%) rotate(-6deg);
        }

        /* Hare God — centred */
        .styling-image-2 {
          z-index: 3;
          transform: translate(-50%, -50%) scale(1.08);
        }

        /* Burby — lower right */
        .styling-image-3 {
          z-index: 2;
          transform: translate(12%, -18%) rotate(6deg);
        }



        /* Graphic design — wide editorial collage */
        .graphic-design-card {
          width: min(76vw, 1100px);
          height: min(76vh, 820px);
        }

        .graphic-design-image {
          width: 39%;
          height: 70%;
        }

        .graphic-design-image-1 {
          z-index: 1;
          transform: translate(-112%, -18%) rotate(-5deg);
        }

        .graphic-design-image-2 {
          z-index: 3;
          transform: translate(-50%, -50%) scale(1.08);
        }

        .graphic-design-image-3 {
          z-index: 2;
          transform: translate(12%, -82%) rotate(5deg);
        }

        /* Two-image placeholder section */
        .placeholder-card {
          width: min(72vw, 1040px);
          height: min(76vh, 820px);
        }

        .placeholder-image {
          width: 52%;
          height: 78%;
        }

        .placeholder-image-1 {
          z-index: 2;
          transform: translate(-92%, -58%) rotate(-5deg);
        }

        .placeholder-image-2 {
          z-index: 1;
          transform: translate(-8%, -42%) rotate(5deg);
        }

        /* Single MP4 video section */
        .video-card {
          width: min(64vw, 900px);
          height: min(76vh, 820px);
        }

        .portfolio-video {
          display: block;
          width: 90%;
          height: 88%;
          object-fit: contain;
          border-radius: 4px;
          background: transparent;
          filter: drop-shadow(
            0 24px 34px rgba(0, 0, 0, 0.35)
          );
        }

        .portfolio-copy {
          max-width: min(34vw, 360px);
        }

        .portfolio-description {
          margin-top: 8px;
          max-width: 38ch;
          font-size: 13px;
          line-height: 1.65;
          letter-spacing: 0.08em;
          color: black;
          text-transform: none;
        }

        .spotify-embed {
          width: 100%;
          max-width: 340px;
          min-width: 0;
          margin-top: 12px;
          position: relative;
          z-index: 10;
          overflow: hidden;
          border-radius: 12px;
          pointer-events: auto;
        }

        .spotify-embed iframe {
          display: block;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          border: 0;
          border-radius: 12px;
          background: transparent;
        }

        .portfolio-card {
          width: min(
            42vw,
            620px
          );
          height: min(
            64vh,
            720px
          );
        }

        .portfolio-image-frame {
          position: relative;
          width: 100%;
          height: calc(100% - 36px);
          overflow: visible;
          border-radius: 4px;
          background: transparent;
          box-shadow: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cylinder-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72vw;
          height: 95vh;
          transform: translate(
            -50%,
            -50%
          );
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(
                255,
                255,
                255,
                0.045
              )
              0%,
            rgba(
                255,
                255,
                255,
                0.015
              )
              35%,
            transparent 72%
          );
          filter: blur(30px);
        }

        .scroll-arrow {
          animation:
            scrollArrowPulse
            2s ease-in-out
            infinite;
          will-change:
            transform,
            opacity;
        }

        @keyframes scrollArrowPulse {
          0%,
          100% {
            transform: translateY(
              0
            );
            opacity: 0.3;
          }

          50% {
            transform: translateY(
              7px
            );
            opacity: 0.75;
          }
        }

        .panel-link {
          padding: 22px 0;
          color: black;
          font-size: 14px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .panel-link:hover {
          opacity: 0.5;
          transform: translateX(
            4px
          );
        }

        .menu-panel-link {
          color: white;
        }

        .row-link {
          padding: 8px 16px;
          color: rgba(0, 0, 0, 0.78);
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition:
            opacity 0.3s ease,
            letter-spacing
              0.3s ease;
        }

        .row-link:hover {
          opacity: 0.55;
          letter-spacing: 0.42em;
        }

        @media (
          max-width: 1023px
        ) {
          .portfolio-card {
            width: min(
              56vw,
              560px
            );
            height: min(
              62vh,
              650px
            );
          }
        }

        @media (
          min-width: 640px
        ) and (
          max-width: 1023px
        ) {
          .grouped-card {
            width: min(88vw, 820px);
            height: min(72vh, 720px);
          }

          .grouped-card .portfolio-image-frame {
            height: calc(100% - 82px);
          }

          .styling-image {
            width: 44%;
            height: 70%;
          }

          .graphic-design-image {
            width: 42%;
            height: 68%;
          }

          .styling-image-1 {
            transform: translate(-108%, -84%) rotate(-6deg);
          }

          .styling-image-2 {
            transform: translate(-50%, -50%) scale(1.07);
          }

          .styling-image-3 {
            transform: translate(8%, -16%) rotate(6deg);
          }

          .graphic-design-card {
            width: min(92vw, 860px);
            height: min(72vh, 720px);
          }

          .graphic-design-image-1 {
            transform: translate(-108%, -18%) rotate(-4deg);
          }

          .graphic-design-image-2 {
            transform: translate(-50%, -50%) scale(1.07);
          }

          .graphic-design-image-3 {
            transform: translate(8%, -84%) rotate(4deg);
          }

          .placeholder-card {
            width: min(92vw, 860px);
            height: min(72vh, 720px);
          }

          .placeholder-image {
            width: 55%;
            height: 74%;
          }

          .placeholder-image-1 {
            transform: translate(-88%, -58%) rotate(-4deg);
          }

          .placeholder-image-2 {
            transform: translate(-12%, -42%) rotate(4deg);
          }

          .video-card {
            width: min(88vw, 800px);
            height: min(72vh, 720px);
          }

          .portfolio-video {
            width: 92%;
            height: 86%;
          }

          .grouped-card .portfolio-copy {
            max-width: min(72vw, 560px);
          }
        }

        @media (
          max-width: 639px
        ) {
          .grouped-card {
            width: 94vw;
            max-width: 94vw;
            height: 78vh;
          }

          .grouped-card > div {
            align-items: center !important;
            width: 100%;
            min-width: 0;
          }

          .grouped-card > div > div:last-child {
            width: 100%;
            max-width: 100%;
            min-height: 128px;
            justify-content: center;
            align-items: center;
            flex-direction: row !important;
            padding: 8px 12px 12px;
            box-sizing: border-box;
            margin-top: 0;
          }

          .grouped-card .portfolio-image-frame {
            height: calc(100% - 150px);
            margin-bottom: 22px;
          }

          .styling-image {
            width: 52%;
            height: 68%;
          }

          .graphic-design-image {
            width: 54%;
            height: 62%;
          }

          .styling-image-1 {
            transform: translate(-101%, -82%) rotate(-5deg);
          }

          .styling-image-2 {
            transform: translate(-50%, -50%) scale(1.06);
          }

          .styling-image-3 {
            transform: translate(1%, -18%) rotate(5deg);
          }

          .graphic-design-card {
            width: 94vw;
            height: 78vh;
          }

          .graphic-design-image-1 {
            z-index: 1;
            transform: translate(-91%, -18%) rotate(-4deg);
          }

          .graphic-design-image-2 {
            z-index: 3;
            transform: translate(-50%, -50%) scale(1.05);
          }

          .graphic-design-image-3 {
            z-index: 2;
            transform: translate(-8%, -82%) rotate(4deg);
          }

          .placeholder-card {
            width: 94vw;
            height: 78vh;
          }

          .placeholder-image {
            width: 66%;
            height: 66%;
          }

          .placeholder-image-1 {
            z-index: 2;
            transform: translate(-78%, -72%) rotate(-4deg);
          }

          .placeholder-image-2 {
            z-index: 1;
            transform: translate(-22%, -22%) rotate(4deg);
          }

          .video-card {
            width: 94vw;
            height: 76vh;
          }

          .portfolio-video {
            width: 96%;
            height: 82%;
            filter: drop-shadow(
              0 10px 14px rgba(0, 0, 0, 0.2)
            );
          }

          .grouped-card .portfolio-copy {
            width: min(80vw, 320px);
            max-width: min(80vw, 320px);
          }

          .portfolio-copy {
            width: min(80vw, 320px);
            max-width: min(80vw, 320px);
            min-width: 0;
            margin-inline: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center !important;
            overflow: visible;
          }

          .portfolio-copy h2 {
            font-size: 12px;
            line-height: 1.4;
            letter-spacing: 0.22em;
          }

          .portfolio-description {
            max-width: 100%;
            overflow-wrap: anywhere;
          }

          .portfolio-description {
            margin-top: 8px;
            max-width: 100%;
            font-size: 11px;
            line-height: 1.6;
            letter-spacing: 0.035em;
            text-align: center;
            overflow-wrap: anywhere;
          }

          .spotify-embed {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 14px auto 0;
            box-sizing: border-box;
          }

          .spotify-embed iframe {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0;
          }

          .spotify-embed iframe {
            height: 80px;
          }

          .portfolio-card {
            width: 78vw;
            height: 58vh;
          }

          .portfolio-image-frame {
            height: calc(
              100% - 34px
            );
          }

          .cylinder-glow {
            width: 125vw;
          }
        }

        @media (
          prefers-reduced-motion:
            reduce
        ) {
          .portfolio-card {
            transition: none;
          }

          .scroll-arrow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}