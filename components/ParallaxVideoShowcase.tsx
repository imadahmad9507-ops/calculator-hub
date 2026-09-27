'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useScroll, useIntersectionObserver } from '@/lib/hooks';

interface ParallaxVideoProps {
  src: string;
  poster: string;
  alt: string;
  /** Speed multiplier relative to scroll. e.g. 0.38 for lagging, 1.55 for leading */
  parallaxSpeed?: number;
  className?: string;
}

export function ParallaxVideoShowcase({
  src,
  poster,
  alt,
  parallaxSpeed = 1,
  className = '',
}: ParallaxVideoProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // IntersectionObserver to play when in viewport and pause when out of view
  const entry = useIntersectionObserver(containerRef, {
    threshold: 0.15,
    rootMargin: '50px',
  });
  const isIntersecting = !!entry?.isIntersecting;

  // Track scroll position for scoped parallax effect
  const scrollY = useScroll();
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) {
      setOffsetY(0);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2 + window.scrollY;
    const distanceFromCenter = scrollY - (elementCenter - window.innerHeight / 2);

    // Responsive scaling: scale max clamp down on mobile screens (< 768px) to prevent disorienting motion
    const isMobile = window.innerWidth < 768;
    const maxClamp = isMobile ? 40 : 90; // ±40px on mobile, ±90px on desktop

    // Calculate parallax translation factor
    const factor = (parallaxSpeed - 1) * 0.22;
    const computedOffset = Math.max(-maxClamp, Math.min(maxClamp, distanceFromCenter * factor));
    setOffsetY(computedOffset);
  }, [scrollY, parallaxSpeed, prefersReducedMotion]);

  // Manage video play/pause lifecycle based on viewport visibility
  useEffect(() => {
    if (!videoRef.current || videoError) return;

    if (isIntersecting && !prefersReducedMotion) {
      videoRef.current.play().catch(() => {
        // Fallback silently if autoplay is blocked
      });
    } else {
      videoRef.current.pause();
    }
  }, [isIntersecting, prefersReducedMotion, videoError]);

  const showVideo = !prefersReducedMotion && !videoError;

  return (
    // Outer card container defines strict boundary with overflow-hidden to prevent clipping/spillover
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950 aspect-video group ${className}`}
    >
      {/* Inner transform container handles smooth GPU-accelerated translate3d parallax */}
      <div
        className="w-full h-full relative"
        style={{
          transform: prefersReducedMotion ? 'none' : `translate3d(0, ${offsetY.toFixed(1)}px, 0)`,
          transition: 'transform 0.08s cubic-bezier(0, 0, 0.2, 1)',
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
      >
        {/* Static Poster Image fallback */}
        <img
          src={poster}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            showVideo && isIntersecting ? 'opacity-0 absolute inset-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video Element with Auto-pause / Auto-play */}
        {showVideo && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster={poster}
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Subdued boundary frame overlay on top of outer container */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none z-10" />
    </div>
  );
}
