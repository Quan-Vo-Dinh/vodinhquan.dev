import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMockServices } from "@/lib/services/mock-services";
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

// Use mock services in development
const USE_MOCK = process.env.NODE_ENV === "development";
const mockServices = getMockServices();

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
    queryFn: USE_MOCK
      ? mockServices.userService.getUser
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

export const useSocialLinks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.socialLinks,
    queryFn: USE_MOCK
      ? mockServices.userService.getSocialLinks
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

export const useTechStack = () => {
  return useQuery({
    queryKey: QUERY_KEYS.techStack,
    queryFn: USE_MOCK
      ? mockServices.userService.getTechStack
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: QUERY_KEYS.skills,
    queryFn: USE_MOCK
      ? mockServices.userService.getSkills
      : () => Promise.reject("API not implemented"),
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
    queryFn: USE_MOCK
      ? () => mockServices.projectService.getProjects(params)
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.project(id),
    queryFn: USE_MOCK
      ? () => mockServices.projectService.getProject(id)
      : () => Promise.reject("API not implemented"),
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
    queryFn: USE_MOCK
      ? () => mockServices.experienceService.getExperiences(params)
      : () => Promise.reject("API not implemented"),
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
    queryFn: USE_MOCK
      ? () => mockServices.educationService.getEducation(params)
      : () => Promise.reject("API not implemented"),
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
    queryFn: USE_MOCK
      ? () => mockServices.memoryService.getMemories(params)
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

// Contact Hook
export const useSendMessage = () => {
  const { setError } = useAppStore();

  return useMutation({
    mutationFn: USE_MOCK
      ? (data: ContactForm) => mockServices.contactService.sendMessage(data)
      : () => Promise.reject("API not implemented"),
    onError: (error: any) => {
      setError(error.response?.data?.message || "Failed to send message");
    },
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: QUERY_KEYS.settings,
    queryFn: USE_MOCK
      ? mockServices.settingsService.getSettings
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};

export const useNavigation = () => {
  return useQuery({
    queryKey: QUERY_KEYS.navigation,
    queryFn: USE_MOCK
      ? mockServices.settingsService.getNavigation
      : () => Promise.reject("API not implemented"),
    select: (data) => data.data,
  });
};
