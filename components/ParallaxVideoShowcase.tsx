'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useSpring, motion, useReducedMotion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';

interface ParallaxVideoProps {
  src: string;
  poster: string;
  alt: string;
  /** Horizontal drift direction: 'left' for hero (-40px), 'right' for search (+40px) */
  direction?: 'left' | 'right';
  /** Vertical drift distance: e.g. -50 for lagging, +60 for leading */
  verticalDistance?: number;
  className?: string;
}

export function ParallaxVideoShowcase({
  src,
  poster,
  alt,
  direction = 'left',
  verticalDistance = -50,
  className = '',
}: ParallaxVideoProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to auto-play when in viewport and auto-pause when out of view
  const entry = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: '50px',
  });
  const isIntersecting = !!entry?.isIntersecting;

  // Section-relative scroll progress ["start end" -> "end start"]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate target horizontal and vertical offsets based on viewport progress
  const targetX = direction === 'left' ? (isMobile ? -30 : -65) : (isMobile ? 30 : 65);
  const targetY = isMobile ? verticalDistance * 0.75 : verticalDistance * 1.5;

  const rawX = useTransform(scrollYProgress, [0, 1], [0, targetX]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, targetY]);

  // Apply spring smoothing (stiffness: 60, damping: 20) for smooth, deliberate motion
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });

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
    // Outer frame container defines strict bounds with overflow-hidden and extra safety margins
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl bg-zinc-950 aspect-video group my-6 ${className}`}
    >
      {/* Inner Framer Motion div handles smooth spring-interpolated 2D translation */}
      <motion.div
        className="w-full h-full relative"
        style={{
          x: prefersReducedMotion ? 0 : springX,
          y: prefersReducedMotion ? 0 : springY,
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
      </motion.div>

      {/* Subdued boundary frame overlay on top of outer container */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-10" />
    </div>
  );
}
