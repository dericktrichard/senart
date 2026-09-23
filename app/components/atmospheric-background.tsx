"use client";

import { useEffect, useRef } from "react";

import styles from "./atmospheric-background.module.css";

type VantaEffect = {
  destroy: () => void;
  resize: () => void;
};

const DESKTOP_OPTIONS = {
  birdSize: 0.7,
  wingSpan: 16,
  speedLimit: 2.2,
  separation: 60,
  alignment: 24,
  cohesion: 18,
  quantity: 3,
};

const MOBILE_OPTIONS = {
  birdSize: 0.5,
  wingSpan: 14,
  speedLimit: 1.6,
  separation: 48,
  alignment: 20,
  cohesion: 16,
  quantity: 1,
};

export function AtmosphericBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      return;
    }

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function initialize() {
      const [THREE, { default: BIRDS }] = await Promise.all([
        import("three"),
        import("vanta/dist/vanta.birds.min"),
      ]);

      if (cancelled || !container) {
        return;
      }

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const options = isMobile ? MOBILE_OPTIONS : DESKTOP_OPTIONS;

      effectRef.current = BIRDS({
        el: container,
        THREE,

        mouseControls: !isMobile,
        touchControls: false,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,

        backgroundColor: 0x050505,

        color1: 0xc000ff,
        color2: 0xffffff,

        ...options,
      });

      resizeObserver = new ResizeObserver(() => {
        effectRef.current?.resize();
      });

      resizeObserver.observe(container);
    }

    initialize();

    return () => {
      cancelled = true;

      resizeObserver?.disconnect();

      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={styles.background}
    />
  );
}