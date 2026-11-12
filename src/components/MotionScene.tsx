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
          gsap.fromTo(el, { y: 38, opacity: 1 }, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 93%', once: true } });
        });
        root.current.querySelectorAll<HTMLElement>('.feature-stage, .project-art').forEach(el => {
          if (seen.has(el)) return;
          seen.add(el);
          gsap.fromTo(el, { clipPath: 'inset(8% 0 8% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 1.05, ease: 'power3.out', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
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
  useEffect(()=>{
    const scene=root.current;
    if(!scene||reduced||!window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    let frame=0;let current:HTMLElement|null=null;let x=0,y=0;
    const clear=()=>{if(current){for(const prop of ['--tilt-x','--tilt-y','--magnet-x','--magnet-y'])current.style.removeProperty(prop);}current=null;};
    const move=(event:PointerEvent)=>{const target=(event.target as HTMLElement).closest<HTMLElement>('.index-preview,.project-art,.button');if(!target||!scene.contains(target)){clear();return;}if(current!==target){clear();current=target;}const bounds=target.getBoundingClientRect();x=(event.clientX-bounds.left)/bounds.width-.5;y=(event.clientY-bounds.top)/bounds.height-.5;if(!frame)frame=requestAnimationFrame(()=>{frame=0;if(!current)return;current.style.setProperty('--tilt-x',`${-y*4}deg`);current.style.setProperty('--tilt-y',`${x*4}deg`);current.style.setProperty('--magnet-x',`${x*12}px`);current.style.setProperty('--magnet-y',`${y*10}px`);});};
    scene.addEventListener('pointermove',move,{passive:true});scene.addEventListener('pointerleave',clear);return()=>{cancelAnimationFrame(frame);clear();scene.removeEventListener('pointermove',move);scene.removeEventListener('pointerleave',clear);};
  },[reduced,route.page,route.id]);
  return <div className="route-scene" ref={root}>{children}</div>;
}
