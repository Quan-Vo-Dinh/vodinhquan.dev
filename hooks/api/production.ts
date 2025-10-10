// Production-only hooks for static services
// This file contains only read operations that work with static services
import { useQuery } from "@tanstack/react-query";
import { services } from "@/lib/services/service-config";

// Query Keys
export const QUERY_KEYS = {
  user: ["user"] as const,
  socialLinks: ["user", "social-links"] as const,
  techStack: ["user", "tech-stack"] as const,
  skills: ["user", "skills"] as const,
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  experiences: ["experiences"] as const,
  experience: (id: string) => ["experiences", id] as const,
  education: ["education"] as const,
  educationItem: (id: string) => ["education", id] as const,
  memories: ["memories"] as const,
  memory: (id: string) => ["memories", id] as const,
  navigation: ["navigation"] as const,
} as const;

// User Hooks (Read-only)
export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: services.userService.getUser,
    select: (data) => data.data,
  });
};

export const useSocialLinks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.socialLinks,
    queryFn: services.userService.getSocialLinks,
    select: (data) => data.data,
  });
};

export const useTechStack = () => {
  return useQuery({
    queryKey: QUERY_KEYS.techStack,
    queryFn: services.userService.getTechStack,
    select: (data) => data.data,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: QUERY_KEYS.skills,
    queryFn: services.userService.getSkills,
    select: (data) => data.data,
  });
};

// Project Hooks (Read-only)
export const useProjects = (params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
  visible?: boolean;
  status?: string;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.projects, params],
    queryFn: () => services.projectService.getProjects(params),
    select: (data) => data,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.project(id),
    queryFn: () => services.projectService.getProject(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Experience Hooks (Read-only)
export const useExperiences = (params?: {
  page?: number;
  limit?: number;
  visible?: boolean;
  type?: string;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.experiences, params],
    queryFn: () => services.experienceService.getExperiences(params),
    select: (data) => data,
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.experience(id),
    queryFn: () => services.experienceService.getExperience(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Education Hooks (Read-only)
export const useEducation = (params?: {
  page?: number;
  limit?: number;
  visible?: boolean;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.education, params],
    queryFn: () => services.educationService.getEducation(params),
    select: (data) => data,
  });
};

// Memory Hooks (Read-only)
export const useMemories = (params?: {
  page?: number;
  limit?: number;
  visible?: boolean;
  featured?: boolean;
  tag?: string;
  mood?: string;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.memories, params],
    queryFn: () => services.memoryService.getMemories(params),
    select: (data) => data,
  });
};

export const useMemory = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.memory(id),
    queryFn: () => services.memoryService.getMemory(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

// Navigation Hook
export const useNavigation = () => {
  return useQuery({
    queryKey: QUERY_KEYS.navigation,
    queryFn: services.navigationService.getNavigation,
    select: (data) => data.data,
  });
};
