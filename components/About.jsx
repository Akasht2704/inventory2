"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-900 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        {/* Content Wrapper */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          
          {/* Left Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 shadow-xl backdrop-blur">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm <span className="text-blue-400 font-semibold">Utkarsh Tiwari</span>, 
                a passionate full-stack developer who loves building
                real-world, production-ready digital products.  
                My focus is creating fast, scalable, and clean web applications using
                <span className="text-blue-400"> React, Next.js, Node.js, Express, MySQL,</span> 
                and modern UI frameworks like 
                <span className="text-purple-400"> Tailwind CSS</span>.
                <br /><br />
                I’ve built full authentication systems, admin dashboards, 
                blogging platforms, APIs, e-commerce features, and client-ready websites.
                I enjoy transforming ideas into polished user experiences while writing
                clean, maintainable, and scalable code.
              </p>
            </div>
          </motion.div>

          {/* Right Highlights / Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Highlight Box 1 */}
            <div className="p-6 bg-gray-800/40 border border-gray-700 rounded-2xl backdrop-blur hover:border-blue-400 transition">
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                🚀 What I Do
              </h3>
              <p className="text-gray-300">
                I build full-stack applications, secure APIs, admin panels,
                dashboards, custom CMS systems, and modern UI components.
              </p>
            </div>

            {/* Highlight Box 2 */}
            <div className="p-6 bg-gray-800/40 border border-gray-700 rounded-2xl backdrop-blur hover:border-purple-400 transition">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                ⚡ Core Expertise
              </h3>
              <ul className="text-gray-300 space-y-1 list-disc list-inside">
                <li>React, Next.js, Redux Toolkit</li>
                <li>Node.js, Express, JWT Authentication</li>
                <li>MySQL, MongoDB, Prisma ORM</li>
                <li>Tailwind CSS, UI/UX focused design</li>
                <li>REST APIs & real-world scalable systems</li>
              </ul>
            </div>

            {/* Highlight Box 3 */}
            <div className="p-6 bg-gray-800/40 border border-gray-700 rounded-2xl backdrop-blur hover:border-green-400 transition">
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                🎯 My Vision
              </h3>
              <p className="text-gray-300">
                To become a top-tier software engineer capable of building
                sophisticated platforms, mastering cloud technologies, and
                contributing to innovative global projects.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
