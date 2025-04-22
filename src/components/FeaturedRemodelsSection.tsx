import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const carouselImages = [
  {
    id: 1,
    src: "https://drive.google.com/uc?export=view&id=13WMf1AfnvYK7GuoArrVZ1i5gvEWgiOc9",
    alt: "Modern kitchen design",
  },
  {
    id: 2,
    src: "https://drive.google.com/uc?export=view&id=1EH9Zl3UNFIWzj1t-hBobBZOFgvBVbtYe",
    alt: "Luxurious living room",
  },
  {
    id: 3,
    src: "https://drive.google.com/uc?export=view&id=1iWWSBl83VSS2GgEzun96j-EbgXBoDGYY",
    alt: "Minimalist office design",
  },
];

const FeaturedRemodelsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-primary py-12 px-6 md:px-16">
      <div className="container mx-auto flex flex-col items-center">
        {/* Text Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-sm font-bold uppercase mb-4 text-black">
            Featured Remodels
          </h3>
          <h2 className="text-3xl font-light mb-6 leading-snug text-black">
            We Create Spaces You’ll Love
          </h2>
          <button
            onClick={() => router.push("/projects")}
            className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-secondary text-xl font-semibold hover:font-extrabold"
          >
            All Projects <span className="ml-2">→</span>
          </button>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {carouselImages.map((image) => (
                <div
                  key={image.id}
                  className="relative min-w-[80%] md:min-w-[50%] p-4"
                >
                  <div className="group overflow-hidden rounded-lg shadow-lg w-full max-w-[800px] mx-auto">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={800}
                      height={600}
                      className="cursor-pointer w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[400px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Dots Navigation */}
          <div className="flex justify-center mt-4 space-x-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full ${
                  index === selectedIndex
                    ? "bg-black"
                    : "bg-gray-400 hover:bg-black"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedRemodelsSection;
