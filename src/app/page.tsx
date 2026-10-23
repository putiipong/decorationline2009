import Image from 'next/image';
import Link from 'next/link';
import ProjectGallery from '@/components/ProjectGallery';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { getProjectsWithPhotos } from '@/lib/drive';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const projects = await getProjectsWithPhotos();
  const featured = projects.find(p => p.cover) || projects[0];
  return <>
    <a className="skip-link" href="#works">ข้ามไปที่ผลงาน</a>
    <SiteHeader />
    <main>
      <section className="hero"><div className="hero-grid shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> DECORATION LINE 2009</p>
          <h1>Spaces made<br /><em>to matter.</em></h1>
          <p className="hero-lead">ทุกพื้นที่มีเรื่องราวของตัวเอง</p>
          <p className="hero-desc">รวมภาพผลงานจากโครงการจริง ทั้งพื้นที่พักอาศัย ร้านค้า และพื้นที่เชิงพาณิชย์ ถ่ายทอดรายละเอียดของแต่ละงานผ่านภาพถ่าย</p>
          <div className="hero-buttons"><a className="btn btn-dark" href="#works">ชมผลงานทั้งหมด <span>↗</span></a>
            <a className="text-link" href="#about">รู้จักเรา <span>→</span></a></div>
          <div className="hero-meta"><span>SELECTED WORKS</span><strong>{projects.length}</strong><span>PROJECT FOLDERS</span></div>
        </div>
        <div className="hero-visual"><Image src={featured?.cover || "/assets/boulevard-rama5-1.webp"} alt={`ภาพผลงานตกแต่งจากโครงการ ${featured?.name || "Boulevard Rama 5"}`}
          fill priority sizes="(max-width: 760px) 100vw, 52vw" />
          <div className="hero-image-tag"><span>01 / FEATURED WORK</span><strong>{featured?.name || "BOULEVARD RAMA 5"}</strong></div></div>
      </div><div className="hero-side-label">DECORATION · INTERIOR · SPACES</div></section>
      <section className="intro shell" id="about"><div className="section-number">01 <span>—</span> ABOUT US</div>
        <div className="intro-body"><h2>เรื่องราวที่เล่าผ่าน<br /><span>รายละเอียดของพื้นที่</span></h2><div>
          <p>หจก. เดคคอร์เรชั่น ไลน์ 2009</p><p className="muted">เว็บไซต์นี้รวบรวมผลงานจากโฟลเดอร์โครงการของบริษัท เพื่อให้สามารถเลือกชมลักษณะงานและรายละเอียดภาพได้สะดวกในที่เดียว</p>
          <Link className="underlined" href="/#works">เลือกชมโครงการ <span>↗</span></Link>
        </div></div></section>
      <ProjectGallery projects={projects} />
      <section className="quote-band"><div className="shell"><span>DETAILS MAKE THE DIFFERENCE</span><p>ภาพผลงานจริง คือส่วนหนึ่งของเรื่องราวที่ดีที่สุดของทุกโครงการ</p></div></section>
      <section className="approach shell" id="approach"><div className="section-number">03 <span>—</span> OUR PROCESS</div>
        <div className="approach-main"><h2>โครงการต่างกัน<br /><em>รายละเอียดก็ต่างกัน</em></h2><div className="approach-list">
          <div><span>01</span><div><strong>ทำความเข้าใจความต้องการ</strong><p>เริ่มจากโจทย์ของพื้นที่และการใช้งาน</p></div></div>
          <div><span>02</span><div><strong>ให้ความสำคัญกับรายละเอียด</strong><p>คำนึงถึงความเหมาะสมของวัสดุและงานหน้างาน</p></div></div>
          <div><span>03</span><div><strong>เก็บบันทึกผลงาน</strong><p>รวบรวมภาพโครงการเป็นแฟ้มผลงานเพื่อการอ้างอิง</p></div></div>
        </div></div></section>
      <ContactSection />
    </main>
    <SiteFooter />
  </>;
}
