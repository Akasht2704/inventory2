// "use client";

// import { motion } from "framer-motion";
// import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

// export default function Contact() {
//   return (
//     <section id="contact" className="py-24 px-6 bg-gray-900 relative overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"></div>

//       <div className="max-w-3xl mx-auto relative z-10 text-center">
        
//         {/* Title */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-5xl font-extrabold mb-6 
//                      bg-gradient-to-r from-blue-400 to-purple-400 
//                      bg-clip-text text-transparent"
//         >
//           Get In Touch
//         </motion.h2>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-lg text-gray-300 mb-10"
//         >
//           I’m always open to discussing new projects, opportunities, or collaborations.
//         </motion.p>

//         {/* Contact Card */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="bg-gray-800/40 p-10 rounded-2xl backdrop-blur border border-gray-700 
//                      shadow-lg hover:shadow-blue-500/20 transition max-w-xl mx-auto"
//         >
//           <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
            
//             {/* Email */}
//             <a
//               href="mailto:your-email@example.com"
//               className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
//             >
//               <FiMail className="text-2xl" />
//               <span>Email</span>
//             </a>

//             {/* LinkedIn */}
//             <a
//               href="https://www.linkedin.com/in/your-profile"
//               target="_blank"
//               className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
//             >
//               <FiLinkedin className="text-2xl" />
//               <span>LinkedIn</span>
//             </a>

//             {/* GitHub */}
//             <a
//               href="https://github.com/your-github"
//               target="_blank"
//               className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
//             >
//               <FiGithub className="text-2xl" />
//               <span>GitHub</span>
//             </a>
//           </div>
//         </motion.div>

//         {/* Footer Text */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="mt-10 text-gray-400 text-sm"
//         >
//           © {new Date().getFullYear()} Utkarsh Tiwari — All Rights Reserved.
//         </motion.p>
//       </div>
//     </section>
//   );
// }



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
              href="mailto:your-email@example.com"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
            >
              <FiMail className="text-3xl" />
              <span>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              className="flex items-center gap-3 text-lg text-gray-300 hover:text-blue-400 transition"
            >
              <FiLinkedin className="text-3xl" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/your-github"
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
