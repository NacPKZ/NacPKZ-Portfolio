import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useApp } from '../utils/context';
import { routeHref } from '../utils/route';
export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={`arrow ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h18M14 5l7 7-7 7'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
export function Link({ to = '', children, className = '', ...rest }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to?: string }) {
  const { lang } = useApp();
  return <a href={routeHref(lang, to)} className={className} {...rest}>{children}</a>;
}
export function External({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer noopener'} className={`external-link ${className}`}>{children}</a>;
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <p className={`eyebrow${light ? ' muted' : ''}`}><span className="dot" />{children}</p>; }
export function PageTitle({ pre, one, two, description }: { pre: string; one: string; two: string; description?: string }) {
  return <div className="page-title wrap"><Eyebrow>{pre}</Eyebrow><h1 className="display">{one}<br /><em>{two}</em></h1>{description && <p className="page-intro">{description}</p>}</div>;
}
export function NumberTag({ children }: { children: ReactNode }) { return <span className="number-tag">{children}</span>; }
