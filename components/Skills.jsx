"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "HTML", icon: <SiHtml5 className="text-orange-400" /> },
    { name: "CSS", icon: <SiCss3 className="text-blue-400" /> },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
    { name: "React", icon: <SiReact className="text-blue-400" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-300" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Express", icon: <SiExpress className="text-gray-300" /> },
    { name: "MySQL", icon: <SiMysql className="text-orange-300" /> },
    { name: "Git", icon: <SiGit className="text-red-500" /> },
  ];

  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-12 
                     bg-gradient-to-r from-blue-700 to-purple-400 
                     bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.07 }}
              className="bg-slate-900 border border-gray-700 p-6 
                         flex flex-col items-center rounded-xl 
                         hover:border-blue-400 hover:shadow-lg 
                         hover:shadow-blue-500/20 transition backdrop-blur"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-gray-300 font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
