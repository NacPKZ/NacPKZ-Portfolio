import { createMessage, contactTopics } from '../utils/contact';
import type { ContactTopic } from '../utils/contact';
import ContactDraft from '../components/ContactDraft';
import { useState } from 'react';
import { useApp } from '../utils/context';
import { External, Eyebrow } from '../components/UI';
export default function Contact({ compact = false }: { compact?: boolean }) {
  const { c,lang } = useApp();
  const [message, setMessage] = useState('');
  async function copyEmail() { try { await navigator.clipboard.writeText('canpekgoz.pro@gmail.com'); setMessage(c.copied); } catch { setMessage(c.copyFail); } }
  return <section className={`contact-section wrap${compact ? ' compact' : ' contact-page'}`} id="contact"><Eyebrow>{c.contactPre}</Eyebrow><h1 className="display" hidden={compact}>{c.contactTitle}<br /><em>{c.contactItalic}</em></h1>{compact && <h2 className="display">{c.contactTitle}<br /><em>{c.contactItalic}</em></h2>}<div className="contact-grid"><div><p>{c.contactDesc}</p><span className="availability"><span className="status-light" />{c.availability}</span></div><div className="contact-links"><a href="mailto:canpekgoz.pro@gmail.com" className="email-link">canpekgoz.pro@gmail.com</a><div className="contact-social"><External href="https://www.linkedin.com/in/can-pekgoz/">LinkedIn</External><External href="https://github.com/NacPKZ">GitHub</External><button onClick={() => void copyEmail()}>{c.copyEmail}</button></div><p className="copy-feedback" role="status">{message}</p></div></div>{!compact&&<><div className="contact-shortcuts">{Object.entries(contactTopics[lang]).map(([key,label])=><a key={key} href={createMessage(lang,key as ContactTopic).mailto}>{label}</a>)}</div><ContactDraft/></>}</section>;
}
