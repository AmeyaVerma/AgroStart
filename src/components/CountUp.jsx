import React, { useEffect, useRef, useState } from 'react';

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Count up to a number when the element enters the view. Pass `value` as text (e.g. "21+",
// "1,000,000+", "Bite-sized"); only the digits animate, the rest is kept.
export default function CountUp({ value, duration = 1600, className = '' }) {
  const ref = useRef(null);
  const [out, setOut] = useState(() => (prefersReduced() ? value : extractZero(value)));

  useEffect(() => {
    if (prefersReduced()) { setOut(value); return undefined; }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setOut(value); return undefined; }
    const digits = value.match(/[\d,]+/);
    if (!digits) { setOut(value); return undefined; }
    const target = Number(digits[0].replace(/,/g, ''));
    if (!Number.isFinite(target) || target === 0) { setOut(value); return undefined; }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver((rows) => {
      if (!rows.some((r) => r.isIntersecting)) return;
      io.disconnect();
      const step = (now) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) * (1 - t) * (1 - t);
        const cur = Math.round(target * eased);
        setOut(value.replace(digits[0], cur.toLocaleString('en-IN')));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <span ref={ref} className={className}>{out}</span>;
}

// Show "0" in place of the number while it is not yet visible.
function extractZero(value) {
  const digits = value.match(/[\d,]+/);
  return digits ? value.replace(digits[0], '0') : value;
}
