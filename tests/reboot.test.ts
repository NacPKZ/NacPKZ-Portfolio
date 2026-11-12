import { describe, expect, it } from 'vitest';
import { journeys } from '../src/data/journeys';
import { projects } from '../src/data/projects';
import { interfaceNames, identity } from '../src/data/identity';
describe('Public naming and exploration integrity',()=>{
 it('keeps canonical public identity and the approved section name',()=>{expect(identity.name).toBe('Can Pekgoz');expect(identity.github).toBe('NacPKZ');expect(interfaceNames.fr.references).toBe('Univers');});
 it('every itinerary has three existing distinct projects',()=>{for(const journey of journeys){expect(new Set(journey.ids).size).toBe(3);journey.ids.forEach(id=>expect(projects.some(p=>p.id===id)).toBe(true));}});
});
