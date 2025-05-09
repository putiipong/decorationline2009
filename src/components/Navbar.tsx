"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "ABOUT US", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "SERVICES", href: "/services" },
  { name: "CONTACT US", href: "/contact" },
];

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Disclosure
      as="header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolling
          ? "bg-white/90 shadow backdrop-blur text-secondary"
          : isHomePage
          ? "bg-transparent text-primary"
          : "bg-white shadow backdrop-blur text-secondary"
      }`}
    >
      {({ open }) => (
        <>
          <div className="mx-auto container px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <h1 className="text-lg font-bold">DECOLATION LINE 2009</h1>
            </Link>

            {/* Desktop menu */}
            <nav className="hidden md:flex gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs font-semibold hover:text-gray-400 transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Disclosure.Button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                {open ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel
            className={`md:hidden px-6 pb-4 pt-2 transition-all duration-500${
              scrolling
                ? "bg-white/90 shadow backdrop-blur text-secondary"
                : isHomePage
                ? "bg-transparent text-primary"
                : "bg-white shadow backdrop-blur text-secondary"
            }`}
          >
            {({ close }) => (
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium hover:text-primary transition"
                    onClick={()=>close()}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
