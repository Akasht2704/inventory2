


// "use client";

// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
//     >
//       {/* Background Decorative Circles */}
//       <div className="absolute top-10 left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-center max-w-3xl relative z-10"
//       >
//         {/* Title */}
//         <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
//           Hi, I'm{" "}
//           <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
//             Utkarsh Tiwari
//           </span>
//         </h1>

//         {/* Typing Text Animation */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 1 }}
//           className="mt-4 text-xl md:text-2xl font-semibold text-gray-300"
//         >
//           Full-Stack Developer | Shopper-Ready Solutions | Dashboard Expert
//         </motion.p>

//         {/* Description */}
//         <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
//           I build scalable <span className="text-blue-400">MERN & Next.js</span> applications, 
//           JWT-secured APIs, clean admin dashboards, and modern UI experiences.
//           Experienced in{" "}
//           <span className="text-purple-400">
//             React, Redux Toolkit, Node.js, MySQL, Laravel, Shopify, WordPress
//           </span>
//           .  
//           Passionate about creating real-world solutions, optimizing performance,
//           and delivering production-ready digital products.
//         </p>

//         {/* Buttons */}
//         <div className="mt-8 flex justify-center gap-4">
//           <a
//             href="#projects"
//             className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
//           >
//             🚀 View My Work
//           </a>

//           <a
//             href="#contact"
//             className="px-7 py-3 rounded-xl border border-gray-500 hover:border-blue-400 hover:text-blue-400 transition"
//           >
//             📩 Contact Me
//           </a>
//         </div>

//         {/* Small Highlights */}
//         <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-300 text-sm">
//           <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur">
//             ⚡ React & Next.js Pro
//           </div>
//           <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur">
//             🔐 JWT Auth & APIs
//           </div>
//           <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur">
//             🛒 Shopify & WordPress
//           </div>
//           <div className="bg-gray-800/30 p-4 rounded-xl backdrop-blur">
//             📊 Dashboard & Admin UX
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiLaravel,
  SiShopify,
  SiWordpress,
} from "react-icons/si";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Parallax Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Floating Tech Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-40 left-10 text-blue-400 text-5xl"
      >
        <SiReact />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-20 text-green-400 text-5xl"
      >
        <SiNodedotjs />
      </motion.div>

      <motion.div
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-28 right-20 text-white text-5xl"
      >
        <SiNextdotjs />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center mt-16"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6"
        >
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-500/50 shadow-xl shadow-blue-500/20 overflow-hidden">
            <img
              src="/imgs/akash.png"
              alt="Utkarsh"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/30 animate-pulse"></div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Hey, I'm{" "}
          <span className="bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text">
            Utkarsh Tiwari
          </span>
        </h1>

        {/* Typewriter */}
        <div className="mt-3 text-xl md:text-2xl text-blue-600 font-semibold">
          <TypeAnimation
            sequence={[
              "Full-Stack Developer",
              1500,
              "React & Next.js Specialist",
              1500,
              "API & Auth System Builder",
              1500,
              "Dashboard & UI Designer",
              1500,
              "Shopify / WordPress Expert",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {/* Short Bio */}
        <p className="mt-6 text-gray-900 text-lg max-w-2xl leading-relaxed">
          I build production-ready applications with{" "}
          <span className="text-blue-700">React, Next.js, Node.js</span>, and
          secure backends using{" "}
          <span className="text-purple-700">JWT, MySQL & MongoDB</span>.
          Specialized in dashboards, authentication, e-commerce, and
          converting ideas into scalable digital products.
        </p>

        {/* Code Block */}
        <motion.pre
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-slate-900 border border-gray-700 rounded-xl p-4 text-left text-sm text-gray-100 shadow-lg backdrop-blur max-w-xl w-full"
        >
          {`const developer = {
            name: "Utkarsh Tiwari",
            role: "Full-Stack Engineer",
            skills: ["React", "Next.js", "Node", "MySQL", "Tailwind"],
            passion: "Building real-world digital solutions",
          };`}
        </motion.pre>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="#projects"
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition"
          >
            🚀 View My Work
          </a>

          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-gray-500 hover:border-blue-400 hover:text-blue-400 transition"
          >
            📩 Contact Me
          </a>

          <a
            href="/Utkarsh_Resume.pdf"
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-600/20 transition"
          >
            📄 Download Resume
          </a>
        </div>

        {/* Tech Stack Row */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-4xl text-gray-300">
          <SiReact className="hover:text-blue-400 transition" />
          <SiNextdotjs className="hover:text-white transition" />
          <SiNodedotjs className="hover:text-green-400 transition" />
          <SiMongodb className="hover:text-green-500 transition" />
          <SiMysql className="hover:text-yellow-400 transition" />
          <SiTailwindcss className="hover:text-blue-300 transition" />
          <SiLaravel className="hover:text-red-500 transition" />
          <SiShopify className="hover:text-green-400 transition" />
          <SiWordpress className="hover:text-blue-500 transition" />
        </div>
      </motion.div>
    </section>
  );
}

