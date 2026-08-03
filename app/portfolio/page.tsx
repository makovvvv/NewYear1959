"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type PortfolioItem = {
  src: string;
  title: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    src: "/portfolio_items/HareGod.jpeg",
    title: "Hare God",
  },
  {
    src: "/portfolio_items/somfradio.png",
    title: "SOMF Radio",
  },
  {
    src: "/portfolio_items/RICK.png",
    title: "Rick",
  },
  {
    src: "/portfolio_items/10bucks.jpg",
    title: "10 Bucks",
  },
  {
    src: "/portfolio_items/tvgirl.png",
    title: "TV Girl",
  },
  {
    src: "/portfolio_items/workout.jpg",
    title: "Workout",
  },
  {
    src: "/portfolio_items/change.jpg",
    title: "Change",
  },
  {
    src: "/cover.png",
    title: "Cover",
  },
  {
    src: "/portfolio_items/cloak.png",
    title: "Cloak",
  },
  {
    src: "/portfolio_items/Wait4U_sh.jpg",
    title: "Wait 4 U",
  },
  {
    src: "/portfolio_items/Burby.png",
    title: "Burby",
  },
  {
    src: "/portfolio_items/WAIT4U_COVER_new.png",
    title: "Wait 4 U Cover",
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
        viewportHeight * 0.22;

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
            activeHorizontalPosition =
              side *
              viewportWidth *
              0.05;
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
    <div className="relative min-h-screen w-full overflow-x-clip bg-black text-white">
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
                    : "w-6 -translate-y-2 bg-white"
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
                    : "w-4 translate-y-2 bg-white"
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
                  : "white"
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
            z-50 h-10 object-contain
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
            "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))",
        }}
      />

      {/* ===== Menu Panel ===== */}
      <div
        className={`
          fixed inset-0 z-40
          flex items-center pl-8
          bg-gradient-to-r
          from-white via-white/95 to-white/0
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
          className="panel-link"
        >
          Home
        </Link>
      </div>

      <main>
        {/* ===== Full-Screen Portfolio Intro ===== */}
        <section className="relative z-10 flex h-screen w-full items-center justify-center px-4 sm:px-6">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="mb-3 h-px w-full max-w-[600px] bg-white/20" />

            <img
              src="/portfolioTitle.png"
              alt="Portfolio"
              className="w-full min-w-[280px] max-w-[600px]"
            />

            <div className="mt-8 flex flex-col items-center">
              <p className="text-[9px] uppercase tracking-[0.45em] text-white/40">
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
                className="scroll-arrow mt-4 h-5 w-5 text-white/40"
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
          className="relative -mt-[35vh]"
          style={{
            /*
             * Extra height includes the first-item
             * entrance plus the normal item transitions.
             */
            height: `calc(${
              portfolioItems.length *
              135
            }vh + 40vh)`,
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

              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
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
                      key={`${portfolioItem.src}-${index}`}
                      ref={(
                        element:
                          | HTMLElement
                          | null
                      ) => {
                        itemRefs.current[
                          index
                        ] = element;
                      }}
                      className="portfolio-card absolute left-1/2 top-1/2"
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
                          <img
                            src={
                              portfolioItem.src
                            }
                            alt={
                              portfolioItem.title
                            }
                            loading={
                              index < 3
                                ? "eager"
                                : "lazy"
                            }
                            className="h-full w-full object-contain"
                          />
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
                          <span className="text-[9px] tracking-[0.35em] text-white/35">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <div className="h-px w-10 bg-white/25" />

                          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/65">
                            {
                              portfolioItem.title
                            }
                          </h2>
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.5em] text-white/20">
              Heirloom Portfolio
            </div>
          </div>
        </section>

        {/* ===== Bottom Portfolio Content ===== */}
        <section className="relative z-10 flex w-full flex-col items-center bg-black px-4 pb-10 pt-14 sm:px-6">
          <div className="mb-1 h-px w-full max-w-[600px] bg-white/20" />

          <div className="w-full max-w-[600px]">
            <img
              src="/portfolio_items/Portfolio_stuff.png"
              alt="Portfolio information"
              className="block h-auto w-full"
            />
          </div>

          <div className="mb-5 h-px w-full max-w-[600px] bg-white/20" />

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

        .row-link {
          padding: 8px 16px;
          color: rgba(
            255,
            255,
            255,
            0.65
          );
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
          max-width: 639px
        ) {
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