// app/projects/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const projects = [
  {
    id: 1,
    title: "WIND RATCHAYOTHIN CONDOMINIUM",
    description:
      "Interior decoration and lighting design for a cozy modern living space.",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1tUIGES-w2zpaIx_7k0-0jiwYhxzGKWMX",
    route: "wind_condo",
  },
  {
    id: 2,
    title: "PANNANA PHUTTHAMONTHON SAI 3",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=17psKVVZR3IJ7pg1tdVCJ08p-l_ryFRc0",
    route: "panana_phutthamonthon_sai_3",
  },
  {
    id: 3,
    title: "JIAN CHA G-TOWER",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1DaCWL2pEhYdALMJBPCsAvOg68EvqvlCQ",
    route: "jian_cha_g_tower",
  },
  {
    id: 4,
    title: "JIAN CHA ICON SIAM",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1DaCWL2pEhYdALMJBPCsAvOg68EvqvlCQ",
    route: "jian_cha_icon_siam",
  },
  {
    id: 5,
    title: "JIAN CHA THE UP RAMA 3",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1DaCWL2pEhYdALMJBPCsAvOg68EvqvlCQ",
    route: "jian_cha_the_up_rama3",
  },
  {
    id: 6,
    title: "GRANDIO BANGNA KM 5",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1Tmlr1pYYCk5iG8aq-QSpDDI7U5lqcj4N",
    route: "grandio_bangna_km5",
  },
  {
    id: 7,
    title: "BOULEVARD SIGNATURE WESTGATE",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1InuD1WSSf_eWNBUk_aO9VHLUozqlCMOK",
    route: "boulevard_signature_westgate",
  },
  {
    id: 8,
    title: "BOULEVARD RAMA 5",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1Nz9-VydgvzQnrQodHfbnrgFIV5s-mTc9",
    route: "boulevard_rama5",
  },
  {
    id: 9,
    title: "SWENSEN'S",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1NCwfPifbQQPSeBpx_xiBsyePrUMAJjbN",
    route: "swensen's",
  },
  {
    id: 10,
    title: "LAOYUAN",
    description: "",
    imageUrl:
      "https://drive.google.com/uc?export=view&id=1WNjkxbszArMIaj49qcsPcrGNM4BlYeae",
    route: "laoyuan",
  },
];

export default function ProjectPage() {
  const router = useRouter();
  return (
    <section className="px-6 md:px-16 py-24 bg-white min-h-screen">
      <h1 className="text-lg font-semibold text-center mb-6 text-gray-800">
        OUR PROJECTS
      </h1>
      <h1 className="text-xs font-semibold text-center mb-12 text-gray-800">
        All logos displayed here are used to showcase projects our team has been
        involved in — whether in design, decoration, or construction — with
        proper permission from the clients or within the scope of our contracted
        responsibilities.
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 ">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white cursor-pointer"
            onClick={() => router.push(`projects/${project.route}`)}
          >
            <Image
              src={project?.imageUrl}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-60 object-contain"
            />

            <div className="p-4">
              <h2 className="text-black text-xl font-semibold mb-2">
                {project.title}
              </h2>
              {/* <p className="text-black text-sm">{project.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
