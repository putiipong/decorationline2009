# Decoration Line 2009 — Next.js V4 (Google Drive Complete Gallery)

เว็บ Next.js 16 + React 19 + TypeScript สำหรับ Vercel เชื่อมคลังผลงานของ **หจก.เดคคอร์เรชั่น ไลน์ 2009** โดยอัตโนมัติผ่าน Google Drive API (Service Account) เก็บโฟลเดอร์ Drive ส่วนตัวเหมือนเดิม

## ปัญหาที่แก้ใน V4

1. **เลิกแสดงรูปสำรอง 25 รูปแบบเงียบ ๆ** หาก Vercel ไม่ได้ตั้งค่าเชื่อมต่อ Drive เว็บไซต์แจ้งข้อผิดพลาดแทน นี่เป็นสาเหตุหลักที่ทำให้จำนวนรูปในเว็บไม่เท่ากับ Drive แม้ V3 อ้างว่าซิงก์อัตโนมัติ
2. **ทุกภาพปรากฏในหน้าโครงการโดยไม่ต้องกดดูเพิ่มเติม** หน้าโครงการใช้รูปทั้งหมดที่ Drive API ส่งมา และใช้ `loading="lazy"` ให้โหลดไฟล์ภาพเมื่อเลื่อนหน้าจอ
3. **อ่านทุกหน้า pagination ของ Google Drive API** ด้วย `nextPageToken`, `pageSize=1000` และอ่านโฟลเดอร์ย่อยซ้ำลงไปจนสุดโดยไม่มีขีดจำกัดต่อโครงการ หาก Drive แจ้ง incompleteSearch จะไม่โชว์จำนวนที่ผิดโดยเงียบ ๆ
4. **แก้ HEIC** ลอง thumbnail จาก Google ก่อน ถ้าไม่ได้ให้ลองภาพต้นฉบับผ่าน `sharp` และ `heic-convert` (`npm install` จะติดตั้งให้อัตโนมัติ) ไฟล์ที่เสียหาย/ไม่มีสิทธิ์อ่านจะแสดงแผ่นแจ้งข้อผิดพลาด **ไม่หายไปเฉย ๆ**
5. **ปิด Next image optimizer ซ้อน**: ภาพจาก Drive แปลงเป็น WebP โดย route `/api/drive-image/[id]` อยู่แล้ว จึงลดจุดที่อาจเกิด cache ภาพเสีย
6. **หน้า `/drive-status`** ตรวจจำนวนรูปและวิดีโอในแต่ละโครงการจากมุมมองของ Service Account บน Vercel พร้อมระบุจำนวน HEIC และไฟล์ HEIC ที่น่าสงสัย (เล็กกว่า 1 KB) แยกต่างหาก
7. **มีโปรเจกต์ใหม่โดยอัตโนมัติ** เมื่อสร้างโฟลเดอร์ภายใต้ `Decoration line 2009` และเพิ่มรูปใหม่เมื่อแคชหมดอายุ (ค่าเริ่มต้น 5 นาที จากนั้น refresh หน้า) **ไม่ต้อง redeploy**
8. ยังคงเบอร์ **0634219781**, อีเมล **decorationline2009@gmail.com**, QR LINE OA และลิงก์ **https://lin.ee/hW55akw** เหมือนเวอร์ชันก่อนหน้า

## ตั้งค่าบน Vercel (จำเป็น เพื่อให้รูปครบ!)

1. Google Cloud Console → เลือกหรือสร้าง Cloud Project → Enable **Google Drive API**
2. สร้าง **Service Account** → Keys → Add Key → Create new key → JSON
3. เปิด Google Drive → โฟลเดอร์ `Decoration line 2009` → Share → ใส่ `client_email` ของ Service Account เป็น **Viewer** (ตรวจสิทธิ์ไฟล์ภายในด้วย)
4. Vercel → Project → Settings → Environment Variables → เพิ่ม:

| Name | Value |
|---|---|
| `DRIVE_ROOT_FOLDER_ID` | `1awl7cpeVZ3drq3KHL-5vd9DC3X2v2S98` |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | **เนื้อหาไฟล์ JSON key ทั้งก้อน** (เก็บเป็น Secret) |
| `DRIVE_REFRESH_SECONDS` | `300` (หรือ `60` หากต้องการรีเฟรชถี่ขึ้น) |

ทางเลือก: ถ้าไม่ใช้ `GOOGLE_SERVICE_ACCOUNT_JSON` สามารถตั้ง `GOOGLE_CLIENT_EMAIL` + `GOOGLE_PRIVATE_KEY` แทน (ดู `.env.example`)

5. อัปโหลด source code ไป GitHub แล้ว Import เข้า Vercel (ให้ `package.json` อยู่ที่ repository root)
6. หลังเพิ่มหรือเปลี่ยน Environment Variables ต้อง **Redeploy** หนึ่งครั้ง เพื่อให้ Deployment ใหม่รับค่าที่ตั้งไว้
7. เข้าเว็บไซต์ `https://<your-domain>/drive-status` **ก่อน** ตรวจว่าระบบเชื่อมต่อและนับรูปได้ หากหน้าเว็บแจ้งว่าไม่ได้ตั้งค่า Service Account แปลว่ายังไม่ได้เชื่อม Drive บน Vercel จริง

**หมายเหตุ:** การเชื่อม Drive ใน ChatGPT ไม่ได้ให้สิทธิ์ Vercel โดยอัตโนมัติ, V4 ไม่ฝัง key ลงใน source, และไม่เปิด Drive เป็นสาธารณะโดยตรง

## ตรวจว่ารูปครบไหม

- เปิด `/drive-status` → ดูจำนวนไฟล์ภาพในแต่ละโครงการ (นับได้เฉพาะไฟล์ที่ Service Account มีสิทธิ์เห็น)
- เปิดหน้าโครงการและเลื่อนจนสุด: ภาพทั้งหมดอยู่ใน DOM แล้ว ใช้ browser lazy loading เพื่อประหยัดดาต้า ไม่ต้องกดปุ่ม "ดูภาพเพิ่มเติม"
- ถ้าจำนวน **น้อยกว่าใน Google Drive**: เช็ก Service Account access, โฟลเดอร์ย่อย, สิทธิ์แชร์, cache 300 วินาที และเปิด Vercel Functions Logs
- ถ้า **จำนวนตรงกันแต่ภาพไม่ขึ้น**: เป็นปัญหาดึง bytes/แปลงภาพ/HEIC; ดูสถานะ HTTP ของ `/api/drive-image/[id]` ใน browser Network และ Vercel Functions Logs
- นับ **รูปภาพ** แยกจาก **วิดีโอ**, ตัวอย่าง Boulevard Signature Westgate มีรูป 16 ไฟล์และวิดีโอ 4 ไฟล์ ดังนั้นจำนวนรูปบนหน้าเว็บจึงควรเป็น 16 ไม่ใช่ 20
- **พบตัวอย่างไฟล์ใน Mantana km7 และบ้านกลางเมืองบางไฟล์ขนาดเพียง 135 ไบต์และขึ้นต้น `bplist00`** ซึ่งไม่ใช่รูป HEIC สมบูรณ์ ต้องอัปโหลดภาพต้นฉบับใหม่ (ตัวอย่าง IMG_7286.HEIC มีขนาด ~1.8 MB และไม่เข้ากรณีนี้)
- รูป HEIC จาก iPhone อาจเป็นไฟล์ผิดรูปแบบ/ไม่มี thumbnail/ใหญ่เกินข้อจำกัดของ Vercel; ถ้าแปลงไม่สำเร็จ ระบบจะแสดงช่องแจ้งเตือน แนะนำแปลงต้นฉบับเป็น JPEG หรือ WebP แล้วแทนไฟล์นั้นใน Drive
- เมื่อสร้างโฟลเดอร์ใหม่จะเพิ่มเป็นโครงการใหม่โดยอัตโนมัติ; สิ่งนี้หมายความว่า **ต้องไม่เก็บไฟล์ลับ** ไว้ในโฟลเดอร์หลักดังกล่าว

## ทดสอบในเครื่อง

ต้องมี Node.js 22 หรือใหม่กว่า:

```bash
npm install
cp .env.example .env.local
# ใส่ GOOGLE_SERVICE_ACCOUNT_JSON หรือ EMAIL + KEY ใน .env.local
npm run check:content
npm run typecheck
npm run build
npm run dev
# http://localhost:3000/drive-status
```

## ความปลอดภัยและข้อจำกัด

- อย่าคอมมิต `.env.local` หรือ JSON key ขึ้น GitHub; **อย่า** ใส่ secret ในตัวแปร `NEXT_PUBLIC_`
- Gallery จะเผยแพร่ไฟล์รูปที่ Service Account เห็นในโฟลเดอร์ผลงานให้ผู้เข้าชมเว็บได้ จึงต้องจัดสิทธิ์และคัดเฉพาะรูปที่ได้รับอนุญาต
- Drive query ยังเป็นวิธีการ refresh แบบ polling ตาม cache และคำขอผู้ชม ไม่ใช่ notification push สด ๆ ต้อง refresh หน้าเว็บหลังอัปโหลดใหม่
- ไม่ได้ทดสอบ Google Drive API บน Vercel หรือ production build ด้วย credentials ของผู้ใช้ในสภาพแวดล้อมสร้าง ZIP นี้ ผู้ดูแลเว็บต้องตรวจจาก `/drive-status` หลัง Deploy
