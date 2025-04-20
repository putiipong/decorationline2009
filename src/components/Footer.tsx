"use client";

import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    // <motion.footer
    //   className="bg-primary text-secondary py-10 px-6 md:px-16"
    //   initial={{ opacity: 0, y: 50 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, ease: "easeOut" }}
    //   viewport={{ once: true, amount: 0.2 }}
    // >
    <>
      <footer className="bg-primary text-secondary py-10 px-6 md:px-16">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">DECOLATION LINE 2009</h2>
            </div>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="flex space-x-6 text-sm">
            <Link href="/about" className="hover:text-gray-300 transition">
              ABOUT US
            </Link>
            <Link href="/projects" className="hover:text-gray-300 transition">
              PROJECTS
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition">
              CONTACT
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
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="mt-5">
              <h2 className="text-md font-semibold">HEAD OFFICE</h2>
              <p>339/51 Bangbuathong Bangrakpattana</p>
              <p>Nonthaburi 11110</p>
            </div>
          </div>
        </div>

      </footer>
      <hr />
      <div className="bg-primary p-1 px-6 md:px-16">
        <p className="text-gray-400 text-sm mt-2">
          © DECOLATION LINE 2009 | {new Date().getFullYear()} All rights
          reserved.
        </p>
      </div>
    </>
    // </motion.footer>
  );
};

export default Footer;
