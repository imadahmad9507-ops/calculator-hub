'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export function HeroShowcaseVideo() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion or video already failed, don't attempt to load video
    if (prefersReducedMotion || videoError) return;

    // Lazy-load video using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion, videoError]);

  const showVideo = shouldLoadVideo && !prefersReducedMotion && !videoError;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-950 aspect-video group"
    >
      {/* Static Poster Image fallback or initial display */}
      <img
        src="/videos/hero-loop-poster.jpg"
        alt="Calculator Hub Showcase Preview"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          showVideo ? 'opacity-0 absolute inset-0' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* Lazy-loaded video element */}
      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/videos/hero-loop-poster.jpg"
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subdued overlay styling frame */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
    </div>
  );
}
