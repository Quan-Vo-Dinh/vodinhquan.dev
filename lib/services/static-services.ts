// Static services for standalone frontend without backend
// Uses data directly from mock-data.ts with simulated API responses

import {
  mockUser,
  mockProjects,
  mockExperiences,
  mockEducation,
  mockMemories,
  mockSocialLinks,
  mockTechStack,
  mockSkills,
  mockNavigation,
} from "@/data/mock-data";
import {
  ApiResponse,
  PaginatedResponse,
  User,
  Project,
  Experience,
  Education,
  Memory,
  SocialLink,
  TechStack,
  Skill,
  NavigationItem,
} from "@/types";

// Utility function to simulate API delay
const delay = (ms: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to create API response
const createApiResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message: message || "Success",
});

// Utility function to create paginated response
const createPaginatedResponse = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10
): PaginatedResponse<T> => {
  const total = data.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    success: true,
    data: paginatedData,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    message: "Success",
  };
};

// Static User Services
export const staticUserService = {
  getUser: async (): Promise<ApiResponse<User>> => {
    await delay(200);
    return createApiResponse(mockUser);
  },

  getSocialLinks: async (): Promise<ApiResponse<SocialLink[]>> => {
    await delay(150);
    return createApiResponse(mockSocialLinks.filter((link) => link.isVisible));
  },

  getTechStack: async (): Promise<ApiResponse<TechStack[]>> => {
    await delay(200);
    return createApiResponse(mockTechStack.filter((tech) => tech.isVisible));
  },

  getSkills: async (): Promise<ApiResponse<Skill[]>> => {
    await delay(180);
    return createApiResponse(mockSkills.filter((skill) => skill.isVisible));
  },
};

// Static Project Services
export const staticProjectService = {
  getProjects: async (params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    visible?: boolean;
    status?: string;
  }): Promise<PaginatedResponse<Project>> => {
    await delay(400);

    let filteredProjects = [...mockProjects];

    if (params?.visible !== undefined) {
      filteredProjects = filteredProjects.filter(
        (p) => p.isVisible === params.visible
      );
    }

    if (params?.featured !== undefined) {
      filteredProjects = filteredProjects.filter(
        (p) => p.featured === params.featured
      );
    }

    if (params?.status) {
      filteredProjects = filteredProjects.filter(
        (p) => p.status === params.status
      );
    }

    return createPaginatedResponse(
      filteredProjects,
      params?.page,
      params?.limit
    );
  },

  getProject: async (id: string): Promise<ApiResponse<Project>> => {
    await delay(250);
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    return createApiResponse(project);
  },
};

// Static Experience Services
export const staticExperienceService = {
  getExperiences: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    type?: string;
  }): Promise<PaginatedResponse<Experience>> => {
    await delay(300);

    let filteredExperiences = [...mockExperiences];

    if (params?.visible !== undefined) {
      filteredExperiences = filteredExperiences.filter(
        (exp) => exp.isVisible === params.visible
      );
    }

    if (params?.type) {
      filteredExperiences = filteredExperiences.filter(
        (exp) => exp.type === params.type
      );
    }

    return createPaginatedResponse(
      filteredExperiences,
      params?.page,
      params?.limit
    );
  },

  getExperience: async (id: string): Promise<ApiResponse<Experience>> => {
    await delay(200);
    const experience = mockExperiences.find((exp) => exp.id === id);
    if (!experience) {
      throw new Error("Experience not found");
    }
    return createApiResponse(experience);
  },
};

// Static Education Services
export const staticEducationService = {
  getEducation: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
  }): Promise<PaginatedResponse<Education>> => {
    await delay(250);

    let filteredEducation = [...mockEducation];

    if (params?.visible !== undefined) {
      filteredEducation = filteredEducation.filter(
        (edu) => edu.isVisible === params.visible
      );
    }

    return createPaginatedResponse(
      filteredEducation,
      params?.page,
      params?.limit
    );
  },
};

// Static Memory Services
export const staticMemoryService = {
  getMemories: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    featured?: boolean;
    tag?: string;
    mood?: string;
  }): Promise<PaginatedResponse<Memory>> => {
    await delay(350);

    let filteredMemories = [...mockMemories];

    if (params?.visible !== undefined) {
      filteredMemories = filteredMemories.filter(
        (mem) => mem.isVisible === params.visible
      );
    }

    if (params?.featured !== undefined) {
      filteredMemories = filteredMemories.filter(
        (mem) => mem.isFeatured === params.featured
      );
    }

    if (params?.tag) {
      filteredMemories = filteredMemories.filter((mem) =>
        mem.tags?.includes(params.tag!)
      );
    }

    if (params?.mood) {
      filteredMemories = filteredMemories.filter(
        (mem) => mem.mood === params.mood
      );
    }

    return createPaginatedResponse(
      filteredMemories,
      params?.page,
      params?.limit
    );
  },

  getMemory: async (id: string): Promise<ApiResponse<Memory>> => {
    await delay(200);
    const memory = mockMemories.find((mem) => mem.id === id);
    if (!memory) {
      throw new Error("Memory not found");
    }
    return createApiResponse(memory);
  },
};

// Static Navigation Services
export const staticNavigationService = {
  getNavigation: async (): Promise<ApiResponse<NavigationItem[]>> => {
    await delay(100);
    return createApiResponse(
      mockNavigation
        .filter((item) => item.isVisible)
        .sort((a, b) => a.order - b.order)
    );
  },
};

// Export all static services
export const getStaticServices = () => ({
  userService: staticUserService,
  projectService: staticProjectService,
  experienceService: staticExperienceService,
  educationService: staticEducationService,
  memoryService: staticMemoryService,
  navigationService: staticNavigationService,
});
