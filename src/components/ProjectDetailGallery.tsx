'use client';
import Image from 'next/image';
import { useState } from 'react';

const PAGE_SIZE = 36;

/** Render every available photo on demand, without a 24-photo hard limit. */
export default function ProjectDetailGallery({ name, photos }: { name: string; photos: string[] }) {
  const [show, setShow] = useState(PAGE_SIZE);
  return <>
    <p className="gallery-total">ภาพทั้งหมด {photos.length} ภาพ — เลื่อนเพื่อชมผลงาน</p>
    <div className="detail-gallery">{photos.slice(0, show).map((photo, index) =>
      <figure key={`${photo}-${index}`}><Image src={photo} alt={`โครงการ ${name} ภาพที่ ${index + 1}`}
        width={1500} height={1000} sizes="(max-width: 750px) 100vw, 50vw" loading="lazy" />
        <figcaption>{name} · {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</figcaption></figure>
    )}</div>
    {show < photos.length && <div className="gallery-load-more"><button type="button" className="btn btn-dark" onClick={() => setShow(n => n + PAGE_SIZE)}>
      ดูภาพเพิ่มเติม ({Math.min(PAGE_SIZE, photos.length - show)} ภาพ) ↓
    </button><p>แสดง {Math.min(show, photos.length)} จาก {photos.length} ภาพ</p></div>}
  </>;
}
