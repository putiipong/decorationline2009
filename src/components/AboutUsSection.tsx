"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  return (
    <section id="about" className="bg-primary py-12 px-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 mr-2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of section is visible
        >
          <h3 className="text-lg font-bold uppercase mb-4 text-black">
            About Our Company
          </h3>
          <p className="text-md leading-relaxed mb-4 text-black">
            Decoration Line 2009 is a trusted contractor specializing in
            high-quality building and renovation services. With years of
            experience, we have successfully completed numerous residential and
            commercial projects, ensuring durability, functionality, and
            aesthetic appeal.
          </p>
          <h2 className="text-lg font-bold uppercase mb-4 text-black">Our Services</h2>
          <ul className="list-disc list-inside space-y-2 text-md mb-4 text-black">
            <li>Building and home renovation</li>
            <li>Residential and commercial construction</li>
            <li>Interior and exterior design</li>
            <li>General maintenance and repair</li>
          </ul>
          <h2 className="text-lg font-bold uppercase mb-4 text-black">Why Choose Us?</h2>
          <p className="text-md leading-relaxed mb-4 text-black">
            We prioritize quality, professionalism, and customer satisfaction.
            Our team consists of skilled professionals dedicated to turning your
            vision into reality with precision and care.
          </p>
          {/* <Disclosure>
            {({ open }) => (
              <div>
                <DisclosureButton
                  className={`inline-flex items-center px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition ${
                    open ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                >
                  {open ? "Close" : "Read More"} <span className="ml-2">→</span>
                </DisclosureButton>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-gray-600"
                  >
                    We specialize in providing tailored solutions for a wide
                    range of industries. Our team is dedicated to ensuring each
                    project is delivered with safety, efficiency, and
                    innovation.
                  </motion.div>
                )}
              </div>
            )}
          </Disclosure> */}
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={"/building.jpg"}
              alt="Modern building"
              layout="responsive"
              width={800}
              height={600}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
