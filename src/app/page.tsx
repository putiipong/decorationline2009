import { Metadata } from "next";
import AboutUsSection from "@/components/AboutUsSection";
import FeaturedRemodelsSection from "@/components/FeaturedRemodelsSection";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "รีโนเวทบ้านและออกแบบภายใน | ช่างรีโนเวทมืออาชีพ",
  description: "ผู้เชี่ยวชาญด้านการรีโนเวทบ้าน ออกแบบตกแต่งภายใน พร้อมตัวอย่างผลงานจริง ทีมงานมืออาชีพ ดูแลตั้งแต่ต้นจนจบ",
  keywords: ["รีโนเวทบ้าน", "ออกแบบภายใน", "ตกแต่งบ้าน", "ช่างรีโนเวท", "รีโนเวทคอนโด","หาผู้รับเหมา","หาช่าง","บิ้วอิน"],
  openGraph: {
    title: "รีโนเวทบ้านและออกแบบภายใน | ช่างรีโนเวทมืออาชีพ",
    description: "ชมตัวอย่างผลงานการรีโนเวทบ้าน พร้อมบริการออกแบบภายในโดยทีมงานผู้เชี่ยวชาญ",
    url: "https://wwww.decorationline2009.com",
    siteName: "เดคคอร์เรชั่นไลน์ 2009",
    images: [
      {
        url: "https://www.decorationline2009.com/_next/image?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D13WMf1AfnvYK7GuoArrVZ1i5gvEWgiOc9&w=1920&q=75",
        width: 1200,
        height: 630,
        alt: "ภาพตัวอย่างบ้านรีโนเวท",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "รีโนเวทบ้านและออกแบบภายใน",
    description: "ผลงานรีโนเวทจริงและบริการตกแต่งภายในครบวงจร",
    images: ["https://www.decorationline2009.com/"],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Navbar */}
      <LandingPage/>
      <AboutUsSection />
      <FeaturedRemodelsSection/>
      {/* Hero Section */}
    </>
  );
}
