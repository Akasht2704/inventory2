"use client";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FiArrowUpRight } from "react-icons/fi";

export default function Projects() {
  const projects = [
    {
      title: "Blogging Platform",
      desc: "A full-stack blogging system with authentication, role-based access, dashboard, and MySQL backend.",
      tags: ["React", "Node.js", "Express", "MySQL", "JWT"],
      link: "#",
    },
    {
      title: "Kids E-Commerce",
      desc: "Custom Shopify online store with product pages, cart features, and a playful kids-themed UI.",
      tags: ["Shopify", "Liquid", "JavaScript", "UI Design"],
      link: "#",
    },
    {
      title: "Teacher Timetable System",
      desc: "Smart scheduling system to auto-generate teacher timetables based on subject and availability rules.",
      tags: ["React", "Node.js", "Automation", "Dashboard"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-gray-900 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-14 
                     bg-gradient-to-r from-blue-400 to-purple-400 
                     bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Tilt
                glareEnable={true}
                glareColor="lightblue"
                glarePosition="all"
                glareMaxOpacity={0.25}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                className="rounded-2xl"
              >
                <div
                  className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6
                             shadow-lg hover:shadow-blue-500/30 backdrop-blur transition 
                             cursor-pointer group"
                >
                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-gray-900/60 px-3 py-1 rounded-full 
                                   border border-gray-700 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <a
                    href={p.link}
                    className="flex items-center gap-2 text-blue-400 font-medium 
                               hover:text-blue-500 transition"
                  >
                    View Project <FiArrowUpRight />
                  </a>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
