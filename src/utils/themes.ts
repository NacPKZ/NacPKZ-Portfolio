export const themes=['normal','frost','amber'] as const;
export type Theme=(typeof themes)[number];
export function parseTheme(value:string|null):Theme{return themes.includes(value as Theme)?value as Theme:'normal';}
