import type { Project } from '../data/types';
import { asset } from '../utils/route';
export default function ProjectVisual({project}:{project:Project}){const capture=project.images?.[0];const src=capture?'assets/projects/'+capture.src+'.webp':'assets/editorial/'+project.id+'.webp';return <img src={asset(src)} alt="" width="1200" height="750" loading="lazy"/>;}
