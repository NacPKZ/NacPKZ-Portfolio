import { identity } from '../data/identity';
import { useApp } from '../utils/context';
import { External, Link } from './UI';
export default function Footer() {
  const { c } = useApp();
  return <footer className="site-footer wrap">
    <div className="footer-top"><Link className="footer-name">{identity.name}</Link><p>{c.footerLine}</p><div><External href="https://github.com/NacPKZ">GitHub</External><External href="https://www.linkedin.com/in/can-pekgoz/">LinkedIn</External></div></div>
    <div className="footer-bottom"><span>© 2026 CAN PEKGOZ</span><span>PARIS, FRANCE</span><Link to="recruiter">{c.recruiter}</Link></div>
  </footer>;
}
