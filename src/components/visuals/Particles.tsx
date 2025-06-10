'use client';

import Particles from 'react-particles';
import { loadLinksPreset } from 'tsparticles-preset-links';
import { useCallback } from 'react';
import type { Engine } from 'tsparticles-engine';

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        preset: 'links',
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: 'transparent' },
        particles: {
          color: { value: '#a855f7' },
          links: {
            color: '#a855f7',
            enable: true,
            distance: 120,
            opacity: 0.3,
            width: 1,
          },
          move: { enable: true, speed: 1 },
          size: { value: 2 },
          opacity: { value: 0.4 },
        },
      }}
    />
  );
}
