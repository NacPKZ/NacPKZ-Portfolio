import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../data/projects';
import { useApp } from '../utils/context';
import { routeHref } from '../utils/route';
import { requestStudio } from '../utils/studio';
import { matchesSearch } from '../utils/search';
export default function CommandPalette() {
  const { c, lang, route } = useApp();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const currentPath = route.page === 'home' ? '' : route.page + (route.id ? '/' + route.id : '');
  const commands = useMemo(()=>[
    ...[{path:'',title:c.home},{path:'work',title:c.work},{path:'about',title:lang==='fr'?'Parcours & ce qui m’anime':'Background & what moves me'},{path:'recruiter',title:c.recruiter},{path:'contact',title:c.contact}].map(p=>({id:'page-'+p.path,title:p.title,detail:lang==='fr'?'Page':'Page',href:routeHref(lang,p.path),action:undefined as undefined | (()=>void)})),
    ...projects.map(p=>({id:p.id,title:p.title,detail:p.tech.slice(0,3).join(' / '),search:p.summary[lang]+' '+p.tagline[lang]+' '+p.category.join(' '),href:routeHref(lang,'work/'+p.id),action:undefined as undefined | (()=>void)})),
    {id:'language',title:lang==='fr'?'Passer en anglais':'Switch to French',detail:'FR / EN',href:routeHref(lang==='fr'?'en':'fr',currentPath),action:undefined as undefined | (()=>void)},
    {id:'studio',title:lang==='fr'?'Ouvrir le Studio':'Open the Studio',detail:lang==='fr'?'Projets / Message / Feuille de route':'Projects / Message / Roadmap',href:'',action:requestStudio},
  ],[c,lang,currentPath]);
  const results = commands.filter(item=>matchesSearch(item.title+' '+item.detail+('search' in item?' '+item.search:''),query));
  const close = () => { dialog.current?.close(); setOpen(false); previousFocus.current?.focus(); };
  const show = () => { previousFocus.current=document.activeElement as HTMLElement; setQuery('');setSelected(0);setOpen(true); };
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(dialog.current?.open)dialog.current.close();else{previousFocus.current=document.activeElement as HTMLElement;setQuery('');setSelected(0);setOpen(true);}} };
    window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);
  },[]);
  useEffect(()=>{if(open&&dialog.current&&!dialog.current.open){dialog.current.showModal();input.current?.focus();}},[open]);
  useEffect(()=>{if(open)document.getElementById('command-'+selected)?.scrollIntoView({block:'nearest'});},[selected,open]);
  const run=(index:number)=>{const item=results[index];if(!item)return;close();if(item.action)item.action();else location.hash=item.href;};
  return <><button ref={trigger} className="command-trigger" onClick={show} aria-label={lang==='fr'?'Explorer, recherche rapide, Ctrl K':'Explore, quick search, Ctrl K'} aria-haspopup="dialog"><span>{lang==='fr'?'Explorer':'Explore'}</span><kbd>Ctrl K</kbd></button><dialog ref={dialog} className="command-dialog" aria-labelledby="command-title" onCancel={e=>{e.preventDefault();close();}} onClose={()=>{setOpen(false);previousFocus.current?.focus();}} onClick={e=>{if(e.target===e.currentTarget)close();}}><div className="command-surface"><div className="command-top"><h2 id="command-title">{lang==='fr'?'Où voulez-vous aller ?':'Where would you like to go?'}</h2><button onClick={close}>{c.close}</button></div><input ref={input} role="combobox" aria-label={lang==='fr'?'Rechercher une page, un projet ou un outil':'Search a page, project or tool'} aria-controls="command-results" aria-expanded={open} aria-autocomplete="list" aria-activedescendant={results[selected]?'command-'+selected:undefined} placeholder={lang==='fr'?'Un projet, SQL, Power BI, mon parcours…':'A project, SQL, Power BI, my background…'} value={query} onChange={e=>{setQuery(e.target.value);setSelected(0);}} onKeyDown={e=>{if(e.key==='ArrowDown'&&results.length){e.preventDefault();setSelected(i=>Math.min(i+1,results.length-1));}if(e.key==='ArrowUp'){e.preventDefault();setSelected(i=>Math.max(0,i-1));}if(e.key==='Enter'){e.preventDefault();run(selected);}}}/><div id="command-results" role="listbox" aria-label={lang==='fr'?'Résultats':'Results'}>{results.map((item,i)=><button key={item.id} id={'command-'+i} role="option" aria-selected={selected===i} className={selected===i?'selected':''} onPointerMove={()=>setSelected(i)} tabIndex={-1} onClick={()=>run(i)}><span>{item.title}</span><small>{item.detail}</small><span className="command-enter" aria-hidden="true">↵</span></button>)}</div>{!results.length&&<p className="command-empty">{lang==='fr'?'Aucun résultat. Essayez un outil ou un nom de projet.':'No results. Try a tool or project name.'}</p>}<div className="command-help"><span>{lang==='fr'?'↑ ↓ pour choisir, Entrée pour ouvrir':'↑ ↓ to select, Enter to open'}</span><span>{results.length} {lang==='fr'?'résultats':'results'}</span></div></div></dialog></>;
}
