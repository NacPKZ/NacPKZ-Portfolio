import {describe,it,expect} from 'vitest';
import {createMessage} from '../src/utils/contact';
describe('real email composition links',()=>{
 it('encodes accents, line endings and punctuation in a complete addressed email',()=>{const draft=createMessage('fr','project','Échange & test ?','Léa','Olist');expect(draft.mailto.startsWith('mailto:canpekgoz.pro@gmail.com?')).toBe(true);const url=new URL(draft.mailto);expect(url.searchParams.get('subject')).toContain('Olist');expect(url.searchParams.get('body')).toContain('Échange & test ?');expect(url.searchParams.get('body')).toContain('\r\n');expect(url.searchParams.get('body')).toContain('Léa');});
 it('offers matching Gmail and Outlook fallback drafts',()=>{const d=createMessage('en','stage');expect(new URL(d.gmail).searchParams.get('to')).toBe('canpekgoz.pro@gmail.com');expect(new URL(d.outlook).searchParams.get('subject')).toBe(d.subject);expect(new URL(d.gmail).searchParams.get('body')).toContain('internship');});
 it('cannot inject a second mail header through a project name',()=>{const d=createMessage('en','project','','','X\r\nBcc: victim@example.com');expect(new URL(d.mailto).searchParams.get('subject')).not.toMatch(/[\r\n]/);expect(new URL(d.mailto).searchParams.has('bcc')).toBe(false);});
});
