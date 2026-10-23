import Link from 'next/link';

export default function SiteFooter() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '0634219781';
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'decorationline2009@gmail.com';
  const lineInput = process.env.NEXT_PUBLIC_LINE_URL?.trim() || 'https://lin.ee/hW55akw';
  const lineUrl = /^https:\/\/(?:lin\.ee|line\.me)\//i.test(lineInput) ? lineInput : 'https://lin.ee/hW55akw';

  return (
    <footer>
      <div className="shell foot-grid">
        <div>
          <strong>DECORATION LINE <span>2009</span></strong>
          <small>ห้างหุ้นส่วนจำกัด เดคคอร์เรชั่น ไลน์ 2009</small>
          <div className="footer-contact-links">
            <a href={`tel:${phone.replace(/[^+0-9]/g, '')}`}>{phone}</a>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer">LINE Official Account ↗</a>
          </div>
        </div>
        <div className="footer-right">
          <Link href="/#top">กลับขึ้นด้านบน ↑</Link>
          <Link href="/drive-status">ตรวจสอบรูป Google Drive ↗</Link>
          <small>ภาพผลงานจากคลังโครงการของบริษัท</small>
        </div>
      </div>
    </footer>
  );
}
