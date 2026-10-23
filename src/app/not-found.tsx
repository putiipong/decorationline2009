import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
export default function NotFound() {
 return <><SiteHeader /><main className="not-found shell"><p className="section-number">404 / NOT FOUND</p><h1>ไม่พบหน้าที่คุณต้องการ</h1><Link className="btn btn-dark" href="/">กลับหน้าแรก →</Link></main></>;
}
