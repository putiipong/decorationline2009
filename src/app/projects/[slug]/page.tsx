"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
};

const GOOGLE_API_KEY = "AIzaSyBq02DtbNkR-Gso28kVaaN020pRrg2pPIs";
const FOLDER_IDS: Record<string, string> = {
  wind_condo: "1PSsCVAOThiLjdise3x5dvfz1Yp_AM_uB",
  panana_phutthamonthon_sai_3: "1U8L9sNUHDn9EAGTmRmvVF7BbEhW5vLYP",
  jian_cha_g_tower: "1v_ve8S-J75cLoC08Im1CHAFlVJ0dSl8w",
  jian_cha_icon_siam: "1e8U8xdbak8OgWcz2pJFMAzzx5E0rmUz0",
  jian_cha_the_up_rama3: "1o0F4wkj5CDCHe4Yhy8fEh3ZStEaXY-iA",
  grandio_bangna_km5: "1fSrNXjWVx986Qntz4-z-_98L3t3ZyDwe",
  boulevard_signature_westgate: "19nS07EZmpdQwtgbA-Ie62z53l8bN1zQ-",
  boulevard_rama5: "1efTN7U60f4vbZ3x4N6OHcOhBIpfLkCAc",
  ["swensen's"]: "1ObBwLMn8Sl82XOZuIpWlp4abuKQ16lRs",
  laoyuan: "17-chOFjAGp_Sw9ly5MA8Q3fpPztWhIyM",
};

async function getDriveImages(folderId: string): Promise<DriveFile[]> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&key=${GOOGLE_API_KEY}`
  );

  if (!res.ok) {
    console.error("Error fetching from Google Drive:", await res.text());
    return [];
  }

  const data = await res.json();
  return data.files || [];
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState<DriveFile[]>([]);
  const folderId = FOLDER_IDS[slug];

  const fetchImages = async () => {
    const images = await getDriveImages(folderId);
    const imageListNoLogo = images.filter(
      (i) => i.name.split(".")[0] !== "logo"
    );
    setImages(imageListNoLogo);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  if (!folderId) return notFound();

  return (
    <section className="px-6 md:px-16 py-24 bg-white min-h-screen">
      <h1 className="text-lg font-semibold text-center mb-6 text-gray-800">
        Project: {slug.toUpperCase()}
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            className="rounded-lg overflow-hidden shadow"
          >
            <Image
              src={`https://drive.google.com/uc?export=view&id=${img.id}`}
              alt={img.name}
              width={800}
              height={400}
              className="object-cover w-full h-[300px] md:h-[400px] rounded-lg shadow-md"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={images.map((img) => ({
          src: `https://drive.google.com/uc?export=view&id=${img.id}`,
        }))}
        render={{
          slide: ({ slide }) => (
            <div className="w-[50vw] h-[50vh] mx-auto flex items-center justify-center">
              <Image
                src={slide.src}
                alt={slide.alt || ""}
                width={800}
                height={400}
                className="object-cover w-auto h-auti rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          ),
        }}
      />
    </section>
  );
}
