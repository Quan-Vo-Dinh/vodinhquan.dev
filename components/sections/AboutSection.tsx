"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaJs,
  FaFigma,
  FaGithub,
  FaNode,
  FaJava,
  FaHtml5,
  FaLinux,
  FaGitlab,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiTableau,
  SiPostman,
  SiNotion,
  SiClickup,
  SiJira,
  SiOpenai,
  SiNextdotjs,
  SiTypescript,
  SiNextui,
  SiShadcnui,
  SiOracle,
  SiMongodb,
  SiReactquery,
  SiRefine,
} from "react-icons/si";
import { PiFileCppFill } from "react-icons/pi";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { DiMsqlServer } from "react-icons/di";
import GradientText from "@/components/ui/gradient-text";
import { AiOutlineAntDesign } from "react-icons/ai";
import { useUser, useTechStack, useSkills } from "@/hooks/use-portfolio-data";
import { TechStack, Skill } from "@/types";

// Icon mapping
const iconMap: Record<string, any> = {
  FaHtml5,
  SiTypescript,
  PiFileCppFill,
  FaReact,
  SiNextdotjs,
  SiRefine,
  SiTailwindcss,
  SiShadcnui,
  AiOutlineAntDesign,
  SiReactquery,
  SiNotion,
  FaNode,
  SiMongodb,
  DiMsqlServer,
  SiOracle,
  FaFigma,
  FaGithub,
  FaGitlab,
  FaLinux,
  SiPostman,
};

export default function AboutSection() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: techStack = [], isLoading: techLoading } = useTechStack();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();

  const isLoading = userLoading || techLoading || skillsLoading;

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

      {/* Professional Skills */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">
          <GradientText>Professional Skills</GradientText>
        </h3>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex items-start space-x-2"
                >
                  <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-2"
              >
                <motion.div
                  className="w-2 h-2 bg-gradient-to-r from-white to-gray-400 rounded-full mt-2 flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-sm text-[#F0F0F0] leading-relaxed">
                  {skill.title}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-semibold mb-6">
          <GradientText>Stack</GradientText>
        </h3>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-6">
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex flex-col items-center space-y-3 p-4"
                >
                  <div className="w-10 h-10 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-16"></div>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {techStack.map((tech, index) => {
              const IconComponent = iconMap[tech.iconName];
              return (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                  }}
                  className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  {IconComponent ? (
                    <IconComponent className="w-10 h-10 text-[#F0F0F0]" />
                  ) : (
                    <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center text-xs">
                      ?
                    </div>
                  )}
                  <span className="text-sm text-[#F0F0F0] text-center font-light">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
