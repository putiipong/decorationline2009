"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // Detect scroll position and toggle the "scrolling" state
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
  console.log("isHomePage", isHomePage);
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolling
          ? "bg-black bg-opacity-90 shadow-md backdrop-blur-lg"
          : `${
              isHomePage
                ? "bg-transparent"
                : "bg-black bg-opacity-90 shadow-md backdrop-blur-lg"
            }`
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center transition duration-500">
        {/* Logo */}
        <Link href="/">
  <h1 className="text-2xl font-bold text-white cursor-pointer">
    Decoration Line 2009
  </h1>
</Link>
        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8">
          <a
            href="#services"
            className="text-white hover:text-gray-300 transition"
          >
            SERVICES
          </a>
          <a
            href="#projects"
            className="text-white hover:text-gray-300 transition"
          >
            PROJECTS
          </a>
          <a
            href="#about"
            className="text-white hover:text-gray-300 transition"
          >
            ABOUT US
          </a>
        </nav>

        {/* CTA Button */}
        <button className="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded-md text-black font-semibold">
          Contact
        </button>
      </div>
    </header>
  );
};

export default Navbar;
