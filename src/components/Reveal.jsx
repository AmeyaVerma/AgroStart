import React, { useEffect, useRef, useState } from 'react';

// Fade and slide into view the first time the element enters the viewport. The element is
// invisible until it appears, so nothing jumps around during the animation. Reduced-motion
// visitors see everything straight away.
const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(() => prefersReduced());

  useEffect(() => {
    if (seen) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
    const io = new IntersectionObserver((rows) => {
      if (rows.some((r) => r.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px' });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <Tag
      ref={ref}
      className={`reveal${seen ? ' in' : ''} ${className}`}
      style={{ transitionDelay: seen && delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
