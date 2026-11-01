'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { PUPPIES } from '@/data/puppies';
import { PupBuddy } from '@/components/pup/PupBuddy';
import { PAW_PATH_D } from '@/components/ui/PawTrailCanvas';

const DOOR_COLORS = [
  '#a24a1a',
  '#8b4e28',
  '#b56d3b',
  '#6d371e',
  '#a85a2c',
  '#934f24',
  '#7d3f1a',
  '#bd7542',
  '#63331b',
  '#ab6030',
  '#8f4b23',
  '#793b19',
  '#b36a38',
  '#5e2e17',
  '#9e5327',
];

export function MeetPupsScene() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [scrollDist, setScrollDist] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  // Exact responsive measurement matching original Module 3364
  useEffect(() => {
    const measure = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      setIsPinned(isDesktop && !prefersReduced);

      const track = trackRef.current;
      const hall = hallRef.current;
      if (hall && track && isDesktop && !prefersReduced) {
        const stage = hall.parentElement;
        const head = stage?.querySelector('.tp-meet__head') as HTMLElement | null;
        const plates = [...track.querySelectorAll('.tp-door__plate')] as HTMLElement[];
        const maxPlate = Math.max(64, ...plates.map((el) => el.offsetHeight));
        const floorEl = hall.querySelector('.tp-meet__floor') as HTMLElement | null;
        const floorH = floorEl?.offsetHeight ?? 0;
        const headH = head ? head.offsetTop + head.offsetHeight : 0;
        const stageH = stage?.clientHeight ?? window.innerHeight;
        const doorW = Math.max(
          128,
          Math.min(256, 0.15 * window.innerWidth, (stageH - headH - floorH - maxPlate - 40) / 1.3)
        );
        hall.style.setProperty('--door-w', `${doorW.toFixed(0)}px`);
      } else {
        hall?.style.removeProperty('--door-w');
      }

      setScrollDist(track ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (hallRef.current?.parentElement) ro.observe(hallRef.current.parentElement);
    window.addEventListener('resize', measure);

    const timer = setTimeout(measure, 350);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, [prefersReduced]);

  // Framer Motion smooth scroll tracking on the pin container
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 32,
    mass: 0.35,
  });

  const trackX = useTransform(springProgress, [0, 1], [0, -scrollDist]);

  // Sync floor parallax and 3D door swing states as corridor slides
  useEffect(() => {
    const track = trackRef.current;
    if (!isPinned || !track) return;

    const onUpdate = (xVal: number) => {
      hallRef.current?.style.setProperty('--floor-x', `${xVal.toFixed(1)}px`);
      const threshold = 0.36 * window.innerWidth;
      const doors = track.children;
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i] as HTMLElement;
        if (door.classList.contains('tp-door--all')) continue;
        const shouldOpen = door.offsetLeft + xVal < threshold;
        if ((door.dataset.open === 'true') !== shouldOpen) {
          door.dataset.open = String(shouldOpen);
        }
      }
    };

    onUpdate(trackX.get());
    return trackX.on('change', onUpdate);
  }, [isPinned, trackX]);

  const handleDoorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('.tp-door__leaf')) {
      e.preventDefault();
      const li = target.closest('.tp-door') as HTMLElement | null;
      if (li) {
        li.dataset.open = li.dataset.open === 'true' ? 'false' : 'true';
      }
    }
  };

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-meet"
      style={{
        ['--sky-top' as string]: '#fff1d8',
        ['--sky-bottom' as string]: '#fbe3b4',
      }}
      aria-labelledby="meet-title"
      data-pinned={isPinned ? 'true' : undefined}
    >
      {/* Dynamic Pin Range Container */}
      <div
        ref={pinRef}
        data-pin-range="true"
        style={{
          height: isPinned ? `calc(100vh + ${Math.round(0.8 * scrollDist)}px)` : undefined,
          ['--pinned' as string]: isPinned ? '1' : '0',
        }}
      >
        <div className="tp-meet__stage">
          {/* Header */}
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[#5a3a28]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link className="btn btn-primary shrink-0" href="/puppies">
              See all available puppies
            </Link>
          </header>

          {/* Hallway with Horizontal Track & Parquet Floor */}
          <div ref={hallRef} className="tp-meet__hall">
            <motion.ol
              ref={trackRef}
              style={isPinned ? { x: trackX } : undefined}
              className="tp-meet__track"
              data-treadmill="true"
              aria-label="Puppies looking for a family"
            >
              {PUPPIES.map((pup, index) => {
                const doorColor = DOOR_COLORS[index % DOOR_COLORS.length];

                return (
                  <li
                    key={pup.id}
                    className="tp-door"
                    data-open={isPinned ? 'false' : 'true'}
                  >
                    <Link
                      href={`/puppies/${pup.slug}`}
                      className="tp-door__link"
                      style={{
                        ['--door' as string]: doorColor,
                      }}
                      onClick={handleDoorClick}
                    >
                      {/* Top Plate: Name and Meta */}
                      <span className="tp-door__plate">
                        <span className="font-plush tp-door__name">
                          {pup.name}
                        </span>
                        <span className="tp-door__meta">
                          {pup.breedLabel}, {pup.sexLabel}, {pup.age}
                          {pup.hasVideo ? ', with video' : ''}
                        </span>
                      </span>

                      {/* Arched Door Frame */}
                      <span className="tp-door__frame">
                        {/* Inner Room Photo */}
                        <span className="tp-door__room">
                          <Image
                            src={pup.image || pup.fallbackImage}
                            alt={`${pup.name}, ${pup.breedLabel} puppy`}
                            fill
                            sizes="(min-width: 1024px) 15rem, 44vw"
                            className="object-cover"
                            style={{ objectPosition: pup.objectPosition }}
                          />
                        </span>

                        {/* Swinging Wooden Door Leaf with 3D Perspective */}
                        <span aria-hidden="true" className="tp-door__way">
                          <span className="tp-door__leaf">
                            {/* Paw Peephole */}
                            <svg viewBox="0 0 64 64" className="tp-door__peephole">
                              <path d={PAW_PATH_D} />
                            </svg>
                            {/* Golden Doorknob */}
                            <span className="tp-door__knob" />
                          </span>
                        </span>

                        {/* Hanging Available Tag */}
                        <span className="tp-door__tag font-scrawl">Available</span>
                      </span>
                    </Link>
                  </li>
                );
              })}

              {/* Final "Meet them all" Arched Door */}
              <li className="tp-door tp-door--all" data-open="true">
                <Link href="/puppies" className="tp-door__link">
                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="font-plush tp-door__all">
                      Meet them all
                    </span>
                  </span>
                </Link>
              </li>
            </motion.ol>

            {/* Parquet Striped Floor */}
            <div aria-hidden="true" className="tp-meet__floor" />

            {/* Walking Teddy on the Wooden Floor */}
            <div
              data-pup-stop="true"
              data-pose={isPinned ? 'walk' : 'sit'}
              data-facing="right"
              className="pup-stop tp-meet__teddy"
              data-act={isPinned ? 'treadmill' : undefined}
            >
              <PupBuddy
                pose={isPinned ? 'walk' : 'sit'}
                facing="right"
                size="100%"
                label="Teddy trotting along the puppy corridor floor"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
