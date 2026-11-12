import {describe,it,expect} from 'vitest';
import {gusResponse,codeFeedback,secretCode,signalResult,timingPosition,timingScore} from '../src/utils/arcade';
import {parseTheme,themes} from '../src/utils/themes';
import {gameCatalog,isGameKind} from '../src/data/gameCatalog';
describe('Gus plays a mathematically winning strategy',()=>{
 it('wins against every possible visitor sequence from twelve tokens',()=>{let paths=0;const visit=(remaining:number)=>{for(let take=1;take<=3;take++){expect(remaining).toBeGreaterThan(take);const after=remaining-take;const bot=gusResponse(after);expect(bot).toBeGreaterThan(0);expect(bot).toBeLessThanOrEqual(3);const rest=after-bot;expect(rest%4).toBe(0);if(rest===0)paths++;else visit(rest);}};visit(12);expect(paths).toBe(27);});
 it('rejects an exhausted board and fractional counts',()=>{expect(()=>gusResponse(0)).toThrow();expect(()=>gusResponse(1.2)).toThrow();});
});
describe('Logan’s code clues',()=>{
 it('separates exact positions from misplaced values',()=>{expect(codeFeedback([1,2,3],[1,3,2])).toEqual({exact:1,misplaced:2});expect(codeFeedback([1,2,3],[1,2,3])).toEqual({exact:3,misplaced:0});});
 it('does not double-count repeated digits',()=>{expect(codeFeedback([1,1,2],[1,2,2])).toEqual({exact:2,misplaced:0});expect(codeFeedback([1,2,3],[4,4,4])).toEqual({exact:0,misplaced:0});});
 it('validates the input and generated range',()=>{expect(()=>codeFeedback([1,2],[1,2,3])).toThrow();expect(()=>codeFeedback([1,2,3],[1,2,9])).toThrow();for(let i=0;i<20;i++)expect(secretCode().every(n=>n>=1&&n<=4)).toBe(true);});
});
describe('Walter’s signal sequence',()=>{
 it('accepts only the correct prefix and full sequence',()=>{expect(signalResult([1,0,3],[1],3)).toBe('continue');expect(signalResult([1,0,3],[1,0,3],3)).toBe('complete');expect(signalResult([1,0,3],[1,3],3)).toBe('wrong');});
 it('rejects an impossible round length',()=>{expect(()=>signalResult([1,2],[1],4)).toThrow();});
});
describe('Tyrion’s timing score',()=>{
 it('matches the visible back-and-forth marker at known times',()=>{expect(timingPosition(0)).toBe(0);expect(timingPosition(600)).toBe(.5);expect(timingPosition(1200)).toBe(1);expect(timingPosition(1800)).toBe(.5);expect(timingPosition(2400)).toBe(0);});
 it('scores the centre best and both ends equally',()=>{expect(timingScore(.5)).toBe(100);expect(timingScore(0)).toBe(0);expect(timingScore(1)).toBe(0);expect(timingScore(.4)).toBe(timingScore(.6));});
 it('rejects invalid timings',()=>{expect(()=>timingPosition(NaN)).toThrow();expect(()=>timingScore(1.1)).toThrow();});
});
describe('game library and theme preference',()=>{
 it('offers eight distinct characters and valid direct game IDs',()=>{expect(Object.keys(gameCatalog)).toHaveLength(8);expect(new Set(Object.values(gameCatalog).map(g=>g.character)).size).toBe(8);expect(isGameKind('pitch')).toBe(true);expect(isGameKind('__proto__')).toBe(false);expect(isGameKind('unknown')).toBe(false);});
 it('has exactly three themes and uses normal for invalid saved data',()=>{expect(themes).toHaveLength(3);expect(parseTheme(null)).toBe('normal');expect(parseTheme('bad')).toBe('normal');expect(parseTheme('amber')).toBe('amber');});
});
