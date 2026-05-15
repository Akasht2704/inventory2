



"use client";

import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 px-6 bg-gray-900 relative overflow-hidden"
    >
      {/* Soft Background Glow */}
      <div className="absolute top-32 left-10 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 
                     bg-gradient-to-r from-blue-400 to-purple-400 
                     bg-clip-text text-transparent"
        >
          Contact Me
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-300 mb-12"
        >
          Let’s collaborate, discuss opportunities, or create something amazing together.
        </motion.p>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/40 p-10 rounded-3xl backdrop-blur
                     border border-gray-700 shadow-2xl
                     max-w-xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
            
            <a
              href="mailto:akasht270@gmail.com"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
            >
              <FiMail className="text-3xl" />
              <span>Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/utkarsh-tiwari-097502246/"
              target="_blank"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
            >
              <FiLinkedin className="text-3xl" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Akasht2704"
              target="_blank"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
            >
              <FiGithub className="text-3xl" />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
