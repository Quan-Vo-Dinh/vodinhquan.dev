"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import { FaGraduationCap, FaCertificate } from "react-icons/fa";
import { SiUdemy, SiLinkedin, SiCoursera } from "react-icons/si";
import { useEducation } from "@/hooks/use-portfolio-data";
import { Education } from "@/types";

export default function EducationSection() {
  const { data: educationList = [], isLoading } = useEducation({
    visible: true,
  });

  const education = educationList[0]; // Get first education entry

  // Use certificates if available, otherwise map activities
  const certifications =
    education?.certificates?.map((cert) => {
      const isCoursera = cert.provider.toLowerCase().includes("coursera");
      const isIBM = cert.provider.toLowerCase().includes("ibm");

      return {
        title: cert.title,
        provider: cert.provider,
        date: new Date(cert.issueDate).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        icon:
          isCoursera || isIBM ? (
            <SiCoursera className="w-5 h-5 text-blue-500" />
          ) : (
            <FaCertificate className="w-5 h-5 text-blue-500" />
          ),
        credentialUrl: cert.credentialUrl,
        skills: cert.skills,
      };
    }) ||
    education?.activities?.map((activity, index) => {
      const isCoursera = activity.toLowerCase().includes("coursera");
      const isIBM = activity.toLowerCase().includes("ibm");

      return {
        title: activity,
        provider: isCoursera ? "Coursera" : isIBM ? "IBM/Coursera" : "Other",
        date: "2024 - 2025",
        icon:
          isCoursera || isIBM ? (
            <SiCoursera className="w-5 h-5 text-blue-500" />
          ) : (
            <FaCertificate className="w-5 h-5 text-blue-500" />
          ),
        credentialUrl: undefined,
        skills: undefined,
      };
    }) ||
    [];

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
      id="education"
      className="space-y-12 my-12"
    >
      {/* Section Title */}
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
        <GradientText>Education</GradientText>
      </motion.h2>

      {/* Degree Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
          <FaGraduationCap className="w-6 h-6 text-blue-400" />
          <GradientText>Degree</GradientText>
        </h3>
        {isLoading ? (
          <div className="space-y-3 ml-9 animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          </div>
        ) : education ? (
          <div className="space-y-3 ml-9">
            <h4 className="text-xl font-medium text-[#F0F0F0]">
              {education.institution}
            </h4>
            <p className="text-base text-gray-400 font-light">
              {education.degree} in {education.field}
            </p>
            <motion.span
              className="text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-full inline-block border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              {new Date(education.startDate).getFullYear()} –{" "}
              {education.isCurrentStudy
                ? "Present"
                : new Date(education.endDate!).getFullYear()}
            </motion.span>
          </div>
        ) : (
          <div className="ml-9 text-gray-400">No education data available</div>
        )}
      </motion.div>

      {/* Certifications Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
          <FaCertificate className="w-6 h-6 text-yellow-400" />
          <GradientText>Certifications</GradientText>
        </h3>
        {isLoading ? (
          <div className="space-y-6 ml-9">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex items-start space-x-4 p-4"
                >
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-700 rounded w-3/4 mb-1"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-6 bg-gray-700 rounded-full"></div>
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-6 ml-9">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className={`flex items-start space-x-4 p-4 bg-transparent hover:bg-white/5 rounded-lg transition-all duration-300 ${
                  cert.credentialUrl ? "cursor-pointer" : ""
                }`}
                onClick={() =>
                  cert.credentialUrl &&
                  window.open(cert.credentialUrl, "_blank")
                }
              >
                <div className="flex-shrink-0 mt-1">{cert.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-lg font-medium text-[#F0F0F0]">
                      {cert.title}
                    </h4>
                    {cert.credentialUrl && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{cert.provider}</p>
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <motion.span
                    className="text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {cert.date}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
