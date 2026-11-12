import { useState } from 'react';
import { useApp } from '../utils/context';
export default function ProjectShare({title}:{title:string}){const {lang}=useApp();const [feedback,setFeedback]=useState('');
 const copy=async()=>{try{await navigator.clipboard.writeText(location.href);setFeedback(lang==='fr'?'Lien du projet copié.':'Project link copied.');}catch{setFeedback(lang==='fr'?'Copiez l’adresse dans la barre du navigateur.':'Copy the address from your browser bar.');}};
 const share=async()=>{if(!navigator.share){await copy();return;}try{await navigator.share({title:title+' | Can Pekgoz',url:location.href});setFeedback(lang==='fr'?'Partage terminé.':'Shared.');}catch(error){if(!(error instanceof DOMException&&error.name==='AbortError'))await copy();}};
 return <div className="project-share"><button onClick={()=>void copy()}>{lang==='fr'?'Copier le lien du projet':'Copy project link'}</button><button onClick={()=>void share()}>{lang==='fr'?'Partager':'Share'}</button><span role="status">{feedback}</span></div>;
}
