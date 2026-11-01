'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PupBuddy } from '@/components/pup/PupBuddy';

// Cubic Bezier curve calculation: M40 250 C 170 40, 470 20, 620 168
function getBezierFlightCoords(t: number) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  // Bezier coordinates
  const x = uuu * 40 + 3 * uu * t * 170 + 3 * u * tt * 470 + ttt * 620;
  const y = uuu * 250 + 3 * uu * t * 40 + 3 * u * tt * 20 + ttt * 168;

  // Tangent derivative for flight pitch angle
  const dx = 3 * uu * (170 - 40) + 6 * u * t * (470 - 170) + 3 * tt * (620 - 470);
  const dy = 3 * uu * (40 - 250) + 6 * u * t * (20 - 40) + 3 * tt * (168 - 20);

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { x, y, angle };
}

export function TwoWaysScene() {
  const planeRef = useRef<SVGGElement>(null);

  // 60fps Airplane Flight Animation along the dotted curve (direct DOM transform)
  useEffect(() => {
    let animId: number;
    let startTime: number | null = null;
    const durationMs = 5500; // 5.5s flight cycle

    const animateFlight = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Flight cycle progress
      const p = (elapsed % durationMs) / durationMs;
      // Travel phase: 0 -> 0.85; Pause at Dubai: 0.85 -> 1.0
      const travelT = p < 0.85 ? p / 0.85 : 1;
      // Fade out on landing, fade in on takeoff
      const opacity = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.09) : p < 0.08 ? p / 0.08 : 1;

      // Soft easing along bezier
      const easedT = travelT < 0.5 ? 2 * travelT * travelT : 1 - Math.pow(-2 * travelT + 2, 2) / 2;
      const { x, y, angle } = getBezierFlightCoords(easedT);
      const bobY = Math.sin((elapsed / 260) * Math.PI) * 3;

      if (planeRef.current) {
        planeRef.current.setAttribute(
          'transform',
          `translate(${x.toFixed(1)} ${(y + bobY).toFixed(1)}) rotate(${angle.toFixed(1)})`
        );
        planeRef.current.style.opacity = opacity.toFixed(3);
      }

      animId = requestAnimationFrame(animateFlight);
    };

    animId = requestAnimationFrame(animateFlight);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-paths"
      style={{
        ['--sky-top' as string]: '#fbe3b4',
        ['--sky-bottom' as string]: '#f7d18d',
      }}
      aria-labelledby="paths-title"
    >
      <div className="gutter mx-auto max-w-[110rem]">
        {/* Title */}
        <h2 id="paths-title" className="tp-paths__title font-plush text-huge text-center">
          Two ways to meet your puppy
        </h2>

        {/* 2 Ways Fork */}
        <div className="tp-fork">
          {/* Central Wooden Signpost Mast */}
          <div aria-hidden="true" className="tp-fork__post" />

          {/* LEFT WAY: Puppies in Dubai */}
          <article className="tp-way tp-way--left" aria-labelledby="way-local">
            <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
              Puppies in Dubai
            </h3>

            <div className="tp-way__scene">
              {/* Dubai Skyline Silhouette */}
              <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Showroom Window Frame */}
              <figure className="tp-window">
                <span className="tp-window__glass">
                  <img
                    src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpeg"
                    alt="A tiny apricot teddy bear puppy held up in the TeddyPups showroom"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '54.3% 48.3%' }}
                  />
                </span>
                <figcaption className="font-scrawl">In our showroom</figcaption>
              </figure>
            </div>

            <p className="tp-way__text">
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>

            <Link className="btn btn-primary" href="/puppies?origin=local">
              Meet local puppies
            </Link>
          </article>

          {/* RIGHT WAY: Imported for You */}
          <article className="tp-way tp-way--right" aria-labelledby="way-imported">
            <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
              Imported for you
            </h3>

            <div className="tp-way__scene">
              <div className="tp-flight">
                <svg
                  viewBox="0 0 660 300"
                  role="img"
                  aria-label="A plane bringing a Korean Teacup puppy from Korea to Dubai"
                >
                  <defs>
                    <clipPath id="tp_porthole_clip">
                      <circle cx="0" cy="0" r="25" />
                    </clipPath>
                  </defs>

                  {/* Dotted curved flight trajectory */}
                  <path
                    d="M40 250 C 170 40, 470 20, 620 168"
                    className="tp-flight__route"
                  />

                  {/* Korea Origin Dot & Label */}
                  <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
                  <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
                    Korea
                  </text>

                  {/* Dubai Destination Dot & Label */}
                  <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
                  <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
                    Dubai
                  </text>

                  {/* The Cartoon Flying Airplane Cruising along the Bezier Path */}
                  <g ref={planeRef} transform="translate(620.0 168.0) rotate(44.5)" style={{ opacity: 1 }}>
                    <g transform="translate(-126 -78)">
                      {/* Tail wing */}
                      <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
                      {/* Far Wing */}
                      <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
                      {/* Airplane Fuselage */}
                      <path
                        d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
                        className="tp-flight__body"
                      />
                      {/* Near Wing */}
                      <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
                      {/* Nose cockpit visor line */}
                      <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
                    </g>

                    {/* Cabin Porthole with puppy looking through */}
                    <g transform="translate(10 2)">
                      <image
                        href="/media/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpeg"
                        x="-25"
                        y="-25"
                        width="50"
                        height="50"
                        clipPath="url(#tp_porthole_clip)"
                        preserveAspectRatio="xMidYMid slice"
                      />
                      <circle r="25" className="tp-flight__porthole" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <p className="tp-way__text">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.
            </p>

            <Link className="btn btn-primary" href="/puppies?origin=imported">
              See imported puppies
            </Link>
          </article>

          {/* Central Teddy sitting at the Signpost */}
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-fork__teddy"
          >
            <PupBuddy
              pose="sit"
              facing="right"
              size={195}
              label="Teddy sitting by the directional signpost"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
