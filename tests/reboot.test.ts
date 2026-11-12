import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { journeys } from '../src/data/journeys';
import { projects } from '../src/data/projects';
import { interfaceNames, identity } from '../src/data/identity';
describe('Public naming and exploration integrity',()=>{
 it('keeps canonical public identity and the approved section name',()=>{expect(identity.name).toBe('Can Pekgoz');expect(identity.github).toBe('NacPKZ');expect(interfaceNames.fr.references).toBe('Scène post-générique');});
 it('every itinerary has three existing distinct projects',()=>{for(const journey of journeys){expect(new Set(journey.ids).size).toBe(3);journey.ids.forEach(id=>expect(projects.some(p=>p.id===id)).toBe(true));}});
 it('motion loops contain multiple frames and have static counterparts',()=>{for(const id of ['wave','sort','grid','orbit','film','flow']){const gif=readFileSync('public/assets/loops/'+id+'.gif');expect(gif.subarray(0,6).toString()).toMatch(/^GIF8/);expect(gif.includes(Buffer.from('NETSCAPE2.0'))).toBe(true);expect(readFileSync('public/assets/loops/'+id+'.png').length).toBeGreaterThan(100);}});
});
