"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import GradientText from "@/components/ui/gradient-text";
import { useProjects } from "@/hooks/use-portfolio-data";

export default function ProjectsSection() {
  const { data: projects = [], isLoading } = useProjects({ visible: true });

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
      id="projects"
      className="space-y-12 my-12"
    >
      {/* Section Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
        <GradientText>Projects</GradientText>
      </motion.h2>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              link={project.githubUrl || project.liveUrl || "#"}
              image={project.images[0]?.url || ""}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
