import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../utils/context';

export default function MotionScene({ children }: { children: ReactNode }) {
  const { reduced, route } = useApp();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || !root.current) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    let observer: MutationObserver | undefined;
    const seen = new WeakSet<Element>();
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {}, root);
      const enhance = () => ctx.add(() => {
        if (!root.current) return;
        root.current.querySelectorAll<HTMLElement>('.section-heading, .feature-title-row, .case-body h2, .case-reflection > div, .experience-row, .project-index-row, .education-row, .contact-grid, .case-metrics > div, .series-bridge, .collection-card, .game-spot').forEach(el => {
          if (seen.has(el)) return;
          seen.add(el);
          // The upper viewport remains immediately readable. Offscreen content reveals once.
          if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
          gsap.fromTo(el, { y: 18, opacity: 1 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 93%', once: true } });
        });
        root.current.querySelectorAll<HTMLElement>('.feature-stage, .project-art').forEach(el => {
          if (seen.has(el)) return;
          seen.add(el);
          gsap.fromTo(el, { clipPath: 'inset(3% 0 3% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.65, ease: 'power2.out', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        });
      });
      enhance();
      // Lazy pages can resolve after this wrapper mounts; only new elements are enhanced.
      observer = new MutationObserver(enhance); observer.observe(root.current, { childList: true, subtree: true });
      cleanup = () => ctx.revert();
      void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    });
    return () => { disposed = true; observer?.disconnect(); cleanup?.(); };
  }, [reduced, route.page, route.id]);
  return <div className="route-scene" ref={root}>{children}</div>;
}
