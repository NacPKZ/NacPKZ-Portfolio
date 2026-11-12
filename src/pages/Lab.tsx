import { useState } from 'react';
import { useApp } from '../utils/context';
import { errorCosts, errors, roi } from '../utils/calculations';
import { External, PageTitle } from '../components/UI';
import ScenarioExplorer from '../components/ScenarioExplorer';
function RangeControl({ id, label, value, min = 0, max, step = 1, set, money }: { id: string; label: string; value: number; min?: number; max: number; step?: number; set: (n: number) => void; money: (n: number) => string }) {
  return <div className="range-control"><div><label htmlFor={id}>{label}</label><output htmlFor={id}>{money(value)}</output></div><input id={id} type="range" value={value} min={min} max={max} step={step} onChange={e => set(Number(e.target.value))} /><div className="range-bounds"><span>{money(min)}</span><span>{money(max)}</span></div></div>;
}
function ROILab() {
  const { c, lang } = useApp();
  const [investment, setInvestment] = useState(50000);
  const [gains, setGains] = useState(105000);
  const [costs, setCosts] = useState(0);
  const result = roi(investment, gains, costs);
  const money = (n: number) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  const number = (n: number) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 1 }).format(n);
  return <div className="lab-module"><div className="lab-module-title"><span className="micro">01 / ROI</span><h2>{c.roiTitle}</h2><p>{c.roiDesc}</p></div><div className="calculator-layout"><div className="calculator-controls"><RangeControl id="investment" label={c.investment} value={investment} min={10000} max={150000} step={1000} set={setInvestment} money={money} /><RangeControl id="gains" label={c.gains} value={gains} max={200000} step={1000} set={setGains} money={money} /><RangeControl id="annual-costs" label={c.recurring} value={costs} max={100000} step={1000} set={setCosts} money={money} /><button className="reset-button" onClick={() => { setInvestment(50000); setGains(105000); setCosts(0); }}>{c.reset} ↺</button></div><div className={`calculator-result${result.rate < 0 ? ' negative' : ''}`} aria-live="polite" aria-atomic="true"><span className="micro">{c.roiLabel}</span><strong className="roi-number">{number(result.rate)}<small>%</small></strong><dl><div><dt>{c.net}</dt><dd>{money(result.net)}</dd></div><div><dt>{c.payback}</dt><dd>{result.paybackMonths === null ? c.noPayback : `${number(result.paybackMonths)} ${c.months}`}</dd></div></dl><div className="roi-visual" aria-hidden="true"><span style={{ width: `${Math.min(100, (investment / Math.max(1, investment, gains)) * 100)}%` }} /><span style={{ width: `${Math.min(100, (gains / Math.max(1, investment, gains)) * 100)}%` }} /></div></div></div><div className="lab-footnotes"><p>{c.roiFormula}</p><p>{c.roiCaveat}</p><External href="https://github.com/NacPKZ/ConsultAI-360/blob/main/docs/12_rapport_final_conseil.md">{c.source} : ConsultAI 360</External></div></div>;
}
function ErrorLab() {
  const { c, lang } = useApp();
  const [fp, setFP] = useState(10);
  const [fn, setFN] = useState(50);
  const costs = errorCosts(fp, fn);
  const money = (n: number) => new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  const max = Math.max(1, costs.baseline, costs.forest);
  return <div className="lab-module"><div className="lab-module-title"><span className="micro">02 / DATACO</span><h2>{c.errorTitle}</h2><p>{c.errorDesc}</p></div><div className="error-sliders"><RangeControl id="fp-cost" label={c.falsePositive} value={fp} max={100} set={setFP} money={money} /><RangeControl id="fn-cost" label={c.falseNegative} value={fn} max={200} set={setFN} money={money} /></div><div className="error-comparison" aria-live="polite">{(['baseline', 'forest'] as const).map(model => <div key={model} className={'error-model ' + model}><span className="micro">{model === 'baseline' ? c.baseline : c.randomForest}</span><dl><div><dt>{c.fp}</dt><dd>{errors[model].fp.toLocaleString(lang)}</dd></div><div><dt>{c.fn}</dt><dd>{errors[model].fn.toLocaleString(lang)}</dd></div></dl><span className="micro">{c.totalCost}</span><strong>{money(costs[model])}</strong><div className="cost-rail"><span style={{ width: `${(costs[model] / max) * 100}%` }} /></div></div>)}</div><p className="cost-conclusion" role="status">{costs.baseline === costs.forest ? c.equalCost : `${c.cheaper} : ${costs.baseline < costs.forest ? c.baseline : c.randomForest}`}</p><button className="reset-button" onClick={() => { setFP(10); setFN(50); }}>{c.reset} ↺</button><div className="lab-footnotes"><p>{c.errorCaveat}</p><p>{c.labModelNote}</p><External href="https://github.com/NacPKZ/ConsultAI-360/blob/main/docs/08_rapport_final_prediction.md">{c.source} : DataCo</External></div></div>;
}
export default function Lab() {
  const { c, lang } = useApp();
  const [active, setActive] = useState('roi');
  return <><PageTitle pre={c.labPagePre} one={c.labPageTitle} two={c.labPageItalic} description={c.labPageDesc} /><section className="lab-content wrap"><div className="lab-tabs" role="group" aria-label={lang === 'fr' ? 'Choisir une expérience' : 'Choose an experiment'}>{[['roi', c.roiTab], ['errors', c.errorTab], ['quality', c.qualityTab]].map(([id, label], i) => <button key={id} className={active === id ? 'selected' : ''} aria-pressed={active === id} onClick={() => setActive(id)}><span>0{i + 1}</span>{label}</button>)}</div>{active === 'roi' ? <ROILab /> : active === 'errors' ? <ErrorLab /> : <div className="lab-module"><ScenarioExplorer standalone /></div>}</section></>;
}
