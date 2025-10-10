"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResizableNavbar } from "@/components/ui/resizable-navbar";
import Sidebar from "@/components/Sidebar";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import MemoriesSection from "@/components/sections/MemoriesSection";
import { useNavigation } from "@/hooks/use-portfolio-data";
import { useAppStore } from "@/lib/stores";

export default function Home() {
  const { currentSection, setCurrentSection } = useAppStore();
  const { data: navigation = [], isLoading: navLoading } = useNavigation();

  // Fallback navigation items
  const defaultNavItems = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
    { name: "My Memories", id: "memories" },
  ];

  const navItems = navLoading
    ? defaultNavItems
    : navigation.map((item) => ({
        name: item.name,
        id: item.slug,
      }));

  const renderContent = () => {
    switch (currentSection) {
      case "about":
        return <AboutSection />;
      case "experience":
        return <ExperienceSection />;
      case "education":
        return <EducationSection />;
      case "projects":
        return <ProjectsSection />;
      case "memories":
        return <MemoriesSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0]">
      <ResizableNavbar
        navItems={navItems}
        activeTab={currentSection}
        setActiveTab={setCurrentSection}
      />

      <div className="flex justify-center min-h-screen pt-32 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row max-w-7xl w-full">
          {/* Sidebar center on mobile, left on desktop */}
          <div className="w-full flex justify-center md:block md:w-1/4 md:pr-20 mb-8 md:mb-0 md:sticky md:top-32 md:h-fit">
            <Sidebar />
          </div>
          <main className="flex-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
