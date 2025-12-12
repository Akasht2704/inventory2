// "use client";

// import { motion } from "framer-motion";
// import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

// export default function Footer() {
//   return (
//     <footer className="relative py-10 bg-gray-900 border-t border-gray-800 mt-20">

//       {/* Glowing line */}
//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-[2px]
//                       bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"></div>

//       {/* Social Icons */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="flex justify-center gap-8 mb-6"
//       >
//         <a
//           href="https://github.com/your-github"
//           target="_blank"
//           className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
//         >
//           <FiGithub />
//         </a>

//         <a
//           href="https://www.linkedin.com/in/your-profile"
//           target="_blank"
//           className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
//         >
//           <FiLinkedin />
//         </a>

//         <a
//           href="https://instagram.com/your-profile"
//           target="_blank"
//           className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
//         >
//           <FiInstagram />
//         </a>
//       </motion.div>

//       {/* Copyright */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.7 }}
//         className="text-center text-gray-400"
//       >
//         © {new Date().getFullYear()}{" "}
//         <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
//           Utkarsh Tiwari
//         </span>{" "}
//         — All Rights Reserved.
//       </motion.p>
//     </footer>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-black py-10 border-t border-gray-800">

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center gap-8 mb-6"
      >
        <a
          href="https://github.com/your-github"
          target="_blank"
          className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
        >
          <FiGithub />
        </a>

        <a
          href="https://linkedin.com/in/your-profile"
          target="_blank"
          className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
        >
          <FiLinkedin />
        </a>

        <a
          href="https://instagram.com/your-profile"
          target="_blank"
          className="text-gray-400 text-2xl hover:text-white transition-all hover:scale-110"
        >
          <FiInstagram />
        </a>
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()}{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
          Utkarsh Tiwari
        </span>{" "}
        — All Rights Reserved.
      </motion.p>
    </footer>
  );
}
