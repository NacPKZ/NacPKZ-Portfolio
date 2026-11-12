import { Component, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ComponentType, ReactNode } from 'react';
import { projects } from './data/projects';
import { identity } from './data/identity';
import { copy } from './i18n/copy';
import { AppContext } from './utils/context';
import { parseRoute } from './utils/route';
import Header from './components/Header';
import Footer from './components/Footer';
import Intro from './components/Intro';
import Home from './pages/Home';
import ProjectIndex from './components/ProjectIndex';
import Contact from './pages/Contact';
import { Link, PageTitle } from './components/UI';
import MotionScene from './components/MotionScene';
import BackToTop from './components/BackToTop';
import Studio from './components/Studio';
const About = lazy(() => import('./pages/About'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Lab = lazy(() => import('./pages/Lab'));
const Recruiter = lazy(() => import('./pages/Recruiter'));

const ready: { about?: ComponentType; work?: ComponentType<{id:string}>; lab?: ComponentType; recruiter?: ComponentType } = {};

async function preloadPage(page: string, id?: string) {
  if (page === 'about') ready.about=(await import('./pages/About')).default;
  if (page === 'work' && id) ready.work=(await import('./pages/CaseStudy')).default;
  if (page === 'lab') ready.lab=(await import('./pages/Lab')).default;
  if (page === 'recruiter') ready.recruiter=(await import('./pages/Recruiter')).default;
}

class ErrorBoundary extends Component<{ children: ReactNode; title: string; retry: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="error-state wrap"><h1>{this.props.title}</h1><button className="button button-sage" onClick={() => location.reload()}>{this.props.retry}</button></div> : this.props.children; }
}
export default function App() {
  const [route, setRoute] = useState(() => parseRoute(location.hash));
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const lang = route.lang;
  const c = copy[lang];
  const firstRender = useRef(true);
  const curtain = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let sequence = 0;
    let disposed = false;
    let activeTransition: ViewTransition | undefined;
    let stopFallback: (() => void) | undefined;
    const onHash = async () => {
      const ticket = ++sequence;
      const next = parseRoute(location.hash);
      try { await preloadPage(next.page, next.id); } catch { /* The page error boundary supplies recovery. */ }
      if (disposed || ticket !== sequence) return;
      document.documentElement.dataset.transition = next.page==='work'&&next.id?'project':'page';
      const commit = () => { if (!disposed && ticket === sequence) flushSync(() => setRoute(next)); };
      activeTransition?.skipTransition();
      stopFallback?.();
      if (reduced) { commit(); return; }
      if (typeof document.startViewTransition === 'function') {
        activeTransition = document.startViewTransition(commit);
        void activeTransition.finished.catch(() => { /* A newer transition may supersede this one. */ });
      } else {
        const { gsap } = await import('gsap');
        if (disposed || ticket !== sequence || !curtain.current) return;
        const timeline = gsap.timeline();
        timeline.fromTo(curtain.current, { yPercent: 100 }, { yPercent: 0, duration: 0.28, ease: 'power3.inOut' })
          .call(commit).to(curtain.current, { yPercent: -100, duration: 0.42, ease: 'power3.inOut' });
        stopFallback = () => { timeline.kill(); gsap.set(curtain.current, { yPercent: 100 }); };
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => { disposed = true; sequence++; activeTransition?.skipTransition(); stopFallback?.(); window.removeEventListener('hashchange', onHash); };
  }, [reduced]);
  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setReduced(media.matches);
    media.addEventListener('change', onMotion);
    return () => media.removeEventListener('change', onMotion);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'; try { localStorage.setItem('can-motion',reduced?'reduced':'full'); } catch { /* Preference persistence is optional. */ } }, [reduced]);
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    document.body.dataset.page = route.page;document.body.dataset.case=String(Boolean(route.id));
    const titles: Record<string, string> = { home: c.positioning, work: c.work, about: c.about, lab: c.lab, contact: c.contact, recruiter: c.recruiter };
    document.title = `${identity.name} | ${route.id ? (projects.find(p=>p.id===route.id)?.title || c.notFound) + ' / ' : ''}${titles[route.page] || c.home}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', lang === 'fr' ? 'Portfolio de Can Pekgoz, étudiant M2 BIDABI. Data, BI, SQL, Python et stratégie. Stage de six mois dès mars 2027 en Île-de-France.' : 'Portfolio of Can Pekgoz, BIDABI master’s student. Data, BI, SQL, Python and strategy. Seeking a six-month internship from March 2027 in Île-de-France.');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!firstRender.current) document.getElementById('main')?.focus({ preventScroll: true });
    firstRender.current = false;
  }, [route.page, route.id, lang, c]);
  useEffect(() => {
    let frame = 0;
    const progress = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { const total = document.documentElement.scrollHeight - innerHeight; document.documentElement.style.setProperty('--progress', `${total > 0 ? scrollY / total : 0}`); frame = 0; });
    };
    window.addEventListener('scroll', progress, { passive: true }); progress();
    return () => { window.removeEventListener('scroll', progress); cancelAnimationFrame(frame); };
  }, []);
  let content: ReactNode;
  switch (route.page) {
    case 'home': content = <Home />; break;
    case 'work': { const Page=ready.work||CaseStudy;content=route.id?<Page key={route.id} id={route.id}/>:<ProjectIndex/>;break; }
    case 'about': {const Page=ready.about||About;content=<Page/>;break;}
    case 'lab': {const Page=ready.lab||Lab;content=<Page/>;break;}
    case 'contact': content = <Contact />; break;
    case 'recruiter': {const Page=ready.recruiter||Recruiter;content=<Page/>;break;}
    default: content = <><PageTitle pre="404" one={c.notFound} two="" description={c.notFoundDesc} /><div className="wrap"><Link className="button button-sage">{c.home}</Link></div></>;
  }
  return <AppContext.Provider value={{ lang, c, route, reduced, setReduced }}><div className="reading-progress" aria-hidden="true" /><Header /><div className="route-curtain" aria-hidden="true" ref={curtain}><span>Can Pekgoz</span></div><main id="main" tabIndex={-1}><ErrorBoundary key={route.page + '/' + (route.id || '') + lang} title={c.errorTitleApp} retry={c.retry}><Suspense fallback={<div className="loading-state wrap" role="status">{c.loading}</div>}><MotionScene key={route.page + '/' + (route.id || '') + lang}>{content}</MotionScene></Suspense></ErrorBoundary></main><Footer /><BackToTop /><Studio/>{route.page === 'home' && <Intro />}</AppContext.Provider>;
}
