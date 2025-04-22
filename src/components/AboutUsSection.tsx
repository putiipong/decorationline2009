"use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// const AboutUsSection = () => {
//   return (
//     <section id="about" className="bg-primary py-12 px-6 md:px-16">
//       <div className="container mx-auto flex flex-col md:flex-row items-center">
//         <motion.div
//           className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 mr-2"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.2 }} 
//         >
//           <h3 className="text-lg font-bold uppercase mb-4 text-black">
//             About Our Company
//           </h3> 
//           <p className="text-md leading-relaxed mb-4 text-black">
//             Decoration Line 2009 is a trusted contractor specializing in
//             high-quality building and renovation services. With years of
//             experience, we have successfully completed numerous residential and
//             commercial projects, ensuring durability, functionality, and
//             aesthetic appeal.
//           </p>
//           <h2 className="text-lg font-bold uppercase mb-4 text-black">Our Services</h2>
//           <ul className="list-disc list-inside space-y-2 text-md mb-4 text-black">
//             <li>Building and home renovation</li>
//             <li>Residential and commercial construction</li>
//             <li>Interior and exterior design</li>
//             <li>General maintenance and repair</li>
//           </ul>
//           <h2 className="text-lg font-bold uppercase mb-4 text-black">Why Choose Us?</h2>
//           <p className="text-md leading-relaxed mb-4 text-black">
//             We prioritize quality, professionalism, and customer satisfaction.
//             Our team consists of skilled professionals dedicated to turning your
//             vision into reality with precision and care.
//           </p>
//         </motion.div>

//         <motion.div
//           className="md:w-1/2"
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           <div className="rounded-lg overflow-hidden shadow-lg">
//             <Image
//               src={"/about-us.webp"}
//               alt="about us"
//               layout="responsive"
//               width={800}
//               height={600}
//               priority
//             />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default AboutUsSection;

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUsSection = () => {
  return (
    <section id="about" className="bg-primary py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 text-black">
            About Our Company
          </h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-black">
            Decoration Line 2009 is a trusted contractor specializing in
            high-quality building and renovation services. With years of
            experience, we have successfully completed numerous residential and
            commercial projects, ensuring durability, functionality, and
            aesthetic appeal.
          </p>

          <h4 className="text-lg md:text-xl font-bold uppercase mb-3 text-black">Our Services</h4>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg mb-6 text-black">
            <li>Building and home renovation</li>
            <li>Residential and commercial construction</li>
            <li>Interior and exterior design</li>
            <li>General maintenance and repair</li>
          </ul>

          <h4 className="text-lg md:text-xl font-bold uppercase mb-3 text-black">Why Choose Us?</h4>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-black">
            We prioritize quality, professionalism, and customer satisfaction.
            Our team consists of skilled professionals dedicated to turning your
            vision into reality with precision and care.
          </p>

          <Link href="/contact">
            <button className="inline-block px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition">
              Contact Us
            </button>
          </Link>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/about-us.webp"
              alt="Team working on a renovation project"
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
