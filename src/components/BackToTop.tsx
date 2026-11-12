import { useEffect, useState } from 'react';
import { useApp } from '../utils/context';
export default function BackToTop(){
 const {lang,reduced}=useApp();const [shown,setShown]=useState(false);
 useEffect(()=>{let frame=0;const onScroll=()=>{if(!frame)frame=requestAnimationFrame(()=>{setShown(scrollY>innerHeight);frame=0;});};window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(frame);};},[]);
 return <button className={'back-top'+(shown?' shown':'')} tabIndex={shown?0:-1} aria-hidden={!shown} aria-label={lang==='fr'?'Revenir en haut de page':'Back to top'} onClick={()=>{window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});document.getElementById('main')?.focus({preventScroll:true});}}><span aria-hidden="true">↑</span></button>;
}
