"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    // Dynamically load the Line plugin script
    const script = document.createElement("script");
    script.src =
      "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      document.body.removeChild(script);
    };
  }, []);
  return (
    <motion.footer
      className="bg-black text-white py-10 px-6 md:px-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo & Copyright */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <div className="flex items-center">
            {/* <div className="w-8 h-8">
              <Image
                src={"/logo.png"}
                alt="Modern building"
                layout="responsive"
                width={90}
                height={90}
                priority
              />
            </div> */}
            <h2 className="text-xl font-bold">Decoration Line 2009</h2>
          </div>
          <p className="mt-5">339/51 Bangbuathong Bangrakpattana Nonthaburi 11110</p>
          <p className="text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link href="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-300 transition">
            Services
          </Link>
          <Link href="/projects" className="hover:text-gray-300 transition">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </div>

        {/* Right Section - Social Media */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <div
            className="line-it-button"
            data-lang="en"
            data-type="friend"
            data-env="REAL"
            data-lineid="@lineteamjp"
            style={{ display: "none"}}
          />
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
