import { identity } from '../data/identity';
import type { Lang } from '../data/types';
export type ContactTopic='stage'|'project'|'hello';
export const contactTopics={fr:{stage:'Proposer un stage',project:'Parler d’un projet',hello:'Faire connaissance'},en:{stage:'Discuss an internship',project:'Discuss a project',hello:'Say hello'}};
export function createMessage(lang:Lang,topic:ContactTopic,note='',name='',project=''){
 const subjects={fr:{stage:'Proposition de stage pour Can Pekgoz',project:'Échange autour d’un projet',hello:'Faisons connaissance'},en:{stage:'Internship opportunity for Can Pekgoz',project:'Let’s discuss a project',hello:'Let’s connect'}};
 const intros=lang==='fr'?{stage:'Je vous contacte au sujet d’une opportunité de stage. Voici le contexte, les missions et la date de début envisagée :',project:'J’aimerais échanger avec vous autour d’un projet. Voici mon idée ou ma question :',hello:'J’ai découvert votre portfolio et j’aimerais faire connaissance. Voici ce qui m’a donné envie de vous écrire :'}:{stage:'I’m reaching out about an internship opportunity. Here are the context, responsibilities and proposed start date:',project:'I’d like to discuss a project with you. Here is my idea or question:',hello:'I discovered your portfolio and would like to connect. Here is what caught my attention:'};
 const subject=subjects[lang][topic]+(project?' / '+project:'');
 const body=[lang==='fr'?'Bonjour Can,':'Hi Can,',intros[topic],note.trim()||(lang==='fr'?'[À compléter avant l’envoi]':'[Complete before sending]'),project?(lang==='fr'?'Projet consulté : ':'Project viewed: ')+project:'',lang==='fr'?'Bonne journée,':'Best regards,',name.trim()||(lang==='fr'?'[Votre nom]':'[Your name]')].filter(Boolean).join('\n\n');
 const encodedSubject=encodeURIComponent(subject.replace(/[\r\n]/g,' '));const encodedBody=encodeURIComponent(body.replace(/\n/g,'\r\n'));
 return{subject,body,mailto:`mailto:${identity.email}?subject=${encodedSubject}&body=${encodedBody}`,gmail:`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(identity.email)}&su=${encodedSubject}&body=${encodedBody}`,outlook:`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(identity.email)}&subject=${encodedSubject}&body=${encodedBody}`};
}
