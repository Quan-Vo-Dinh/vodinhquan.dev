import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/lib/services/service-config";
import { useAppStore } from "@/lib/stores";
import type {
  User,
  SocialLink,
  TechStack,
  Skill,
  Project,
  Experience,
  Education,
  Memory,
  ContactForm,
  UpdateUserForm,
  CreateProjectForm,
} from "@/types";

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
  settings: ["settings"] as const,
  navigation: ["navigation"] as const,
  messages: ["messages"] as const,
} as const;

// User Hooks
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

// Project Hooks
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
    select: (data) => data.data,
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

// Experience Hooks
export const useExperiences = (params?: {
  page?: number;
  limit?: number;
  visible?: boolean;
  type?: string;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.experiences, params],
    queryFn: () => services.experienceService.getExperiences(params),
    select: (data) => data.data,
  });
};

// Education Hooks
export const useEducation = (params?: {
  page?: number;
  limit?: number;
  visible?: boolean;
}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.education, params],
    queryFn: () => services.educationService.getEducation(params),
    select: (data) => data.data,
  });
};

// Memory Hooks
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
    select: (data) => data.data,
  });
};

// Contact Hook
export const useSendMessage = () => {
  const { setError } = useAppStore();

  return useMutation({
    mutationFn: (data: ContactForm) => {
      // Contact service isn't implemented in static services yet
      // Just return a mock success response
      return Promise.resolve({
        success: true,
        data: { message: "Message sent successfully" },
        message: "Message sent successfully",
      });
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Failed to send message");
    },
  });
};

// Settings Hooks - simplified for now
export const useSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.settings,
    queryFn: () => {
      // Return empty settings for now
      return Promise.resolve({
        success: true,
        data: {},
        message: "Settings loaded",
      });
    },
    select: (data) => data.data,
  });
};

export const useNavigation = () => {
  return useQuery({
    queryKey: QUERY_KEYS.navigation,
    queryFn: services.navigationService.getNavigation,
    select: (data) => data.data,
  });
};
