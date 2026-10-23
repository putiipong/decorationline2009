import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Decoration Line 2009 | ผลงานตกแต่งและก่อสร้าง', template: '%s | Decoration Line 2009' },
  description: 'ชมผลงานจากโครงการจริงของ หจก. เดคคอร์เรชั่น ไลน์ 2009 ทั้งบ้านพักอาศัย ร้านค้า และพื้นที่เชิงพาณิชย์',
  applicationName: 'Decoration Line 2009',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Decoration Line 2009',
    description: 'แกลเลอรีผลงานโครงการของ หจก. เดคคอร์เรชั่น ไลน์ 2009',
    locale: 'th_TH',
    type: 'website',
  },
};
export const viewport: Viewport = { themeColor: '#192220', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="th"><body>{children}</body></html>;
}
