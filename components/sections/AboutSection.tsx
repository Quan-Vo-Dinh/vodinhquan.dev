"use client";

import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNode } from "react-icons/fa";
import { Highlighter } from "@/components/ui/highlighter";
import {
  SiTailwindcss,
  SiNotion,
  SiNextdotjs,
  SiShadcnui,
  SiOracle,
  SiMongodb,
  SiReactquery,
  SiPostgresql,
  SiDocker,
  SiSocketdotio,
  SiSwagger,
  SiNestjs,
  SiRedis,
} from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import GradientText from "@/components/ui/gradient-text";
import { AiOutlineAntDesign } from "react-icons/ai";
import { useUser, useTechStack } from "@/hooks/use-portfolio-data";
import { TechStack } from "@/types";

// Icon mapping for tech stack
const iconMap: Record<string, any> = {
  // Client-side
  FaReact,
  SiNextdotjs,
  SiTailwindcss,
  AiOutlineAntDesign,
  SiShadcnui,
  SiReactquery,
  SiNotion, // Using as Zustand placeholder

  // Server-side
  FaNode,
  SiNestjs,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiSocketdotio,
  SiSwagger,
  DiMsqlServer,
  SiOracle,
};

// Brand colors for tech icons
const techColors: Record<string, string> = {
  // Client-side
  FaReact: "#61DAFB", // React cyan
  SiNextdotjs: "#000000", // Next.js black (will use white in dark mode)
  SiTailwindcss: "#06B6D4", // Tailwind cyan
  AiOutlineAntDesign: "#1890FF", // Ant Design blue
  SiShadcnui: "#000000", // Shadcn black
  SiReactquery: "#FF4154", // React Query red
  SiNotion: "#000000", // Notion black (Zustand placeholder)

  // Server-side
  FaNode: "#339933", // Node.js green
  SiNestjs: "#E0234E", // NestJS red
  SiPostgresql: "#336791", // PostgreSQL blue
  SiMongodb: "#47A248", // MongoDB green
  SiRedis: "#DC382D", // Redis red
  SiDocker: "#2496ED", // Docker blue
  SiSocketdotio: "#010101", // Socket.io black
  SiSwagger: "#85EA2D", // Swagger green
  DiMsqlServer: "#CC2927", // SQL Server red
  SiOracle: "#F80000", // Oracle red
};

export default function AboutSection() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: techStack = [], isLoading: techLoading } = useTechStack();

  const isLoading = userLoading || techLoading;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="about"
      className="space-y-12 my-12"
    >
      {/* Greeting Section */}
      <div className="text-center mb-12">
        {/* parent motion.div sẽ animated cả block, tránh áp animation trực tiếp lên <span>/<inline> */}
        <div
          className="text-xl md:text-2xl text-[#F0F0F0] font-light italic mb-7"
          // remove initial/animate here (handled by parent)
        >
          &ldquo;Hey, it&apos;s{" "}
          <Highlighter action="highlight" color="#87CEFA">
            bin
          </Highlighter>
          — just refactoring life again!&rdquo;
        </div>

        {/* <div
          className="text-base md:text-sm text-[#A0A0A0] italic mt-2 leading-relaxed"
          // also plain <p>, parent controls animation
        >
          I&apos;m a{" "}
          <Highlighter action="underline" color="#FF9800">
            “thợ đụng”
          </Highlighter>{" "}
          — đụng đâu làm đó.
        </div> */}
      </div>

      {/* Section Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
        <GradientText>About Me</GradientText>
      </motion.h2>

      {/* Introduction */}
      <motion.div variants={itemVariants} className="mb-12">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          </div>
        ) : (
          <p className="text-lg text-[#F0F0F0] leading-relaxed text-justify">
            {user?.bio || "No bio available"}
          </p>
        )}
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-semibold mb-8">
          <GradientText>Tech Stack</GradientText>
        </h3>
        {isLoading ? (
          <div className="space-y-8">
            {Array(4)
              .fill(0)
              .map((_, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="animate-pulse flex flex-col items-center space-y-2 p-3"
                        >
                          <div className="w-8 h-8 bg-gray-700 rounded"></div>
                          <div className="h-3 bg-gray-700 rounded w-12"></div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Group tech stack by category */}
            {Object.entries(
              techStack.reduce((acc, tech) => {
                const category = tech.category || "other";
                if (!acc[category]) acc[category] = [];
                acc[category].push(tech);
                return acc;
              }, {} as Record<string, TechStack[]>)
            ).map(([category, techs], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2 }}
              >
                <h4 className="text-lg font-medium mb-4 capitalize text-gray-300">
                  {category === "client" && "🎨 Client-side"}
                  {category === "server" && "⚙️ Server-side"}
                  {category === "frontend" && "🎨 Frontend"}
                  {category === "backend" && "⚙️ Backend"}
                  {category === "database" && "🗄️ Database"}
                  {category === "devops" && "🚀 DevOps & Tools"}
                  {category === "design" && "🎭 Design"}
                  {category === "other" && "💻 Other Languages"}
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                  {techs.map((tech, index) => {
                    const IconComponent = iconMap[tech.iconName];
                    const brandColor = techColors[tech.iconName];

                    return (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: categoryIndex * 0.2 + index * 0.05,
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                        }}
                        className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                      >
                        {IconComponent ? (
                          <IconComponent
                            className="w-8 h-8 group-hover:text-[#F0F0F0] transition-colors duration-300"
                            style={
                              {
                                color: brandColor || "#F0F0F0",
                              } as React.CSSProperties
                            }
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center text-xs">
                            ?
                          </div>
                        )}
                        <span className="text-xs text-gray-300 text-center font-light group-hover:text-white transition-colors duration-300">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
