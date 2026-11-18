import React, { useEffect, useRef, useState } from 'react';
import './HeroBackdrop.css';

// Hero background. If a clip is added to src/assets/hero/ (hero.mp4, optionally hero.webm
// and hero.jpg as the still frame), it plays muted and looped behind the headline. With no
// clip, a calm animated scene of crops growing in rows is shown instead (about 6 seconds,
// looping), so the hero never looks empty and nothing real is misrepresented.
// The video is skipped for visitors who asked for reduced motion or Data Saver, and on
// very slow connections; they see the still frame or the static scene.
const found = import.meta.glob('../assets/hero/hero.{mp4,webm,jpg,webp}', { eager: true, query: '?url', import: 'default' });
const pick = (ext) => Object.entries(found).find(([path]) => path.endsWith(`.${ext}`))?.[1];
const MP4 = pick('mp4');
const WEBM = pick('webm');
const POSTER = pick('jpg') || pick('webp');

const canPlayVideo = () => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  const c = navigator.connection;
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return false;
  return true;
};

// Sprouts along the front rows: x position, size, and animation delay (seconds)
const SPROUTS = [
  [120, 1.0, 0.0], [260, 0.8, 0.5], [410, 1.1, 0.2], [560, 0.9, 0.8], [700, 1.0, 0.35],
  [850, 0.85, 1.0], [990, 1.1, 0.15], [1130, 0.9, 0.65], [1270, 1.0, 0.4], [1400, 0.8, 0.9],
];

function Scene() {
  return (
    <svg className="hero-scene" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#E6F0E1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E6F0E1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="scene-sun" cx="1130" cy="150" r="170" fill="url(#sun)" />
      <path d="M0 330 C 240 270 480 300 720 280 C 960 260 1200 300 1440 270 L1440 520 L0 520 Z" fill="#E2EEDB" />
      <path d="M0 380 C 260 330 520 360 780 340 C 1040 320 1250 360 1440 335 L1440 520 L0 520 Z" fill="#D3E6C9" />
      <path d="M0 430 C 300 395 560 420 820 405 C 1080 390 1260 420 1440 402 L1440 520 L0 520 Z" fill="#C4DDB8" />
      <g className="scene-rows" stroke="#B7D3AB" strokeWidth="1.5" fill="none" opacity="0.9">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${-100 + i * 300} 520 L${420 + i * 100} 405`} />
        ))}
      </g>
      {SPROUTS.map(([x, s, d]) => (
        <g key={x} className="scene-sprout" style={{ animationDelay: `${d}s` }} transform={`translate(${x} 468) scale(${s * 1.05})`}>
          <g className="sprout-body">
            <path d="M0 0 L0 -34" stroke="#4E8B4B" strokeWidth="3" strokeLinecap="round" />
            <path d="M0 -22 C -22 -26 -28 -44 -26 -52 C -10 -50 -2 -38 0 -22 Z" fill="#6FA866" />
            <path d="M0 -30 C 22 -36 30 -54 28 -62 C 10 -60 2 -46 0 -30 Z" fill="#8DC63F" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function HeroBackdrop() {
  const ref = useRef(null);
  const [video, setVideo] = useState(false);

  useEffect(() => { setVideo(Boolean(MP4 || WEBM) && canPlayVideo()); }, []);

  // Pause while the tab is hidden to save battery and data.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onVis = () => (document.hidden ? el.pause() : el.play().catch(() => {}));
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [video]);

  return (
    <div className="hero-media" aria-hidden="true">
      {video ? (
        <video ref={ref} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={POSTER}>
          {WEBM && <source src={WEBM} type="video/webm" />}
          {MP4 && <source src={MP4} type="video/mp4" />}
        </video>
      ) : POSTER ? (
        <img className="hero-video" src={POSTER} alt="" />
      ) : (
        <Scene />
      )}
      <div className="hero-veil" />
    </div>
  );
}
