import { createContext, useContext } from 'react';
import type { Lang } from '../data/types';
import type { Copy } from '../i18n/copy';
import type { Route } from './route';
interface Context { lang: Lang; c: Copy; route: Route; reduced: boolean; setReduced: (v: boolean) => void }
export const AppContext = createContext<Context | null>(null);
export function useApp() { const value = useContext(AppContext); if (!value) throw new Error('App context missing'); return value; }
