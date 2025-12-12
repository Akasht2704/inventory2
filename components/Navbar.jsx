

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Login", href: "login" },
  ];

  // 🔥 Detect Active Section on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // offset for better detection

      navLinks.forEach((link) => {
        const sec = document.getElementById(link.href);
        if (!sec) return;

        if (
          scrollPos >= sec.offsetTop &&
          scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
          setActive(link.href);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full fixed top-0 bg-slate-900 backdrop-blur-lg z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-700 to-purple-400 bg-clip-text text-transparent">
          UTKARSH
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`${link.href}`}
              className={`relative transition ${
                active === link.href
                  ? "text-blue-400"
                  : "text-gray-200 hover:text-blue-400"
              }`}
            >
              {link.name}

              {/* Active underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                  active === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/80 backdrop-blur-lg px-6 pb-5 flex flex-col gap-4 text-lg"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={() => setOpen(false)}
                className={`py-2 rounded transition ${
                  active === link.href
                    ? "text-blue-400 bg-gray-800/70"
                    : "text-gray-200 hover:text-blue-300"
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
