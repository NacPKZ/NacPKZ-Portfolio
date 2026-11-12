import type { SeriesId } from '../data/series';
export type EggId=SeriesId;
export function requestStudio(){window.dispatchEvent(new Event('portfolio:studio'));}
export function requestEgg(id:EggId){window.dispatchEvent(new CustomEvent('portfolio:egg',{detail:id}));}
export function readLocal<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback;}catch{return fallback;}}
