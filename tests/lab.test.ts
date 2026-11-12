import {describe,it,expect} from 'vitest';
import {simulateWash,washDefaults,auditEvidence,evidenceRows,evidenceSolutions,sqlQuestions} from '../src/utils/lab';
import {createMessage} from '../src/utils/contact';
describe('car wash capacity and economics',()=>{
 it('limits demand to actual service capacity',()=>{const r=simulateWash(washDefaults);expect(r.capacityPerHour).toBe(15);expect(r.served).toBe(120);expect(r.turnedAway).toBe(24);expect(r.revenue).toBe(1800);expect(r.costs).toBe(640);expect(r.profit).toBe(1160);});
 it('does not invent customers when demand is low',()=>{const r=simulateWash({...washDefaults,arrivals:1,lanes:6});expect(r.served).toBe(8);expect(r.turnedAway).toBe(0);expect(r.profit).toBeLessThan(0);});
 it('handles zero demand and nonpositive unit margin',()=>{const empty=simulateWash({...washDefaults,arrivals:0});expect(empty.served).toBe(0);expect(empty.minimumPrice).toBeNull();expect(empty.profit).toBe(-280);expect(simulateWash({...washDefaults,price:2,variable:3}).breakEvenWashes).toBeNull();});
 it('rejects impossible inputs instead of returning infinity',()=>{expect(()=>simulateWash({...washDefaults,minutes:0})).toThrow();expect(()=>simulateWash({...washDefaults,arrivals:NaN})).toThrow();expect(()=>simulateWash({...washDefaults,price:-1})).toThrow();});
 it('the extra lane earns its incremental cost only when demand supports it',()=>{const base=simulateWash({...washDefaults,arrivals:30});const extra=simulateWash({...washDefaults,arrivals:30,lanes:3});expect(extra.served-base.served).toBe(60);expect(extra.profit-base.profit).toBe(620);});
});
describe('detective exercise and workshop',()=>{
 it('counts a missing customer as a quality issue while retaining paid revenue',()=>{expect(auditEvidence()).toEqual({raw:750,revenue:505,anomalies:4});expect(evidenceRows.filter(row=>row.order==='A102')).toHaveLength(2);expect(evidenceSolutions['05'].en).toContain('sale remains valid');});
 it('provides a valid answer and explanation for every workshop question',()=>{for(const question of sqlQuestions){expect(question.choices[question.correct]).toBeTruthy();expect(question.whyFr.length).toBeGreaterThan(50);}});
});
describe('real email composition links',()=>{
 it('encodes accents, line endings and punctuation in a complete addressed email',()=>{const draft=createMessage('fr','project','Échange & test ?','Léa','Olist');expect(draft.mailto.startsWith('mailto:canpekgoz.pro@gmail.com?')).toBe(true);const url=new URL(draft.mailto);expect(url.searchParams.get('subject')).toContain('Olist');expect(url.searchParams.get('body')).toContain('Échange & test ?');expect(url.searchParams.get('body')).toContain('\r\n');expect(url.searchParams.get('body')).toContain('Léa');});
 it('offers matching Gmail and Outlook fallback drafts',()=>{const d=createMessage('en','stage');expect(new URL(d.gmail).searchParams.get('to')).toBe('canpekgoz.pro@gmail.com');expect(new URL(d.outlook).searchParams.get('subject')).toBe(d.subject);expect(new URL(d.gmail).searchParams.get('body')).toContain('internship');});
 it('cannot inject a second mail header through a project name',()=>{const d=createMessage('en','project','','','X\r\nBcc: victim@example.com');expect(new URL(d.mailto).searchParams.get('subject')).not.toMatch(/[\r\n]/);expect(new URL(d.mailto).searchParams.has('bcc')).toBe(false);});
});
describe('whole-customer capacity',()=>{it('rounds daily capacity down before calculating revenue',()=>{const r=simulateWash({...washDefaults,lanes:1,minutes:7,arrivals:50});expect(r.served).toBe(68);expect(Number.isInteger(r.turnedAway)).toBe(true);expect(r.revenue).toBe(68*washDefaults.price);});});
