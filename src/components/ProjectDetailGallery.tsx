'use client';
import { useState } from 'react';

function Photo({ src, name, index, total }: { src: string; name: string; index: number; total: number }) {
  const [failed, setFailed] = useState(false);
  return <figure className="project-gallery-photo">
    {failed ? <div className="drive-image-error" role="status">ไม่สามารถเปิดภาพที่ {index + 1} ได้<br /><small>ตรวจสอบไฟล์ต้นฉบับหรือหน้า Drive Status</small></div> :
      // The image endpoint already returns an optimized, authenticated WebP.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={`โครงการ ${name} ภาพที่ ${index + 1}`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />}
    <figcaption>{name} · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</figcaption>
  </figure>;
}
/** All images are in the page; browser native lazy loading fetches them on scroll.
 * No Show More button hides the remaining files. */
export default function ProjectDetailGallery({ name, photos }: { name: string; photos: string[] }) {
  return <>
    <p className="gallery-total">รายละเอียดและบรรยากาศของโครงการ · {photos.length} ภาพ</p>
    <div className="detail-gallery">{photos.map((photo, index) =>
      <Photo key={photo} src={photo} name={name} index={index} total={photos.length} />
    )}</div>
  </>;
}
