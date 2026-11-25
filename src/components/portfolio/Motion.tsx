import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';
import type { ReactNode } from 'react';
import type { Lang } from '../../data/types';
import type { PortfolioMetric } from '../../data/portfolio';

export function AnimatedPage({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      }
    }, {threshold: 0.1});
    root.current?.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cleanup: (() => void)[] = [];
    root.current?.querySelectorAll<HTMLElement>('[data-tilt]').forEach(element => {
      const reset = () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
        element.style.setProperty('--pointer-x', '50%');
        element.style.setProperty('--pointer-y', '50%');
      };
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
        element.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
        element.style.setProperty('--tilt-y', `${(x - 0.5) * 5}deg`);
        element.style.setProperty('--pointer-x', `${x * 100}%`);
        element.style.setProperty('--pointer-y', `${y * 100}%`);
      };
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', reset);
      cleanup.push(() => {
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', reset);
        reset();
      });
    });
    return () => cleanup.forEach(fn => fn());
  }, [reduced]);
  return <div className="page-transition" ref={root}>{children}</div>;
}

export function ReadingProgress() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty('--reading-progress', `${distance > 0 ? Math.min(1, scrollY / distance) : 0}`);
    };
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    update();
    return () => {
      resize.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return <div className="reading-progress" ref={progress} aria-hidden="true"><span/></div>;
}

export function AnimatedValue({ metric, lang }: { metric: PortfolioMetric; lang: Lang }) {
  const element = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const digits = metric.digits ?? 0;
  const format = (value: number) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    minimumFractionDigits: digits, maximumFractionDigits: digits,
  }).format(value) + (metric.suffix?.[lang] ?? '');
  const finalValue = format(metric.value);
  useEffect(() => {
    const target = element.current;
    if (!target || reduced) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 850, 1);
        target.textContent = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
          minimumFractionDigits: digits, maximumFractionDigits: digits,
        }).format(metric.value * (1 - (1 - progress) ** 3)) + (metric.suffix?.[lang] ?? '');
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      target.textContent = finalValue;
    };
  }, [digits, finalValue, lang, metric, reduced]);
  return <><span aria-hidden="true" ref={element}>{finalValue}</span><span className="sr-only">{finalValue}</span></>;
}
