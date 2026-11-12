import {describe,it,expect} from 'vitest';
import {existsSync,readFileSync} from 'node:fs';
import {projects} from '../src/data/projects';
describe('all visible cards have real local media',()=>{
 it('covers every project, including cards without captures',()=>{for(const project of projects){const path=project.images?.[0]?'public/assets/projects/'+project.images[0].src+'.webp':'public/assets/editorial/'+project.id+'.webp';expect(existsSync(path),path).toBe(true);expect(readFileSync(path).length,path).toBeGreaterThan(1000);}});
});
