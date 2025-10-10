// Mock services that simulate API calls for development
// These will be used when the backend is not available
import {
  mockUser,
  mockSocialLinks,
  mockTechStack,
  mockSkills,
  mockProjects,
  mockExperiences,
  mockEducation,
  mockMemories,
  mockSettings,
  mockNavigation,
} from "@/data/mock-data";
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

// Utility function to simulate API delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Utility function to create API response
const createApiResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message,
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
  };
};

// Mock User Services
export const mockUserService = {
  getUser: async (): Promise<ApiResponse<User>> => {
    await delay();
    return createApiResponse(mockUser);
  },

  updateUser: async (data: UpdateUserForm): Promise<ApiResponse<User>> => {
    await delay();
    // Process avatar and CV files if provided
    const processedData = {
      ...data,
      avatar:
        data.avatar instanceof File
          ? `/uploads/avatars/${data.avatar.name}`
          : data.avatar,
      cvUrl:
        data.cvFile instanceof File
          ? `/uploads/cv/${data.cvFile.name}`
          : mockUser.cvUrl,
    };
    delete (processedData as any).cvFile; // Remove File object

    const updatedUser: User = {
      ...mockUser,
      ...processedData,
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(updatedUser, "User updated successfully");
  },

  getSocialLinks: async (): Promise<ApiResponse<SocialLink[]>> => {
    await delay();
    return createApiResponse(mockSocialLinks.filter((link) => link.isVisible));
  },

  createSocialLink: async (
    data: Omit<SocialLink, "id">
  ): Promise<ApiResponse<SocialLink>> => {
    await delay();
    const newLink: SocialLink = {
      ...data,
      id: `social-${Date.now()}`,
    };
    return createApiResponse(newLink, "Social link created successfully");
  },

  updateSocialLink: async (
    id: string,
    data: Partial<SocialLink>
  ): Promise<ApiResponse<SocialLink>> => {
    await delay();
    const existingLink = mockSocialLinks.find((link) => link.id === id);
    if (!existingLink) {
      throw new Error("Social link not found");
    }
    const updatedLink = { ...existingLink, ...data };
    return createApiResponse(updatedLink, "Social link updated successfully");
  },

  deleteSocialLink: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    return createApiResponse(undefined, "Social link deleted successfully");
  },

  getTechStack: async (): Promise<ApiResponse<TechStack[]>> => {
    await delay();
    return createApiResponse(mockTechStack.filter((tech) => tech.isVisible));
  },

  getSkills: async (): Promise<ApiResponse<Skill[]>> => {
    await delay();
    return createApiResponse(mockSkills.filter((skill) => skill.isVisible));
  },
};

// Mock Project Services
export const mockProjectService = {
  getProjects: async (params?: {
    page?: number;
    limit?: number;
    featured?: boolean;
    visible?: boolean;
    status?: string;
  }): Promise<PaginatedResponse<Project>> => {
    await delay();
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
    await delay();
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    return createApiResponse(project);
  },

  createProject: async (
    data: CreateProjectForm
  ): Promise<ApiResponse<Project>> => {
    await delay();
    const newProject: Project = {
      ...data,
      id: `project-${Date.now()}`,
      images: [],
      isVisible: true,
      order: mockProjects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(newProject, "Project created successfully");
  },

  updateProject: async (
    id: string,
    data: Partial<Project>
  ): Promise<ApiResponse<Project>> => {
    await delay();
    const existingProject = mockProjects.find((p) => p.id === id);
    if (!existingProject) {
      throw new Error("Project not found");
    }
    const updatedProject = {
      ...existingProject,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(updatedProject, "Project updated successfully");
  },

  deleteProject: async (id: string): Promise<ApiResponse<void>> => {
    await delay();
    return createApiResponse(undefined, "Project deleted successfully");
  },

  toggleFeatured: async (id: string): Promise<ApiResponse<Project>> => {
    await delay();
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    const updatedProject = { ...project, featured: !project.featured };
    return createApiResponse(updatedProject, "Project featured status updated");
  },

  toggleVisibility: async (id: string): Promise<ApiResponse<Project>> => {
    await delay();
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    const updatedProject = { ...project, isVisible: !project.isVisible };
    return createApiResponse(updatedProject, "Project visibility updated");
  },
};

// Mock Experience Services
export const mockExperienceService = {
  getExperiences: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    type?: string;
  }): Promise<PaginatedResponse<Experience>> => {
    await delay();
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
    await delay();
    const experience = mockExperiences.find((exp) => exp.id === id);
    if (!experience) {
      throw new Error("Experience not found");
    }
    return createApiResponse(experience);
  },

  createExperience: async (
    data: Omit<Experience, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Experience>> => {
    await delay();
    const newExperience: Experience = {
      ...data,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(newExperience, "Experience created successfully");
  },
};

// Mock Education Services
export const mockEducationService = {
  getEducation: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
  }): Promise<PaginatedResponse<Education>> => {
    await delay();
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

  createEducation: async (
    data: Omit<Education, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Education>> => {
    await delay();
    const newEducation: Education = {
      ...data,
      id: `edu-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(newEducation, "Education created successfully");
  },
};

// Mock Memory Services
export const mockMemoryService = {
  getMemories: async (params?: {
    page?: number;
    limit?: number;
    visible?: boolean;
    featured?: boolean;
    tag?: string;
    mood?: string;
  }): Promise<PaginatedResponse<Memory>> => {
    await delay();
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
        mem.tags.some((tag) =>
          tag.toLowerCase().includes(params.tag!.toLowerCase())
        )
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
    await delay();
    const memory = mockMemories.find((mem) => mem.id === id);
    if (!memory) {
      throw new Error("Memory not found");
    }
    return createApiResponse(memory);
  },

  createMemory: async (
    data: Omit<Memory, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Memory>> => {
    await delay();
    const newMemory: Memory = {
      ...data,
      id: `memory-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(newMemory, "Memory created successfully");
  },
};

// Mock Contact Services
export const mockContactService = {
  sendMessage: async (
    data: ContactForm
  ): Promise<ApiResponse<ContactMessage>> => {
    await delay();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: "unread",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(newMessage, "Message sent successfully");
  },
};

// Mock Settings Services
export const mockSettingsService = {
  getSettings: async (): Promise<ApiResponse<PortfolioSettings>> => {
    await delay();
    return createApiResponse(mockSettings);
  },

  updateSettings: async (
    data: Partial<PortfolioSettings>
  ): Promise<ApiResponse<PortfolioSettings>> => {
    await delay();
    const updatedSettings = {
      ...mockSettings,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return createApiResponse(updatedSettings, "Settings updated successfully");
  },

  getNavigation: async (): Promise<ApiResponse<NavigationItem[]>> => {
    await delay();
    return createApiResponse(mockNavigation.filter((nav) => nav.isVisible));
  },

  updateNavigation: async (
    data: NavigationItem[]
  ): Promise<ApiResponse<NavigationItem[]>> => {
    await delay();
    return createApiResponse(data, "Navigation updated successfully");
  },
};

// Use mock services by default in development
const USE_MOCK_SERVICES =
  process.env.NEXT_PUBLIC_USE_MOCK_SERVICES === "true" ||
  process.env.NODE_ENV === "development";

// Export the appropriate services based on environment
export const getMockServices = () => ({
  userService: mockUserService,
  projectService: mockProjectService,
  experienceService: mockExperienceService,
  educationService: mockEducationService,
  memoryService: mockMemoryService,
  contactService: mockContactService,
  settingsService: mockSettingsService,
});

export { USE_MOCK_SERVICES };
