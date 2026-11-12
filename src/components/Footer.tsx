import { identity } from '../data/identity';
import { useApp } from '../utils/context';
import { External, Link } from './UI';
export default function Footer() {
  const { c, reduced, setReduced } = useApp();
  return <footer className="site-footer wrap">
    <div className="footer-top"><Link className="footer-name">{identity.name}</Link><p>{c.footerLine}</p><div><External href="https://github.com/NacPKZ">GitHub</External><External href="https://www.linkedin.com/in/can-pekgoz/">LinkedIn</External></div></div>
    <div className="footer-bottom"><span>© 2026 CAN PEKGOZ</span><span>PARIS, FRANCE</span><button aria-pressed={!reduced} onClick={() => setReduced(!reduced)}>{c.motion} <span className={`motion-dot${reduced ? '' : ' on'}`} />{reduced ? c.motionOff : c.motionOn}</button><Link to="recruiter">{c.recruiter}</Link></div>
  </footer>;
}
