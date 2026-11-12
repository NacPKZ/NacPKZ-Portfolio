import { useApp } from '../utils/context';
import { asset } from '../utils/route';
import { getSeries } from '../data/series';
import type { SeriesId } from '../data/series';
import { requestEgg } from '../utils/studio';
export default function SeriesMoment({id,small=false,animated=false}:{id:SeriesId;small?:boolean;animated?:boolean}){const {lang,reduced}=useApp();const item=getSeries(id);return <aside className={'series-moment series-'+id+(small?' series-small':'')} style={{'--series-accent':item.accent} as React.CSSProperties}>{item.file?<img src={asset('assets/series/'+item.file+(animated&&!reduced?'.gif':'-poster.webp'))} alt={lang==='fr'?'Référence visuelle à '+item.title:'Visual reference to '+item.title} width="480" height="270" loading="lazy"/>:<div className="series-type-art" aria-hidden="true"><span>{item.title}</span><i/><i/><i/></div>}<div className="series-moment-copy"><span className="micro">{item.title}</span><p>{lang==='fr'?item.fr:item.en}</p><button onClick={()=>requestEgg(id)}>{lang==='fr'?'Entrer dans cet univers':'Explore this world'}</button></div></aside>;}
