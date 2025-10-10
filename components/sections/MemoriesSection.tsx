"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { CometCard } from "@/components/ui/comet-card";
import {
  FaCamera,
  FaPenFancy,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import Image from "next/image";
import { useMemories } from "@/hooks/use-portfolio-data";
import { Memory } from "@/types";

export default function MemoriesSection() {
  const { data: memories = [], isLoading } = useMemories({ visible: true });

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-96 bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
          </div>
        ) : memories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((memory: Memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CometCard>
                  <button
                    type="button"
                    className="my-4 flex w-full cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-100 md:p-4"
                    aria-label={`View memory ${memory.title}`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "none",
                      opacity: 1,
                    }}
                  >
                    <div className="mx-2 flex-1">
                      <div className="relative mt-2 aspect-[3/4] w-full">
                        <Image
                          src={
                            memory.images?.[0]?.url ||
                            "/memories/vinh-hy-02.JPG"
                          }
                          alt={memory.images?.[0]?.alt || memory.title}
                          fill
                          loading="lazy"
                          className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover saturate-100 brightness-100"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                            opacity: 1,
                            filter: "none",
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-2 flex-shrink-0 p-4 font-mono text-white">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium truncate">
                          {memory.title}
                        </div>
                        <div className="text-xs text-gray-300 opacity-75 capitalize">
                          {memory.mood}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>
                          {new Date(memory.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      {memory.location && (
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FaMapMarkerAlt className="w-3 h-3" />
                          <span className="truncate">{memory.location}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {memory.tags?.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                </CometCard>
              </motion.div>
            ))}
          </div>
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
