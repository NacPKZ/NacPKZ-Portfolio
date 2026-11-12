import {describe,it,expect} from 'vitest';
import {hands,resolveHand,sherlockHand,shuffle,memoryDeck,anomalies,pitchText,pitchOptions} from '../src/utils/games';
import {parseRoute} from '../src/utils/route';
describe('transparent three-round Sherlock challenge',()=>{
 it('resolves normal rock paper scissors rules',()=>{for(const h of hands)expect(resolveHand(h,h)).toBe('draw');expect(resolveHand('rock','scissors')).toBe('player');expect(resolveHand('paper','scissors')).toBe('sherlock');});
 it('always counters every hand, with neither a draw nor an invented point',()=>{for(const h of hands){const bot=sherlockHand(h);expect(resolveHand(h,bot)).toBe('sherlock');expect(bot).not.toBe(h);}expect(sherlockHand('rock')).toBe('paper');expect(sherlockHand('paper')).toBe('scissors');expect(sherlockHand('scissors')).toBe('rock');});
});
describe('memory deck',()=>{
 it('contains eight unique cards and exactly four pairs',()=>{const deck=memoryDeck();expect(new Set(deck.map(x=>x.id)).size).toBe(8);for(const symbol of new Set(deck.map(x=>x.symbol)))expect(deck.filter(x=>x.symbol===symbol)).toHaveLength(2);});
 it('shuffles without mutating or losing cards',()=>{const source=[1,2,3,4];expect(shuffle(source,()=>0)).toEqual([2,3,4,1]);expect(source).toEqual([1,2,3,4]);expect(shuffle([],()=>0)).toEqual([]);});
 it('rejects invalid randomness',()=>{expect(()=>shuffle([1,2],()=>1)).toThrow();});
});
describe('Tony’s fictional files',()=>{
 it('has one explained solution per case',()=>{for(const x of anomalies){expect(x.rows).toHaveLength(4);expect(x.rows[x.answer]).toBeTruthy();expect(x.why.fr.length).toBeGreaterThan(50);}});
 it('points to actual discrepancies',()=>{expect(anomalies[0].rows[anomalies[0].answer][0]).toBe(anomalies[0].rows[1][0]);expect(anomalies[1].rows[anomalies[1].answer][1]).toContain('−');expect(anomalies[2].rows[anomalies[2].answer]).toEqual(['8 / 40','25 %']);});
});
describe('editable pitch',()=>{
 it('builds a coherent bilingual message',()=>{for(const lang of ['fr','en'] as const){const text=pitchText(lang,[0,1,2]);expect(text).toContain(pitchOptions[lang][1][1]);expect(text.length).toBeGreaterThan(120);}});
 it('rejects missing and invalid reel values',()=>{expect(()=>pitchText('fr',[0,1])).toThrow();expect(()=>pitchText('fr',[0,4,1])).toThrow();});
});
describe('retired navigation',()=>{it('sends old lab and demo bookmarks to real projects',()=>{expect(parseRoute('#/fr/lab/wash')).toEqual({lang:'fr',page:'work',id:undefined});expect(parseRoute('#/en/work/washlab')).toEqual({lang:'en',page:'work',id:undefined});expect(parseRoute('#/fr/work/excel').id).toBe('excel');});});
