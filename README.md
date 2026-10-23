# Decoration Line 2009 — Next.js + Google Drive Auto Gallery

เวอร์ชัน 3.0 ของเว็บผลงาน **หจก. เดคคอร์เรชั่น ไลน์ 2009** พัฒนาด้วย Next.js 16 App Router + React 19 + TypeScript เพื่อ Deploy บน Vercel

## สิ่งที่เปลี่ยนจากเวอร์ชันก่อน

- **แสดงทุกรูปในทุกโฟลเดอร์โครงการ** ไม่จำกัด 24/80 รูป และอ่านภาพจากโฟลเดอร์ย่อยด้วย (Google Drive API แบ่งหน้าผลลัพธ์จนครบ)
- **สร้างโครงการบนเว็บไซต์อัตโนมัติ** เมื่อสร้างโฟลเดอร์ชั้นแรกใหม่ใต้ `Decoration line 2009` โดยไม่ต้องแก้ `projects.json`
- **อัปเดตชื่อโครงการ/รูปที่เพิ่ม/รูปที่ลบ** จาก Google Drive หลังแคชหมดอายุ เริ่มต้น 300 วินาที (5 นาที) **เมื่อมีผู้เข้าชมเว็บไซต์** ไม่ต้อง Redeploy
- รองรับ JPEG/PNG/WebP/GIF/AVIF และ HEIC/HEIF ตามความสามารถ Google Drive thumbnail และไลบรารีแปลงภาพ
- รูปทั้งหมดโหลดผ่าน API server-side `/api/drive-image/...`; ไม่เปิดเผย Service Account credentials ให้ผู้ชม
- หน้าโครงการแสดงได้ทั้งหมด แต่ทยอยโหลดชุดละ 36 รูปเพื่อไม่ให้เบราว์เซอร์ช้า
- โปรเจกต์เก่าใช้ slug เดิม โฟลเดอร์ใหม่ได้ slug ใหม่โดยอัตโนมัติ

**สำคัญมาก:** โฟลเดอร์ใหม่/รูปใหม่ทุกชิ้นภายใต้โฟลเดอร์หลักจะพร้อมถูกนำไปแสดงแก่สาธารณะโดยอัตโนมัติ แม้ใน Google Drive ต้นฉบับจะยัง private ควรใช้โฟลเดอร์งานที่ผ่านการอนุมัติให้นำขึ้นเว็บเท่านั้นและมีสิทธิ์เผยแพร่ภาพผลงาน/โลโก้ลูกค้า

## วิธี Deploy บน Vercel

1. แตกไฟล์ ZIP และอัปโหลดไฟล์ใน `decoration-line-nextjs/` เข้า repository บน GitHub (ให้ `package.json` อยู่ที่ root)
2. สร้าง/เลือก Google Cloud Project แล้ว **Enable Google Drive API**
3. สร้าง **Service Account** ใน Google Cloud Console และสร้าง JSON key สำหรับการยืนยันตัวตน
4. เปิดโฟลเดอร์ Google Drive ชื่อ `Decoration line 2009` → Share → เพิ่มอีเมลของ Service Account ด้วยสิทธิ์ **Viewer** (ไฟล์และโฟลเดอร์ภายในต้องเข้าถึงได้ด้วย)
5. ไปที่ Vercel → Project → Settings → Environment Variables เพิ่มค่าดังนี้:

| Environment Variable | ค่า |
|---|---|
| `DRIVE_ROOT_FOLDER_ID` | `1awl7cpeVZ3drq3KHL-5vd9DC3X2v2S98` |
| `GOOGLE_CLIENT_EMAIL` | ค่า `client_email` ใน JSON key |
| `GOOGLE_PRIVATE_KEY` | ค่า `private_key` ใน JSON key (รวม `-----BEGIN PRIVATE KEY-----`, `\\n`, และ END) |
| `DRIVE_REFRESH_SECONDS` | `300` (เลือกได้ตั้งแต่ 60 วินาทีขึ้นไป) |

หรือใช้ตัวแปร **`GOOGLE_SERVICE_ACCOUNT_JSON`** ใส่ JSON credential ทั้งก้อนแทน email/key สองตัว ก็ได้ (ง่ายกว่าเวลาคัดลอกจาก JSON)

**ห้าม** ใส่ Service Account key ใน repo, `public/`, หรือในตัวแปรที่ขึ้นต้นด้วย `NEXT_PUBLIC_` และไม่ควรแชร์ key กับบุคคลอื่น

6. Import Repository ที่ <https://vercel.com/new> → Next.js → Deploy
7. หลัง Deploy ให้เปิดเว็บไซต์ โฟลเดอร์ที่ระบบเห็นจะมาจาก Drive และเมื่อสร้างโฟลเดอร์ใหม่ก็จะแสดงเองภายหลังโดยไม่ต้อง Deploy เพิ่ม

**ข้อแตกต่างจากเดิม:** ไม่ต้องตั้ง `DRIVE_SYNC_ON_BUILD` แล้ว และสคริปต์ซิงก์ตอน build รุ่นเก่าถูกถอดออก โค้ดใหม่ทำงานเมื่อเว็บไซต์ถูกเรียกใช้งานจริง (Server-side)

## รูปภาพ HEIC จาก iPhone

- ใช้ Google Drive `thumbnailLink` ที่สั่งโหลดผ่านเซิร์ฟเวอร์ด้วยสิทธิ์ Service Account เท่านั้น; ไม่ใช้ลิงก์รูปส่วนตัวตรงบนหน้าเว็บ
- รูป JPG/PNG/WebP จะถูกแปลงเป็น WebP เมื่อมีคนเรียกดู ช่วยลดขนาดไฟล์
- ไฟล์ HEIC/HEIF บางไฟล์อาจไม่มี thumbnail ให้ Google Drive หรือเสียหาย; หากยังไม่แสดง ต้องแปลงไฟล์นั้นเป็น JPEG/PNG แล้วอัปโหลดเข้าโฟลเดอร์โครงการอีกครั้ง
- ไฟล์ต้นฉบับขนาดใหญ่มากอาจใช้ภาพ thumbnail เพื่อรองรับข้อจำกัดของ Vercel Functions

## รายละเอียดการทำงาน

```text
Google Drive (private, Service Account Viewer)
└── Decoration line 2009              ← DRIVE_ROOT_FOLDER_ID
    ├── Swensen_s                      ← 1 project
    │   ├── IMG_1402.JPG
    │   └── ... รูปทุกไฟล์
    ├── Mantana km7                    ← 1 project
    │   └── (โฟลเดอร์ย่อยก็ได้)
    └── โครงการที่เพิ่งสร้าง           ← เว็บเพิ่มรายการให้อัตโนมัติ

Visitor → Vercel Next.js server → Google Drive API → /api/drive-image/[id]
                    ↳ cache folder/image listing 300 วินาที
```

- ใช้ `next/cache` สำหรับแคชข้อมูลรายชื่อโฟลเดอร์และรายชื่อรูปแยกตามโครงการ
- Google Drive API `files.list` ดึงทุก page ด้วย `nextPageToken` จึงไม่มี hard cap 24 ภาพ
- สถานะหน้าเว็บจะรีเฟรชเมื่อมี request ภายหลังข้อมูลแคชหมดอายุ; **ไม่ใช่ Push สดทันที** และเบราว์เซอร์ที่เปิดค้างต้อง Refresh หน้า
- โปรเจกต์ใหม่ได้หมวดหมู่จากชื่อโฟลเดอร์แบบประมาณเบื้องต้น ปรับ regex ได้ที่ `src/lib/drive.ts`
- **โฟลเดอร์เปล่าก็ปรากฏเป็นโปรเจกต์** พร้อมข้อความยังไม่มีรูปภาพ
- ป้องกันการเข้าถึง Drive file id อื่น: API ตรวจรูปนั้นอยู่ในโฟลเดอร์โครงการที่ระบบค้นจาก root ก่อนทุกครั้ง
- ถ้าไม่ตั้งค่า Google credentials เว็บไซต์ยังใช้รูปตัวอย่างเดิม 25 ภาพจากเวอร์ชัน 1.0 แต่ **จะไม่ซิงก์** และไม่เพิ่มโครงการใหม่
- ถ้าตั้ง credential ไม่ถูกต้อง ระบบจะแจ้งข้อผิดพลาดแทนการแอบใช้ข้อมูลเก่าเพื่อไม่ให้เข้าใจผิดว่าซิงก์สำเร็จ

## ทดสอบในเครื่อง

Node.js 22+ (เหมาะกับ Next.js 16)

```bash
npm install
cp .env.example .env.local
# แก้ .env.local ใส่ credentials (ไม่ควรแชร์ไฟล์นี้)
npm run dev
# เปิด http://localhost:3000
npm run check:content
npm run typecheck
npm run build
```

## ข้อมูลติดต่อบริษัท

หมายเลขโทรศัพท์, อีเมล และ LINE OA กำหนดเป็นค่าเริ่มต้นในโปรเจกต์แล้ว; การตั้งค่าบน Vercel เป็นเพียงตัวเลือกเมื่อต้องการเปลี่ยนข้อมูล:

```env
NEXT_PUBLIC_CONTACT_PHONE=0634219781
NEXT_PUBLIC_LINE_URL=https://lin.ee/hW55akw
NEXT_PUBLIC_CONTACT_EMAIL=decorationline2009@gmail.com
NEXT_PUBLIC_COMPANY_ADDRESS=
NEXT_PUBLIC_SITE_URL=https://your-real-domain.example
```

QR Code อยู่ที่ `public/line-oa-qr.png` และแสดงในส่วน CONTACT

## ข้อจำกัดที่ควรทราบ

- รูปภาพจำนวนมากอาจเพิ่มค่าใช้จ่าย/การใช้โควตา Google Drive API และ Vercel image optimization
- เว็บต้องมี Service Account อ่านได้จริงเมื่อ Deploy; การเชื่อม Google Drive ของ ChatGPT เพียงอย่างเดียว **ไม่ทำให้ Vercel เข้าถึงได้**
- ห้ามใส่ไฟล์เอกสารลูกค้า/ผังอาคารที่เป็นความลับในโฟลเดอร์ที่เผยแพร่อัตโนมัติ
- ไม่ได้สร้าง webhook จาก Drive (ผู้ใช้ไม่ต้องตั้ง webhook; ระบบค้นการเปลี่ยนแปลงหลังเวลา cache)
- โค้ดพร้อมนำไปติดตั้งและ deploy แต่ไม่ได้รัน `npm run build` ในสภาพแวดล้อมนี้ เนื่องจาก npm registry ไม่สามารถเชื่อมต่อได้

## เวอร์ชัน 3.0: เพิ่มข้อมูลติดต่อและ LINE OA

- ใส่หมายเลขโทรศัพท์ **0634219781** เป็นลิงก์โทรออก (`tel:`)
- ใส่อีเมล **decorationline2009@gmail.com** เป็นลิงก์ส่งอีเมล (`mailto:`)
- เพิ่ม QR Code ของ LINE OA จากภาพที่บริษัทส่งมาไว้ที่ `public/line-oa-qr.png`
- ตรวจอ่านข้อมูลจาก QR ต้นฉบับได้ลิงก์ LINE OA **https://lin.ee/hW55akw** และใช้เป็นลิงก์สำหรับกดเพิ่มเพื่อนจากโทรศัพท์
- แสดงข้อมูลติดต่อที่ส่วน Contact หน้าแรกและส่วนท้ายเว็บไซต์ทุกหน้า
- ข้อมูลทั้งสามมีค่า default ในโค้ดอยู่แล้ว ไม่จำเป็นต้องตั้งค่า Environment Variables สำหรับสามค่านี้บน Vercel ถ้าต้องการใช้ค่าเดิม
- ถ้าเคยตั้ง `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINE_URL` บน Vercel ไว้ ค่าบน Vercel จะมีลำดับความสำคัญเหนือค่าเริ่มต้น ควรตรวจว่าเป็นค่าล่าสุด
- การอ่านโครงการอัตโนมัติจาก Google Drive ยังคงใช้กลไกเดิมของ V2 (ต้องกำหนด Service Account เพื่อเปิดใช้งาน)
- ลิงก์ LINE มาจากภาพ QR ที่ได้รับ; ก่อนเปิดเว็บจริงควรสแกน QR อีกครั้งเพื่อยืนยันว่าชี้ไปบัญชีของบริษัท
