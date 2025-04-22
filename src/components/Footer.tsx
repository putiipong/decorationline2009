"use client";

import Link from "next/link";
import { useEffect } from "react";

const navigation = [
  { name: "ABOUT US", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "SERVICES", href: "/services" },
  { name: "CONTACT US", href: "/contact" },
];

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
    <footer className="bg-primary text-secondary py-12 px-6 md:px-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-secondary">
            DECOLATION LINE 2009
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Providing exceptional construction services since 2009.
          </p>
        </div>

        <div className="flex space-x-6 justify-center md:justify-start text-sm">
          {navigation.map((n, i) => (
            <Link
              key={i}
              href={n.href}
              className="font-semibold text-secondary hover:text-gray-300 transition"
            >
              {n.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-center md:justify-start mt-4 md:mt-0">
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

      <div className="container mx-auto mt-10 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h2 className="text-md font-semibold text-white">HEAD OFFICE</h2>
          <p className="text-sm text-gray-400 mt-2">
            339/51 Bangbuathong Bangrakpattana
          </p>
          <p className="text-sm text-gray-400">Nonthaburi 11110</p>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <div className="bg-primary text-center">
        <p className="text-sm text-gray-400">
          © DECOLATION LINE 2009 | {new Date().getFullYear()} All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
