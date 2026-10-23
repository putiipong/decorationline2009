import Image from 'next/image';

const DEFAULT_PHONE = '0634219781';
const DEFAULT_EMAIL = 'decorationline2009@gmail.com';
// LINE OA URL decoded and verified from the QR image supplied by the company.
const DEFAULT_LINE_URL = 'https://lin.ee/hW55akw';

export default function ContactSection() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || DEFAULT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || DEFAULT_EMAIL;
  const lineInput = process.env.NEXT_PUBLIC_LINE_URL?.trim() || DEFAULT_LINE_URL;
  const address = process.env.NEXT_PUBLIC_COMPANY_ADDRESS?.trim();

  const phoneHref = `tel:${phone.replace(/[^+0-9]/g, '')}`;
  const emailHref = `mailto:${email}`;
  // An invalid override should not produce a potentially unsafe external link.
  const lineUrl = /^https:\/\/(?:lin\.ee|line\.me)\//i.test(lineInput) ? lineInput : DEFAULT_LINE_URL;

  return (
    <section className="contact" id="contact">
      <div className="shell contact-content">
        <div className="contact-intro">
          <div className="section-number light">04 <span>—</span> CONTACT</div>
          <h2>มาคุยเรื่อง<br /><em>โครงการต่อไป</em></h2>
          <p>หจก. เดคคอร์เรชั่น ไลน์ 2009</p>
          <p>มีโครงการที่อยากให้เราช่วยดูแล? ติดต่อทีมงานผ่านโทรศัพท์ อีเมล หรือ LINE Official Account ได้เลย</p>
        </div>
        <div className="contact-card">
          <h3>ติดต่อเรา</h3>
          <p>สอบถามรายละเอียดผลงานและพูดคุยเรื่องโครงการของคุณ</p>

          <div className="contact-placeholder">
            <span>PHONE</span>
            <a href={phoneHref} aria-label={`โทร ${phone}`}>{phone}</a>
          </div>
          <div className="contact-placeholder">
            <span>EMAIL</span>
            <a href={emailHref}>{email}</a>
          </div>
          <div className="contact-placeholder">
            <span>LINE OA</span>
            <a href={lineUrl} target="_blank" rel="noopener noreferrer">เพิ่มเพื่อนผ่าน LINE ↗</a>
          </div>
          {address && <div className="contact-placeholder"><span>ADDRESS</span><strong>{address}</strong></div>}

          <div className="contact-line">
            <a className="contact-qr" href={lineUrl} target="_blank" rel="noopener noreferrer" aria-label="เปิด LINE Official Account เพื่อเพิ่มเพื่อน">
              <Image src="/line-oa-qr.png" alt="QR Code เพิ่มเพื่อน LINE Official Account ของ Decoration Line 2009" width={540} height={540} unoptimized />
            </a>
            <div className="contact-line-copy">
              <span className="contact-line-eyebrow">LINE OFFICIAL ACCOUNT</span>
              <strong>สแกน QR Code เพื่อแอด LINE</strong>
              <p>สแกนจากมือถืออีกเครื่อง หรือกดปุ่มด้านล่างเพื่อเปิดแชท LINE โดยตรง</p>
              <a className="contact-line-button" href={lineUrl} target="_blank" rel="noopener noreferrer">แอด LINE OA <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
