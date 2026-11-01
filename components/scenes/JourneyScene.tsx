'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PupBuddy } from '@/components/pup/PupBuddy';
import { SITE_CONFIG } from '@/data/siteConfig';

export function JourneyScene() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedBreed, setSelectedBreed] = useState('Maltipoo');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  // Scroll detection to highlight active step
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.top <= windowH * 0.55 && rect.bottom >= windowH * 0.25) {
        const progress = (windowH * 0.55 - rect.top) / (rect.height * 0.65);
        if (progress < 0.35) {
          setActiveStep(1);
        } else if (progress < 0.7) {
          setActiveStep(2);
        } else {
          setActiveStep(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat"
      style={{
        ['--sky-top' as string]: '#f7d18d',
        ['--sky-bottom' as string]: '#f0b866',
      }}
      aria-labelledby="journey-title"
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        {/* Left Story Column */}
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[#5a3a28]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol className="tp-chat__steps">
            {/* Step 1 */}
            <li
              className="tp-chat__step"
              data-done={activeStep > 1 ? 'true' : 'false'}
              data-active={activeStep === 1 ? 'true' : 'false'}
              onClick={() => setActiveStep(1)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                1
              </span>
              <h3 className="font-plush tp-chat__title">Choose your breed</h3>
              <p className="tp-chat__text">
                Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
              </p>
            </li>

            {/* Step 2 */}
            <li
              className="tp-chat__step"
              data-done={activeStep > 2 ? 'true' : 'false'}
              data-active={activeStep === 2 ? 'true' : 'false'}
              onClick={() => setActiveStep(2)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                2
              </span>
              <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
              <p className="tp-chat__text">
                Our team will share real photos, health details, and all necessary information directly on WhatsApp.
              </p>
            </li>

            {/* Step 3 */}
            <li
              className="tp-chat__step"
              data-done="false"
              data-active={activeStep === 3 ? 'true' : 'false'}
              onClick={() => setActiveStep(3)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                3
              </span>
              <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
              <p className="tp-chat__text">
                Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
              </p>
            </li>
          </ol>

          <Link className="btn btn-ghost tp-chat__cta border-2 border-[#2a170e] rounded-full px-7 py-3 text-sm font-bold text-[#2a170e] hover:bg-white inline-block mt-8" href="/how-it-works">
            How it works
          </Link>
        </div>

        {/* Right Phone Mockup Column */}
        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            {/* WhatsApp Contact Bar */}
            <div className="tp-phone__bar">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#2a170e]/20">
                <Image
                  src="/logo.png"
                  alt="TeddyPups Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="flex flex-col">
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">online</span>
              </span>
            </div>

            {/* WhatsApp Chat Screen */}
            <div className="tp-phone__screen">
              {/* Outgoing Initial User Message */}
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              {/* Step 1 Group: Breed Selection */}
              <div className="tp-msg-group" data-step="0" data-show="true">
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    <li><Link href="/puppies?breed=maltipoo">Maltipoo</Link></li>
                    <li><Link href="/puppies?breed=pomeranian">Pomeranian</Link></li>
                    <li><Link href="/puppies?breed=poodle">Poodle</Link></li>
                    <li><Link href="/puppies?breed=cavapoo">Cavapoo</Link></li>
                    <li><Link href="/puppies?breed=shih-tzu">Shih Tzu</Link></li>
                  </ul>
                </div>
              </div>

              {/* Step 2 Group: Photos & Details */}
              <div className="tp-msg-group" data-step="1" data-show="true">
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpeg"
                        alt="Teddy bear puppy held up in showroom"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpeg"
                        alt="Teddy bear puppy close up"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpeg"
                        alt="Puppy looking up"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="tp-snaps__one">
                      <Image
                        src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpeg"
                        alt="Puppy held up"
                        fill
                        className="object-cover"
                      />
                    </span>
                  </div>
                </div>

                {/* Showroom Video Clip */}
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-clip">
                    <video
                      ref={videoRef}
                      src="/media/showroom-video.mp4"
                      poster="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpeg"
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                    />
                    <button
                      type="button"
                      className="tp-clip__play"
                      aria-pressed={isVideoPlaying}
                      aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
                      onClick={toggleVideo}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {isVideoPlaying ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="tp-msg tp-msg--them">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </div>

              {/* Step 3 Group: Delivery & Route */}
              <div className="tp-msg-group" data-step="2" data-show="true">
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                    <path
                      d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z"
                      className="tp-route__heart"
                    />
                    {/* Paw marks on route */}
                    <path
                      d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z"
                      transform="translate(70 22) scale(.3) rotate(70 32 32)"
                      className="tp-route__paw"
                      fill="#a24a1a"
                    />
                    <path
                      d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z"
                      transform="translate(104 38) scale(.3) rotate(100 32 32)"
                      className="tp-route__paw"
                      fill="#a24a1a"
                    />
                  </svg>
                </div>
              </div>

              {/* Typing indicator */}
              <p className="tp-typing" data-show={activeStep === 1 ? 'true' : 'false'} aria-hidden="true">
                <span />
                <span />
                <span />
              </p>
            </div>

            {/* Bottom Compose Action Bar */}
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          {/* Teddy sitting beside the phone */}
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-chat__teddy"
          >
            <PupBuddy
              pose="sit"
              facing="right"
              size={180}
              label="Teddy sitting alongside the puppy adoption chat"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
