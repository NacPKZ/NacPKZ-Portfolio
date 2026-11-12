import { useEffect, useRef, useState } from 'react';
import { useApp } from '../utils/context';
export default function Intro() {
  const { c, reduced } = useApp();
  const [visible, setVisible] = useState(() => { try { return !sessionStorage.getItem('can-intro-v2-seen') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } });
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!visible || reduced) return;
    try { sessionStorage.setItem('can-intro-v2-seen', '1'); } catch { /* Session persistence is optional. */ }
    const timer = window.setTimeout(() => setVisible(false), 2000);
    let cancel: (() => void) | undefined;
    let disposed = false;
    void import('gsap').then(({ gsap }) => {
      if (disposed || !box.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo('.intro-letter', { yPercent: 110, rotate: 0 }, { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.045, ease: 'power4.out' });
        gsap.to(box.current, { clipPath: 'inset(0 0 100% 0)', delay: 1.45, duration: 0.5, ease: 'power3.inOut' });
      }, box);
      cancel = () => ctx.revert();
    });
    return () => { disposed = true; window.clearTimeout(timer); cancel?.(); };
  }, [visible, reduced]);
  if (!visible || reduced) return null;
  return <div className="intro-overlay" ref={box}><div aria-hidden="true"><p>DATA / INTELLIGENCE / STRATEGY</p><div className="intro-name">{'CAN PEKGOZ'.split('').map((char, i) => <span key={i} className="intro-mask"><span className="intro-letter">{char === ' ' ? '\u00a0' : char}</span></span>)}</div><span className="intro-line" /></div><button onClick={() => setVisible(false)}>{c.intro}</button></div>;
}
