import { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/types';
import { useApp } from '../utils/context';
import { asset } from '../utils/route';
import { Arrow, Eyebrow } from './UI';
export default function Gallery({ images, title }: { images: NonNullable<Project['images']>; title: string }) {
  const { c, lang } = useApp();
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (zoom && dialog.current && !dialog.current.open) dialog.current.showModal();
    if (!zoom && dialog.current?.open) dialog.current.close();
  }, [zoom]);
  const step = (delta: number) => setIndex(i => (i + delta + images.length) % images.length);
  const close = () => { setZoom(false); trigger.current?.focus(); };
  const img = images[index];
  return <section id="case-gallery" tabIndex={-1} className="gallery-section"><div className="wrap"><div className="section-heading"><div><Eyebrow>{c.originalCapture}</Eyebrow><h2 className="section-title">{c.gallery}</h2></div><span className="micro">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div><button ref={trigger} className="gallery-main" onClick={() => setZoom(true)} aria-label={c.enlarge + ' : ' + title}><img key={img.src} src={asset('assets/projects/' + img.src + '.webp')} alt={img.caption[lang]} loading="lazy" width="2000" height={title === 'Olist' ? '3200' : '1130'} /><span className="gallery-enlarge">{c.enlarge}<Arrow essential diagonal /></span></button><div className="gallery-caption"><div aria-live="polite"><p>{img.caption[lang]}</p><small>{c.originalFrench}</small></div>{images.length > 1 && <div className="gallery-controls"><button onClick={() => step(-1)} aria-label={c.previous}><Arrow essential className="reverse" /></button><button onClick={() => step(1)} aria-label={c.next}><Arrow essential /></button></div>}</div>{images.length > 1 && <div className="gallery-strip" role="group" aria-label={c.gallery}>{images.map((item, i) => <button key={item.src} aria-label={`${String(i + 1).padStart(2, '0')}. ${item.caption[lang]}`} aria-pressed={i === index} className={i === index ? 'selected' : ''} onClick={() => setIndex(i)}><img src={asset('assets/projects/' + item.src + '.webp')} alt="" width="160" height="90" loading="lazy" /><span>0{i + 1}</span></button>)}</div>}</div><dialog className="lightbox" ref={dialog} onClose={close} onCancel={() => setZoom(false)} onClick={e => { if (e.target === e.currentTarget) close(); }} onKeyDown={e => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } }} aria-label={title + ' / ' + c.gallery}><div className="lightbox-inner"><div className="lightbox-toolbar"><span>{title} / {index + 1} / {images.length}</span><button onClick={close}>{c.close} <span aria-hidden="true">×</span></button></div>{zoom && <img key={img.src} src={asset('assets/projects/' + img.src + '.webp')} alt={img.caption[lang]} />}<p>{img.caption[lang]}</p><div className="gallery-controls">{images.length > 1 && <><button onClick={() => step(-1)} aria-label={c.previous}><Arrow essential className="reverse" /></button><button onClick={() => step(1)} aria-label={c.next}><Arrow essential /></button></>}</div><small>{c.galleryHelp}</small></div></dialog></section>;
}
