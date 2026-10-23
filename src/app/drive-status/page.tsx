import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { driveConfigured, getMedia, getProjects } from '@/lib/drive';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'สถานะข้อมูล Google Drive' };

function errorSummary(e: unknown) {
  const message = e instanceof Error ? e.message : String(e);
  if (message.includes('Google OAuth 400') || message.includes('Google OAuth 401')) return 'Service Account หรือ Private Key ไม่ถูกต้อง';
  if (message.includes('Google Drive API 403')) return 'Service Account ไม่มีสิทธิ์อ่านไฟล์หรือ Drive API ยังไม่เปิดใช้งาน';
  if (message.includes('Google Drive API 404')) return 'ไม่พบโฟลเดอร์หลัก หรือ Service Account ไม่มีสิทธิ์เข้าถึง';
  if (message.includes('incompleteSearch')) return 'Google Drive ส่งผลลัพธ์ไม่ครบ โปรดลองอีกครั้ง';
  return 'ไม่สามารถดึงรายการจาก Drive ได้ โปรดตรวจการตั้งค่าและ Vercel Function Logs';
}

export default async function DriveStatusPage() {
  let records: { id: string; name: string; photos: number; videos: number; heic: number; suspect: number; other: number; subfolders: number }[] = [];
  let error: string | null = null;
  if (!driveConfigured) error = 'ยังไม่ได้ตั้งค่า GOOGLE_SERVICE_ACCOUNT_JSON หรือ GOOGLE_CLIENT_EMAIL + GOOGLE_PRIVATE_KEY บน Vercel';
  else try {
    const projects = await getProjects();
    for (let i = 0; i < projects.length; i += 5) {
      const block = await Promise.all(projects.slice(i, i + 5).map(async p => {
        const stats = await getMedia(p);
        return { id: p.id, name: p.name, photos: stats.photos.length, videos: stats.videos, heic: stats.heicPhotos, suspect: stats.suspectHeicFiles, other: stats.otherFiles, subfolders: stats.nestedFolders };
      }));
      records.push(...block);
    }
  } catch (e) { error = errorSummary(e); }
  const totalPhotos = records.reduce((n, r) => n + r.photos, 0);
  const totalVideos = records.reduce((n, r) => n + r.videos, 0);
  return <><SiteHeader /><main className="shell drive-status-page">
    <p className="section-number">GOOGLE DRIVE <span>—</span> STATUS</p>
    <h1>ตรวจสอบรูปผลงาน</h1>
    <p>หน้านี้แสดงจำนวนไฟล์ที่เซิร์ฟเวอร์ Vercel อ่านได้จริงจาก Google Drive ไม่ใช่จำนวนรูปตัวอย่างใน ZIP เดิม</p>
    {error ? <div className="drive-alert" role="alert"><strong className="state-error">ยังไม่เชื่อมต่อ Google Drive สำเร็จ</strong>{error}<p>ตรวจสอบ Environment Variables, สิทธิ์ Viewer ของ Service Account และ Redeploy หลังแก้ค่าแล้ว</p></div> : <>
      <p className="state-ok">เชื่อมต่อ Google Drive สำเร็จ · {records.length} โฟลเดอร์โครงการ · {totalPhotos} รูป · {totalVideos} วิดีโอ</p>
      <p>จำนวนรูปหมายถึงไฟล์ภาพที่พบ แต่ไฟล์ที่เสียหายหรือ HEIC ที่แปลงไม่ได้อาจแสดงเป็นข้อความแจ้งข้อผิดพลาดในแกลเลอรี รายการอาจถูกแคชตาม DRIVE_REFRESH_SECONDS (ค่าเริ่มต้น 300 วินาที) หลังเพิ่มรูปให้รอแคชหมดอายุและรีเฟรชหน้านี้</p>
      <div style={{ overflowX:'auto' }}><table><thead><tr><th>โครงการ</th><th>รูปภาพ</th><th>ในนั้น HEIC</th><th>HEIC น่าสงสัย*</th><th>วิดีโอ</th><th>ไฟล์อื่น</th><th>โฟลเดอร์ย่อย</th></tr></thead><tbody>
      {records.map(r => <tr key={r.id}><td><Link href={`/projects/${r.id}`}>{r.name}</Link></td><td>{r.photos}</td><td>{r.heic}</td><td>{r.suspect}</td><td>{r.videos}</td><td>{r.other}</td><td>{r.subfolders}</td></tr>)}
      </tbody></table></div>
    </>}
    <p><small>* HEIC น่าสงสัย = ไฟล์ HEIC ขนาดน้อยกว่า 1 KB ซึ่งอาจไม่ใช่ข้อมูลภาพที่เปิดได้ ต้องตรวจและอัปโหลดไฟล์ต้นฉบับใหม่</small></p>
    <p><Link href="/">← กลับหน้าหลัก</Link></p>
  </main><SiteFooter /></>;
}
