import { useEffect, useState } from 'react';
import { useApp } from '../utils/context';
export default function ChapterNav({ chapters }: { chapters:{id:string;label:string}[] }) {
  const { reduced,lang }=useApp();
  const [active,setActive]=useState(0);
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    let frame=0;
    const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;setVisible(scrollY>280);let current=0;chapters.forEach((chapter,i)=>{if((document.getElementById(chapter.id)?.getBoundingClientRect().top??Infinity)<innerHeight*.45)current=i;});setActive(current);});};
    window.addEventListener('scroll',update,{passive:true});update();return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);};
  },[chapters]);
  return <nav className={'chapter-nav'+(visible?' is-visible':'')} aria-label={lang==='fr'?'Chapitres de l’étude de cas':'Case study chapters'} inert={!visible}><span className="chapter-count">{String(active+1).padStart(2,'0')} / {String(chapters.length).padStart(2,'0')}</span><div>{chapters.map((chapter,i)=><button key={chapter.id} className={active===i?'selected':''} aria-current={active===i?'location':undefined} onClick={()=>{const target=document.getElementById(chapter.id);target?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});target?.focus({preventScroll:true});}}>{chapter.label}</button>)}</div></nav>;
}
