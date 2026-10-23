'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SiteHeader() {
  const [opened, setOpened] = useState(false);
  return (
    <header className="site-header" id="top">
      <div className="nav-wrap">
        <Link className="brand" href="/#top" aria-label="Decoration Line 2009 หน้าแรก" onClick={() => setOpened(false)}>
          <span className="brand-mark" aria-hidden="true"><span>DL</span><i>09</i></span>
          <span className="brand-copy"><strong>DECORATION LINE</strong><small>2009 · COMPANY PORTFOLIO</small></span>
        </Link>
        <button className="mobile-toggle" type="button" aria-expanded={opened} aria-controls="main-navigation"
          aria-label={opened ? 'ปิดเมนู' : 'เปิดเมนู'} onClick={() => setOpened(v => !v)}><span /><span /></button>
        <nav id="main-navigation" className={`main-nav ${opened ? 'open' : ''}`} aria-label="เมนูหลัก">
          <Link href="/#about" onClick={() => setOpened(false)}>เกี่ยวกับเรา</Link>
          <Link href="/#works" onClick={() => setOpened(false)}>ผลงานของเรา</Link>
          <Link href="/#approach" onClick={() => setOpened(false)}>แนวทางการทำงาน</Link>
          <Link className="nav-contact" href="/#contact" onClick={() => setOpened(false)}>ติดต่อบริษัท <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
