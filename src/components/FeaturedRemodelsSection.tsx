import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const carouselImages = [
  { id: 1, src: "/building.jpg", alt: "Modern kitchen design" },
  { id: 2, src: "/building.jpg", alt: "Luxurious living room" },
  { id: 3, src: "/building.jpg", alt: "Minimalist office design" },
];

const FeaturedRemodelsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-[#f1ecd7] py-12 px-6 md:px-16">
      <div className="container mx-auto flex flex-col items-center">
        {/* Text Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-sm font-bold uppercase mb-4 text-black">Featured Remodels</h3>
          <h2 className="text-3xl font-light mb-6 leading-snug text-black">
            We Create Spaces You’ll Love
          </h2>
          <button className="inline-flex items-center px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800">
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
                  <div className="group overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
