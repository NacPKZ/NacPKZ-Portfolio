import { l } from '../../data/types';
import type { Lang, Localized } from '../../data/types';
import { copy } from '../../i18n/copy';
import { routeHref } from '../../utils/route';

interface FooterCopy {
  lead: Localized;
  ending: Localized;
  action: Localized;
  to: string;
  note: Localized;
}

const endings: Record<string, FooterCopy> = {
  home: {
    lead: l('De l’économie à la data,', 'From economics to data,'),
    ending: l('un parcours qui se construit.', 'a path taking shape.'),
    action: l('Découvrir mon parcours', 'Explore my background'), to: 'about',
    note: l('Stage de six mois en Île-de-France dès mars 2027.', 'Six-month internship in Île-de-France from March 2027.'),
  },
  work: {
    lead: l('Envie d’entrer dans les détails ?', 'Want to get into the details?'),
    ending: l('Parlons d’un projet.', 'Let’s talk about a project.'),
    action: l('Préparer un message', 'Draft a message'), to: 'contact',
    note: l('Trois questions métier, trois démarches documentées.', 'Three business questions, three documented approaches.'),
  },
  consultai: {
    lead: l('De la donnée à l’usage,', 'From data to practical use,'),
    ending: l('il faut aussi une base solide.', 'a solid foundation matters.'),
    action: l('Explorer l’entrepôt Olist', 'Explore the Olist warehouse'), to: 'work/olist',
    note: l('ConsultAI 360, une mission fictive de conseil Data et IA.', 'ConsultAI 360, a fictional data and AI consulting project.'),
  },
  olist: {
    lead: l('La base est posée.', 'The foundation is in place.'),
    ending: l('Place à la lecture métier.', 'Time to explore the business view.'),
    action: l('Découvrir le rapport NovaTel', 'Discover the NovaTel report'), to: 'work/novatel',
    note: l('Olist, un entrepôt construit à partir de données publiques.', 'Olist, a warehouse built from public data.'),
  },
  novatel: {
    lead: l('Derrière un départ client,', 'Behind a customer leaving,'),
    ending: l('une question à approfondir.', 'a question to investigate.'),
    action: l('Échanger sur NovaTel', 'Discuss NovaTel'), to: 'contact',
    note: l('NovaTel, une analyse descriptive de la fidélisation.', 'NovaTel, a descriptive analysis of customer retention.'),
  },
  about: {
    lead: l('La prochaine étape ?', 'The next step?'),
    ending: l('Un stage pour aller plus loin.', 'An internship to build on this.'),
    action: l('Me proposer une opportunité', 'Discuss an opportunity'), to: 'contact',
    note: l('Disponible dès mars 2027 pour six mois en Île-de-France.', 'Available from March 2027 for six months in Île-de-France.'),
  },
  contact: {
    lead: l('Merci pour la visite.', 'Thanks for stopping by.'),
    ending: l('Au plaisir d’échanger.', 'I look forward to talking.'),
    action: l('Revenir à l’accueil', 'Back to the home page'), to: '',
    note: l('Pour une opportunité, une question ou un premier échange.', 'For an opportunity, a question or a first conversation.'),
  },
};

export default function ContextFooter({ lang, page, id, links }: {
  lang: Lang; page: string; id?: string; links: {linkedin: string; github: string};
}) {
  const key = page === 'work' && id ? id : page === 'recruiter' ? 'about' : page;
  const content = endings[key] ?? endings.work;
  return <footer className="wrap site-footer" data-context={key}>
    <div>
      <p>{content.lead[lang]}<em>{content.ending[lang]}</em></p>
      <a className="text-link" href={routeHref(lang, content.to)}>{content.action[lang]}</a>
    </div>
    <div className="footer-bottom">
      <p>{content.note[lang]}</p>
      <nav aria-label={lang === 'fr' ? 'Liens utiles' : 'Useful links'}>
        <a href={routeHref(lang, 'contact')}>{copy[lang].contact}</a>
        <a href={links.linkedin}>LinkedIn</a><a href={links.github}>GitHub</a>
      </nav>
    </div>
  </footer>;
}
