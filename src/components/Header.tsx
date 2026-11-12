import { identity } from '../data/identity';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { useApp } from '../utils/context';
import { routeHref } from '../utils/route';
import { Link } from './UI';
import CommandPalette from './CommandPalette';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const { c, lang, route, reduced } = useApp();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuSurface = useRef<HTMLDivElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const menuClosing = useRef(false);
  const items = [
    { path: '', label: c.home }, { path: 'work', label: c.work },
    { path: 'about', label: c.about }, { path: 'games', label: lang==='fr'?'Jeux':'Games' }, { path: 'contact', label: c.contact },
  ];
  const active = Math.max(0, items.findIndex(item => item.path === (route.page === 'home' ? '' : route.page)));
  const path = route.page === 'home' ? '' : route.page + (route.id ? '/' + route.id : '');

  useEffect(() => {
    let frame = 0;
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(() => { setScrolled(window.scrollY > 24); frame = 0; }); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);

  useLayoutEffect(() => {
    const element = nav.current;
    if (!element || !pill.current) return;
    let disposed = false;
    let stop: (() => void) | undefined;
    const move = async () => {
      const target = element.querySelectorAll<HTMLAnchorElement>('a')[hover ?? active];
      if (!target || !pill.current) return;
      const x = target.offsetLeft;
      const width = target.offsetWidth;
      if (reduced) { pill.current.style.transform = `translateX(${x}px)`; pill.current.style.width = `${width}px`; return; }
      const { gsap } = await import('gsap');
      if (disposed || !pill.current) return;
      const tween = gsap.to(pill.current, { x, width, duration: 0.5, ease: 'power3.out', overwrite: true });
      stop = () => tween.kill();
    };
    void move();
    const resize = new ResizeObserver(() => { void move(); }); resize.observe(element);
    return () => { disposed = true; resize.disconnect(); stop?.(); };
  }, [active, hover, lang, reduced]);

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    element.showModal();
    let dispose: (() => void) | undefined;
    let canceled = false;
    if (!reduced) void import('gsap').then(({ gsap }) => {
      if (canceled || !menuSurface.current) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(menuSurface.current, { clipPath: 'inset(0 0 100% 0)', y: 0, opacity: 1 }, { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.out' });
        gsap.fromTo('.menu-link-label', { yPercent: 110 }, { yPercent: 0, stagger: 0.055, duration: 0.65, ease: 'power4.out', delay: 0.12 });
      }, menuSurface);
      dispose = () => ctx.revert();
    });
    return () => { canceled = true; dispose?.(); if (element.open) element.close(); };
  }, [open, reduced]);

  const closeMenu = async (destination?: string) => {
    if (menuClosing.current) return;
    menuClosing.current = true;
    const finish = () => {
      setOpen(false); dialog.current?.close(); menuClosing.current = false;
      if (destination !== undefined) location.hash = routeHref(lang, destination);
      else menuToggle.current?.focus();
    };
    if (!reduced && menuSurface.current) {
      try { const { gsap } = await import('gsap'); gsap.to(menuSurface.current, { y: -24, opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: finish }); }
      catch { finish(); }
    } else finish();
  };
  const menuNavigate = (event: MouseEvent<HTMLAnchorElement>, destination: string) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); void closeMenu(destination);
  };

  return <header className={`navigation${scrolled ? ' is-scrolled' : ''}${route.page === 'recruiter' ? ' navigation-paper' : ''}`}>
    <ThemeSwitcher/>
    <a className="skip-link" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>{c.skip}</a>
    <div className="nav-container">
      <Link className="brand-name"><span>{identity.name}</span></Link>
      <nav className="nav-dock" ref={nav} aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'} onPointerLeave={() => setHover(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(null); }}>
        <span ref={pill} className="nav-active-pill" aria-hidden="true" />
        {items.map((item, i) => <Link key={item.path} to={item.path} aria-current={i === active && route.page !== 'recruiter' ? 'page' : undefined} className={i === active ? 'is-active' : ''} onPointerEnter={() => setHover(i)} onFocus={() => setHover(i)}><span>{item.label}</span></Link>)}
      </nav>
      <div className="nav-utilities"><CommandPalette />
        <a className="language-button" aria-label={`${lang.toUpperCase()} / ${lang === 'fr' ? 'EN' : 'FR'}, ${c.language}`} href={routeHref(lang === 'fr' ? 'en' : 'fr', path)}>{lang.toUpperCase()}<span> / </span>{lang === 'fr' ? 'EN' : 'FR'}</a>
        <Link className="recruiter-shortcut" to={route.page === 'recruiter' ? '' : 'recruiter'}>{route.page === 'recruiter' ? c.home : c.recruiter}</Link>
        <button ref={menuToggle} className="nav-menu-toggle" aria-label={c.menu} aria-haspopup="dialog" aria-expanded={open} aria-controls="navigation-overlay" onClick={() => setOpen(true)}><span>Menu</span><i aria-hidden="true"><b /><b /></i></button>
      </div>
    </div>
    <dialog id="navigation-overlay" className="navigation-overlay" ref={dialog} aria-label="Navigation" onCancel={event => { event.preventDefault(); void closeMenu(); }} onClose={() => { setOpen(false); menuClosing.current = false; }}>
      <div className="menu-surface" ref={menuSurface}>
        <div className="menu-top"><span>{identity.name}</span><button onClick={() => void closeMenu()}>{c.close}<i className="close-lines" aria-hidden="true" /></button></div>
        <nav className="overlay-links" aria-label={lang === 'fr' ? 'Choisir une page' : 'Choose a page'}>
          {items.map((item, i) => <a key={item.path} href={routeHref(lang, item.path)} onClick={e => menuNavigate(e, item.path)} aria-current={i === active ? 'page' : undefined}><span className="menu-link-number">0{i + 1}</span><span className="menu-link-mask"><span className="menu-link-label">{item.label}</span></span><span className="menu-link-rule" aria-hidden="true" /></a>)}
        </nav>
        <div className="menu-bottom"><a href={routeHref(lang, 'recruiter')} onClick={e => menuNavigate(e, 'recruiter')}>{c.recruiter}</a><span>{c.availability}</span><a href="mailto:canpekgoz.pro@gmail.com">canpekgoz.pro@gmail.com</a></div>
      </div>
    </dialog>
  </header>;
}
