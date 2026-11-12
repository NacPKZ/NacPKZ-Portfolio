import {describe,it,expect} from 'vitest';
import {existsSync,readFileSync} from 'node:fs';
import {projects} from '../src/data/projects';
import {series} from '../src/data/series';
describe('all visible cards have real local media',()=>{
 it('covers every project, including the ten cards without captures',()=>{for(const project of projects){const path=project.images?.[0]?'public/assets/projects/'+project.images[0].src+'.webp':'public/assets/editorial/'+project.id+'.webp';expect(existsSync(path),path).toBe(true);expect(readFileSync(path).length,path).toBeGreaterThan(1000);}});
 it('provides genuine animated GIFs and reduced-motion posters',()=>{for(const item of series.filter(s=>s.file)){const gif=readFileSync('public/assets/series/'+item.file+'.gif');expect(gif.subarray(0,6).toString()).toMatch(/^GIF8/);expect(gif.length).toBeLessThan(2_000_000);expect(existsSync('public/assets/series/'+item.file+'-poster.webp')).toBe(true);}});
});
