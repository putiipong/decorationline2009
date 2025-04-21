"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-primary ${
        scrolling
          ? "bg-opacity-90 shadow backdrop-blur-lg text-secondary"
          : `${
              isHomePage
                ? "bg-transparent text-primary"
                : "shadow backdrop-blur-lg text-secondary"
            }`
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center transition duration-500">
        {/* Logo */}
        <Link href="/">
          <h1 className={`text-lg font-bold cursor-pointer transition`}>
            DECOLATION LINE 2009
          </h1>
        </Link>
        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8">
          <Link href="/about" className="text-xs font-semibold hover:text-gray-300 transition">
            ABOUT US
          </Link>
          <Link href="/projects" className="text-xs font-semibold hover:text-gray-300 transition">
            PROJECTS
          </Link> 
          <Link href="/services" className="text-xs font-semibold hover:text-gray-300 transition">
          SERVICES
          </Link>
        </nav>
        <Link href="/contact" className="text-xs font-semibold hover:text-gray-300 transition">
          CONTACT
          </Link>
        {/* CTA Button */}
        {/* <button
          onClick={() => router.push("/contact")}
          className="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded-md text-black font-semibold"
        >
          Contact
        </button> */}
      </div>
    </header>
  );
};

export default Navbar;
