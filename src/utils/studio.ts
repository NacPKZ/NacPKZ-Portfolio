export function requestStudio(){window.dispatchEvent(new Event('portfolio:studio'));}
export function readLocal<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback;}catch{return fallback;}}
