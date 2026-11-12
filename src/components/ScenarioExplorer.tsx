import { useState } from 'react';
import { useApp } from '../utils/context';
import { External, Eyebrow } from './UI';
const scenarios = [
  { id: 'original', rows: 1006394, events: 0, revenue: 72056406.60 },
  { id: 'low', rows: 1011524, events: 26430, revenue: 71327494.22 },
  { id: 'medium', rows: 1032042, events: 131594, revenue: 68448127.94 },
  { id: 'critical', rows: 1057689, events: 261822, revenue: 64901512.00 },
];
export default function ScenarioExplorer({ standalone = false }: { standalone?: boolean }) {
  const { c, lang } = useApp();
  const [index, setIndex] = useState(2);
  const s = scenarios[index];
  const fmt = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB');
  const money = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });
  const pct = ((s.revenue / scenarios[0].revenue) * 100);
  return <section id={standalone?undefined:'case-scenarios'} tabIndex={standalone?undefined:-1} className={'scenario-explorer' + (standalone ? '' : ' wrap')}><Eyebrow>DATA QUALITY / NEXARETAIL</Eyebrow><h2 className="section-title">{c.scenarios}</h2><p className="section-description">{c.scenariosDesc}</p><div className="scenario-tabs" role="group" aria-label={lang === 'fr' ? 'Scénarios de qualité' : 'Quality scenarios'}>{scenarios.map((item, i) => <button key={item.id} aria-pressed={index === i} className={index === i ? 'selected' : ''} onClick={() => setIndex(i)}><span className="scenario-level"><i /><i /><i /><i /></span>{item.id}</button>)}</div><div key={s.id} className="scenario-readout" aria-live="polite"><div className="scenario-metric"><span className="micro">{c.rawRows}</span><strong>{fmt.format(s.rows)}</strong></div><div className="scenario-metric"><span className="micro">{c.injectedEvents}</span><strong>{fmt.format(s.events)}</strong></div><div className="scenario-revenue"><span className="micro">{c.measuredRevenue}</span><strong>{money.format(s.revenue)}</strong><div className="revenue-rail"><span style={{ width: `${pct}%` }} /></div><span className="source-note">{c.referenceRevenue} : {money.format(scenarios[0].revenue)}</span></div></div><p className="caveat">{c.qualityNote}</p><div className="scenario-sources"><External href="https://github.com/NacPKZ/ConsultAI-360/blob/d4083fce2c15649e38409d17f981ca86bdfb4134/docs/12_rapport_final_conseil.md">{lang === 'fr' ? 'Périmètre analytique et CA' : 'Analytical scope and revenue'}</External><External href={`https://github.com/NacPKZ/ConsultAI-360/${s.id === 'original' ? 'blob/d4083fce2c15649e38409d17f981ca86bdfb4134/README.md' : 'blob/d4083fce2c15649e38409d17f981ca86bdfb4134/reports/data_quality/injections/' + s.id + '/injection_summary.json'}`}>{lang === 'fr' ? 'Volumes et injections' : 'Volumes and injected events'}</External></div></section>;
}
