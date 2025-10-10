import { api } from "./api-client";
import {
  User,
  SocialLink,
  TechStack,
  Skill,
  Project,
  Experience,
  Education,
  Memory,
  ContactMessage,
  PortfolioSettings,
  NavigationItem,
  ApiResponse,
  PaginatedResponse,
  ContactForm,
  UpdateUserForm,
  CreateProjectForm,
} from "@/types";

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  user: "/user",
  userUpdate: "/user",
  socialLinks: "/user/social-links",
  techStack: "/user/tech-stack",
  skills: "/user/skills",

  // Portfolio content endpoints
  projects: "/projects",
  experiences: "/experiences",
  education: "/education",
  memories: "/memories",

  // Settings endpoints
  settings: "/settings",
  navigation: "/navigation",

  // Contact endpoints
  contact: "/contact",
  messages: "/contact/messages",

  // File upload endpoints
  upload: "/upload",
  uploadAvatar: "/upload/avatar",
  uploadCV: "/upload/cv",
  uploadProjectImages: "/upload/project-images",
  uploadMemoryImages: "/upload/memory-images",
} as const;

// User Services
export const userService = {
  // Get user profile
  getUser: (): Promise<ApiResponse<User>> => {
    return api.get(API_ENDPOINTS.user);
  },

  // Update user profile
  updateUser: (data: UpdateUserForm): Promise<ApiResponse<User>> => {
    return api.put(API_ENDPOINTS.userUpdate, data);
  },

  // Social Links
  getSocialLinks: (): Promise<ApiResponse<SocialLink[]>> => {
    return api.get(API_ENDPOINTS.socialLinks);
  },

  createSocialLink: (
    data: Omit<SocialLink, "id">
  ): Promise<ApiResponse<SocialLink>> => {
    return api.post(API_ENDPOINTS.socialLinks, data);
  },

  updateSocialLink: (
    id: string,
    data: Partial<SocialLink>
  ): Promise<ApiResponse<SocialLink>> => {
    return api.put(`${API_ENDPOINTS.socialLinks}/${id}`, data);
  },

  deleteSocialLink: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.socialLinks}/${id}`);
  },

  reorderSocialLinks: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<SocialLink[]>> => {
    return api.patch(`${API_ENDPOINTS.socialLinks}/reorder`, { items: data });
  },

  // Tech Stack
  getTechStack: (): Promise<ApiResponse<TechStack[]>> => {
    return api.get(API_ENDPOINTS.techStack);
  },

  createTechStack: (
    data: Omit<TechStack, "id">
  ): Promise<ApiResponse<TechStack>> => {
    return api.post(API_ENDPOINTS.techStack, data);
  },

  updateTechStack: (
    id: string,
    data: Partial<TechStack>
  ): Promise<ApiResponse<TechStack>> => {
    return api.put(`${API_ENDPOINTS.techStack}/${id}`, data);
  },

  deleteTechStack: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.techStack}/${id}`);
  },

  reorderTechStack: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<TechStack[]>> => {
    return api.patch(`${API_ENDPOINTS.techStack}/reorder`, { items: data });
  },

  // Skills
  getSkills: (): Promise<ApiResponse<Skill[]>> => {
    return api.get(API_ENDPOINTS.skills);
  },

  createSkill: (data: Omit<Skill, "id">): Promise<ApiResponse<Skill>> => {
    return api.post(API_ENDPOINTS.skills, data);
  },

  updateSkill: (
    id: string,
    data: Partial<Skill>
  ): Promise<ApiResponse<Skill>> => {
    return api.put(`${API_ENDPOINTS.skills}/${id}`, data);
  },

  deleteSkill: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.skills}/${id}`);
  },

  reorderSkills: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<Skill[]>> => {
    return api.patch(`${API_ENDPOINTS.skills}/reorder`, { items: data });
  },
};

// Project Services
export const projectService = {
  // Get all projects
  getProjects: (params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    visible?: boolean;
    status?: string;
  }): Promise<PaginatedResponse<Project>> => {
    return api.get(API_ENDPOINTS.projects, { params });
  },

  // Get single project
  getProject: (id: string): Promise<ApiResponse<Project>> => {
    return api.get(`${API_ENDPOINTS.projects}/${id}`);
  },

  // Create project
  createProject: (data: CreateProjectForm): Promise<ApiResponse<Project>> => {
    return api.post(API_ENDPOINTS.projects, data);
  },

  // Update project
  updateProject: (
    id: string,
    data: Partial<Project>
  ): Promise<ApiResponse<Project>> => {
    return api.put(`${API_ENDPOINTS.projects}/${id}`, data);
  },

  // Delete project
  deleteProject: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.projects}/${id}`);
  },

  // Toggle project featured
  toggleFeatured: (id: string): Promise<ApiResponse<Project>> => {
    return api.patch(`${API_ENDPOINTS.projects}/${id}/toggle-featured`);
  },

  // Toggle project visibility
  toggleVisibility: (id: string): Promise<ApiResponse<Project>> => {
    return api.patch(`${API_ENDPOINTS.projects}/${id}/toggle-visibility`);
  },

  // Reorder projects
  reorderProjects: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<Project[]>> => {
    return api.patch(`${API_ENDPOINTS.projects}/reorder`, { items: data });
  },
};

// Experience Services
export const experienceService = {
  // Get all experiences
  getExperiences: (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    type?: string;
  }): Promise<PaginatedResponse<Experience>> => {
    return api.get(API_ENDPOINTS.experiences, { params });
  },

  // Get single experience
  getExperience: (id: string): Promise<ApiResponse<Experience>> => {
    return api.get(`${API_ENDPOINTS.experiences}/${id}`);
  },

  // Create experience
  createExperience: (
    data: Omit<Experience, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Experience>> => {
    return api.post(API_ENDPOINTS.experiences, data);
  },

  // Update experience
  updateExperience: (
    id: string,
    data: Partial<Experience>
  ): Promise<ApiResponse<Experience>> => {
    return api.put(`${API_ENDPOINTS.experiences}/${id}`, data);
  },

  // Delete experience
  deleteExperience: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.experiences}/${id}`);
  },

  // Toggle visibility
  toggleVisibility: (id: string): Promise<ApiResponse<Experience>> => {
    return api.patch(`${API_ENDPOINTS.experiences}/${id}/toggle-visibility`);
  },

  // Reorder experiences
  reorderExperiences: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<Experience[]>> => {
    return api.patch(`${API_ENDPOINTS.experiences}/reorder`, { items: data });
  },
};

// Education Services
export const educationService = {
  // Get all education
  getEducation: (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
  }): Promise<PaginatedResponse<Education>> => {
    return api.get(API_ENDPOINTS.education, { params });
  },

  // Get single education
  getEducationById: (id: string): Promise<ApiResponse<Education>> => {
    return api.get(`${API_ENDPOINTS.education}/${id}`);
  },

  // Create education
  createEducation: (
    data: Omit<Education, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Education>> => {
    return api.post(API_ENDPOINTS.education, data);
  },

  // Update education
  updateEducation: (
    id: string,
    data: Partial<Education>
  ): Promise<ApiResponse<Education>> => {
    return api.put(`${API_ENDPOINTS.education}/${id}`, data);
  },

  // Delete education
  deleteEducation: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.education}/${id}`);
  },

  // Toggle visibility
  toggleVisibility: (id: string): Promise<ApiResponse<Education>> => {
    return api.patch(`${API_ENDPOINTS.education}/${id}/toggle-visibility`);
  },

  // Reorder education
  reorderEducation: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<Education[]>> => {
    return api.patch(`${API_ENDPOINTS.education}/reorder`, { items: data });
  },
};

// Memory Services
export const memoryService = {
  // Get all memories
  getMemories: (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    featured?: boolean;
    tag?: string;
    mood?: string;
  }): Promise<PaginatedResponse<Memory>> => {
    return api.get(API_ENDPOINTS.memories, { params });
  },

  // Get single memory
  getMemory: (id: string): Promise<ApiResponse<Memory>> => {
    return api.get(`${API_ENDPOINTS.memories}/${id}`);
  },

  // Create memory
  createMemory: (
    data: Omit<Memory, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Memory>> => {
    return api.post(API_ENDPOINTS.memories, data);
  },

  // Update memory
  updateMemory: (
    id: string,
    data: Partial<Memory>
  ): Promise<ApiResponse<Memory>> => {
    return api.put(`${API_ENDPOINTS.memories}/${id}`, data);
  },

  // Delete memory
  deleteMemory: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.memories}/${id}`);
  },

  // Toggle featured
  toggleFeatured: (id: string): Promise<ApiResponse<Memory>> => {
    return api.patch(`${API_ENDPOINTS.memories}/${id}/toggle-featured`);
  },

  // Toggle visibility
  toggleVisibility: (id: string): Promise<ApiResponse<Memory>> => {
    return api.patch(`${API_ENDPOINTS.memories}/${id}/toggle-visibility`);
  },

  // Reorder memories
  reorderMemories: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<Memory[]>> => {
    return api.patch(`${API_ENDPOINTS.memories}/reorder`, { items: data });
  },
};

// Contact Services
export const contactService = {
  // Send contact message
  sendMessage: (data: ContactForm): Promise<ApiResponse<ContactMessage>> => {
    return api.post(API_ENDPOINTS.contact, data);
  },

  // Get all messages (admin only)
  getMessages: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<ContactMessage>> => {
    return api.get(API_ENDPOINTS.messages, { params });
  },

  // Get single message (admin only)
  getMessage: (id: string): Promise<ApiResponse<ContactMessage>> => {
    return api.get(`${API_ENDPOINTS.messages}/${id}`);
  },

  // Update message status (admin only)
  updateMessageStatus: (
    id: string,
    status: ContactMessage["status"]
  ): Promise<ApiResponse<ContactMessage>> => {
    return api.patch(`${API_ENDPOINTS.messages}/${id}/status`, { status });
  },

  // Delete message (admin only)
  deleteMessage: (id: string): Promise<ApiResponse<void>> => {
    return api.delete(`${API_ENDPOINTS.messages}/${id}`);
  },
};

// Settings Services
export const settingsService = {
  // Get portfolio settings
  getSettings: (): Promise<ApiResponse<PortfolioSettings>> => {
    return api.get(API_ENDPOINTS.settings);
  },

  // Update portfolio settings
  updateSettings: (
    data: Partial<PortfolioSettings>
  ): Promise<ApiResponse<PortfolioSettings>> => {
    return api.put(API_ENDPOINTS.settings, data);
  },
};

// Navigation Services
export const navigationService = {
  // Get navigation items
  getNavigation: (): Promise<ApiResponse<NavigationItem[]>> => {
    return api.get(API_ENDPOINTS.navigation);
  },

  // Update navigation items
  updateNavigation: (
    data: NavigationItem[]
  ): Promise<ApiResponse<NavigationItem[]>> => {
    return api.put(API_ENDPOINTS.navigation, { items: data });
  },

  // Reorder navigation items
  reorderNavigation: (
    data: { id: string; order: number }[]
  ): Promise<ApiResponse<NavigationItem[]>> => {
    return api.patch(`${API_ENDPOINTS.navigation}/reorder`, { items: data });
  },
};

// File Upload Services
export const uploadService = {
  // Upload single file
  uploadFile: (
    file: File,
    type: "avatar" | "cv" | "project" | "memory"
  ): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return api.post(API_ENDPOINTS.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload multiple files
  uploadFiles: (
    files: File[],
    type: "project" | "memory"
  ): Promise<ApiResponse<{ urls: string[] }>> => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append("type", type);

    return api.post(API_ENDPOINTS.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload avatar
  uploadAvatar: (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append("avatar", file);

    return api.post(API_ENDPOINTS.uploadAvatar, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Upload CV
  uploadCV: (file: File): Promise<ApiResponse<{ url: string }>> => {
    const formData = new FormData();
    formData.append("cv", file);

    return api.post(API_ENDPOINTS.uploadCV, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
