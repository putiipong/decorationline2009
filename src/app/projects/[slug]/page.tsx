import type { Metadata } from 'next';
import ProjectDetailGallery from '@/components/ProjectDetailGallery';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { getProjectWithPhotos } from '@/lib/drive';
import { categoryLabels } from '@/lib/types';

type Props = { params: Promise<{ slug: string }> };
export const dynamic = 'force-dynamic'; // Automatically recognize new folders without a redeploy.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProjectWithPhotos(slug);
  if (!p) return {};
  return { title: p.name, description: `ภาพผลงานโครงการ ${p.name} — หจก. เดคคอร์เรชั่น ไลน์ 2009`,
    openGraph: p.cover ? { images: [{ url: p.cover }] } : undefined };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectWithPhotos(slug);
  if (!project) notFound();
  return <>
    <SiteHeader />
    <main className="detail-page shell">
      <div className="detail-breadcrumb"><Link href="/">หน้าแรก</Link><span> / </span><Link href="/#works">ผลงาน</Link><span> / </span>{project.name}</div>
      <header className="detail-heading"><p className="section-number">PROJECT PORTFOLIO <span>—</span> {categoryLabels[project.category]}</p>
        <h1>{project.name}</h1><p>ผลงานจากคลังภาพโครงการของ หจก. เดคคอร์เรชั่น ไลน์ 2009</p></header>
      {project.photos.length > 0 ? <ProjectDetailGallery name={project.name} photos={project.photos} />
        : <div className="detail-empty">โครงการนี้ยังไม่มีรูปภาพที่พร้อมแสดง</div>}
      <Link href="/#works" className="detail-return">← กลับไปดูผลงานทั้งหมด</Link>
    </main>
    <SiteFooter />
  </>;
}
