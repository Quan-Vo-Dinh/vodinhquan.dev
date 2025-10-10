"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { FocusCards } from "@/components/ui/focus-cards";
import {
  DraggableCardContainer,
  DraggableCardBody,
} from "@/components/ui/draggable-card";
import { FaCamera, FaPenFancy } from "react-icons/fa";
import Image from "next/image";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useMemories } from "@/hooks/use-portfolio-data";
import { Memory } from "@/types";

export default function MemoriesSection() {
  const { data: memories = [], isLoading } = useMemories({ visible: true });

  // Transform memories to focus photos format
  const focusPhotos = memories.map((memory: Memory) => ({
    title: memory.title,
    src:
      memory.images?.[0]?.url ||
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
  }));

  // Create testimonials from memories (using memory descriptions as quotes)
  const testimonials =
    memories.length > 0
      ? memories.slice(0, 3).map((memory: Memory) => ({
          quote: memory.description,
          name: memory.title,
          designation: memory.location || "Life Journey",
          src:
            memory.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }))
      : [
          {
            quote:
              "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
            name: "Sarah Chen",
            designation: "Product Manager at TechFlow",
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            quote:
              "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
            name: "Michael Rodriguez",
            designation: "CTO at InnovateSphere",
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
          {
            quote:
              "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
            name: "Emily Watson",
            designation: "Operations Director at CloudScale",
            src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ];

  // Transform memories to blog posts format
  const blogPosts = memories.map((memory: Memory) => ({
    id: memory.id,
    title: memory.title,
    date: new Date(memory.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
    excerpt: memory.description,
    tags: memory.tags || ["Personal", "Memory"],
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
      id="memories"
      className="space-y-16 my-12"
    >
      {/* Section Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
        <GradientText>My Memories</GradientText>
      </motion.h2>

      {/* Photo Gallery Section */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
          <FaCamera className="w-6 h-6 text-blue-400" />
          <GradientText>Photo Gallery</GradientText>
        </h3>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-64 bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
          </div>
        ) : focusPhotos.length > 0 ? (
          <FocusCards cards={focusPhotos} />
        ) : (
          <div className="text-center text-gray-400 py-8">
            No photos available
          </div>
        )}
      </motion.div>

      {/* Blog Posts Section */}
      <motion.div variants={itemVariants} className="space-y-8">
        <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
          <FaPenFancy className="w-6 h-6 text-purple-400" />
          <GradientText>Blog Posts</GradientText>
        </h3>

        {isLoading ? (
          <div className="space-y-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-pulse"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="h-6 bg-gray-700 rounded w-2/3 mb-2 md:mb-0"></div>
                    <div className="h-6 bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              ))}
          </div>
        ) : blogPosts.length > 0 ? (
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h4 className="text-xl font-semibold text-white mb-2 md:mb-0">
                    {post.title}
                  </h4>
                  <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                    {post.date}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No memories available
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
