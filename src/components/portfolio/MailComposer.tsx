import { useState } from 'react';
import { identity } from '../../data/identity';
import { createMessage, contactTopics } from '../../utils/contact';
import type { ContactTopic } from '../../utils/contact';
import type { Lang } from '../../data/types';

export interface Draft {
  topic: ContactTopic;
  subject: string;
  body: string;
  edited: boolean;
}

export default function MailComposer({lang, draft, onChange}: {lang: Lang; draft: Draft | null; onChange: (draft: Draft) => void}) {
  const fr = lang === 'fr';
  const [feedback, setFeedback] = useState('');
  const seed = createMessage(lang, draft?.topic ?? 'stage');
  const current = draft?.edited ? draft : {topic:draft?.topic ?? 'stage' as ContactTopic, subject:seed.subject, body:seed.body, edited:false};
  const setField = (field: 'subject'|'body', value: string) => {
    onChange({...current, [field]:value, edited:true});
    setFeedback('');
  };
  const choose = (topic: ContactTopic) => {
    if (current.edited) onChange({...current,topic});
    else {
      const next = createMessage(lang, topic);
      onChange({topic,subject:next.subject,body:next.body,edited:false});
    }
    setFeedback('');
  };
  const subject = encodeURIComponent(current.subject.replace(/[\r\n]/g, ' '));
  const body = encodeURIComponent(current.body.replace(/\r?\n/g,'\r\n'));
  const mailto = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(identity.email)}&su=${subject}&body=${body}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(identity.email)}&subject=${subject}&body=${body}`;
  const ready = !!current.subject.trim() && !!current.body.trim();
  return <div className="mail-workspace">
    <div className="mail-topics" role="group" aria-label={fr ? 'Motif du message' : 'Message topic'}>
      {Object.entries(contactTopics[lang]).map(([key,label]) => <button key={key} onClick={() => choose(key as ContactTopic)} aria-pressed={current.topic === key}>{label}</button>)}
    </div>
    <form className="mail-editor" onSubmit={event => {event.preventDefault();if(ready)location.href=mailto;}}>
      <div className="mail-toolbar"><span className="mail-stamp" aria-hidden="true"/><h2>{fr ? 'Nouveau message' : 'New message'}</h2><span className="mail-draft-label">{fr ? 'Brouillon' : 'Draft'}</span></div>
      <div className="mail-line"><span>{fr ? 'À' : 'To'}</span><a href={'mailto:'+identity.email}>{identity.email}</a></div>
      <label className="mail-line"><span>{fr ? 'Objet' : 'Subject'}</span><input name="subject" required maxLength={180} value={current.subject} onChange={event => setField('subject',event.target.value)} /></label>
      <label className="sr-only" htmlFor="mail-body">{fr ? 'Votre message' : 'Your message'}</label>
      <textarea id="mail-body" name="message" required maxLength={5000} value={current.body} onChange={event => setField('body',event.target.value)} spellCheck />
      <div className="mail-actions">
        <button className="button primary" type="submit" disabled={!ready}>{fr ? 'Ouvrir ma messagerie' : 'Open my email app'}</button>
        <button type="button" className="button ghost" onClick={async () => {
          try {
            await navigator.clipboard.writeText(current.subject+'\n\n'+current.body);
            setFeedback(fr ? 'Le message a été copié.' : 'Message copied.');
          } catch { setFeedback(fr ? 'Sélectionnez le texte du brouillon pour le copier.' : 'Select the draft text to copy it.'); }
        }}>{fr ? 'Copier' : 'Copy'}</button>
        <button type="button" className="mail-reset" onClick={() => {onChange({...current, subject:seed.subject,body:seed.body,edited:false});setFeedback('');}}>{fr ? 'Recommencer' : 'Start again'}</button>
      </div>
    </form>
    <div className="mail-alternatives"><span>{fr ? 'Ou préparer ce message dans' : 'Or prepare this message in'}</span><a href={gmail} target="_blank" rel="noreferrer">Gmail</a><a href={outlook} target="_blank" rel="noreferrer">Outlook</a></div>
    <p className="mail-explanation">{fr ? 'Modifiez librement l’objet et le texte. Votre messagerie s’ouvre avec le brouillon et vous confirmez l’envoi.' : 'Edit the subject and message freely. Your email app opens with the draft, and you confirm sending.'}</p>
    <p className="mail-feedback" role="status">{feedback}</p>
  </div>;
}
