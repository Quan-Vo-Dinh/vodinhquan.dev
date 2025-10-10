"use client";

import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";
import GradientText from "@/components/ui/gradient-text";
import { FaBriefcase } from "react-icons/fa";
import { useExperiences } from "@/hooks/use-portfolio-data";
import { Experience } from "@/types";

export default function ExperienceSection() {
  const { data: experiences = [], isLoading } = useExperiences({
    visible: true,
  });

  // Transform experience data to Timeline format
  const timelineData = experiences.map((exp: Experience) => ({
    title: exp.position,
    company: exp.company,
    location: exp.location,
    period: `${new Date(exp.startDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })} – ${
      exp.isCurrentJob
        ? "Present"
        : new Date(exp.endDate!).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
    }`,
    companyUrl: exp.companyWebsite || "#",
    icon: <FaBriefcase className="w-6 h-6 text-white" />,
    achievements: exp.responsibilities,
  }));

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
      id="experience"
      className="space-y-12 my-12"
    >
      {/* Section Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
        <GradientText>Experience</GradientText>
      </motion.h2>

      {isLoading ? (
        <div className="space-y-6">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Timeline data={timelineData} />
      )}
    </motion.div>
  );
}
