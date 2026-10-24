'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryLabels, type Category, type PublicProject } from '@/lib/types';

const filters: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'residential', label: 'ที่พักอาศัย' },
  { value: 'commercial', label: 'เชิงพาณิชย์' },
  { value: 'hotel', label: 'โรงแรม' },
  { value: 'exterior', label: 'งานภายนอก' },
  { value: 'highlights', label: 'ภาพไฮไลต์' },
];

export default function ProjectGallery({ projects }: { projects: PublicProject[] }) {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [selected, setSelected] = useState<PublicProject | null>(null);
  const [index, setIndex] = useState(0);
  const closeButton = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const list = projects.filter(p => filter === 'all' || p.category === filter);

  const close = useCallback(() => { setSelected(null); lastTrigger.current?.focus(); }, []);
  const step = useCallback((amount: number) => {
    if (selected?.photos.length) setIndex(n => (n + amount + selected.photos.length) % selected.photos.length);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    document.body.classList.add('modal-open');
    closeButton.current?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
      else if (event.key === 'Tab') {
        // Keep keyboard focus within the open dialog.
        const dialog = document.querySelector<HTMLElement>('.modal-panel');
        if (!dialog) return;
        const focusable = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)')];
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handle);
    return () => { document.body.classList.remove('modal-open'); document.removeEventListener('keydown', handle); };
  }, [selected, close, step]);

  function open(project: PublicProject, trigger: HTMLButtonElement) {
    if (!project.photos.length) return;
    lastTrigger.current = trigger;
    setIndex(0);
    setSelected(project);
  }

  return <>
    <section className="portfolio" id="works"><div className="shell">
      <div className="section-number">02 <span>—</span> SELECTED PROJECTS</div>
      <div className="section-head"><div><h2>ผลงาน<span>ของเรา</span></h2><p>ค้นพบพื้นที่ในแบบที่คุณชอบ เลือกประเภทงานแล้วเปิดชมรายละเอียดในแต่ละโครงการ</p></div>
        <div className="count-caption"><strong aria-live="polite">{list.length}</strong><span>โครงการที่เลือกชม</span></div></div>
      <div className="filter-bar" role="group" aria-label="กรองประเภทผลงาน">
        {filters.map(f => <button key={f.value} type="button" className={`filter ${filter === f.value ? 'active' : ''}`}
          aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>{f.label}</button>)}
      </div>
      <div className="project-grid" aria-live="polite">
        {list.map((p, i) => <div className="project-entry" key={p.id}>
          <button className="project-card" type="button" disabled={!p.photos.length}
            aria-label={p.photos.length ? `เปิดภาพผลงานโครงการ ${p.name}` : `${p.name} ยังไม่มีภาพที่พร้อมแสดง`}
            onClick={e => open(p, e.currentTarget)}>
            <span className="project-photo">
              {p.cover ? <Image src={p.cover} alt={`ภาพผลงานโครงการ ${p.name}`} fill sizes="(max-width: 380px) 100vw, 50vw" /> :
                <span className="photo-placeholder"><span>DL<span className="accent-dot">.</span></span><small>กำลังจัดเตรียมภาพ</small></span>}
              <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
            </span>
            <span className="project-info"><span><strong className="project-title">{p.name}</strong><small>{categoryLabels[p.category]} · {p.photos.length} ภาพ</small></span><span className="project-arrow">↗</span></span>
          </button>
          <Link className="project-detail-link" href={`/projects/${p.id}`}>ดูหน้าโครงการ ↗</Link>
        </div>)}
      </div>
      {list.length === 0 && <p className="gallery-empty">ยังไม่มีผลงานในหมวดนี้ ลองเลือกชมผลงานในหมวดอื่นได้เลย</p>}
      <p className="portfolio-footnote">ทุกพื้นที่มีรายละเอียดให้ค้นพบ คลิกภาพเพื่อชมแกลเลอรี หรือเลือกดูหน้าโครงการ</p>
    </div></section>
    {selected && <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
      <button type="button" className="modal-backdrop" onClick={close} tabIndex={-1} aria-label="ปิดแกลเลอรี" />
      <div className="modal-panel">
        <div className="modal-heading"><div><span>{categoryLabels[selected.category]}</span><h2 id="gallery-title">{selected.name}</h2></div>
          <button ref={closeButton} className="close-modal" type="button" aria-label="ปิดแกลเลอรี" onClick={close}>✕</button></div>
        <div className="modal-photo-wrap">
          <button className="photo-arrow" type="button" disabled={selected.photos.length < 2} aria-label="ภาพก่อนหน้า" onClick={() => step(-1)}>←</button>
          <Image key={selected.photos[index]} src={selected.photos[index]} alt={`${selected.name} ภาพที่ ${index + 1}`} width={1400} height={900}
            sizes="(max-width: 800px) 100vw, 960px" className="gallery-full-image" />
          <button className="photo-arrow" type="button" disabled={selected.photos.length < 2} aria-label="ภาพถัดไป" onClick={() => step(1)}>→</button>
        </div>
        <div className="modal-bottom"><span>{String(index + 1).padStart(2, '0')} / {String(selected.photos.length).padStart(2, '0')}</span>
          <Link href={`/projects/${selected.id}`} onClick={close}>ดูรายละเอียดโครงการ ↗</Link></div>
      </div>
    </div>}
  </>;
}
