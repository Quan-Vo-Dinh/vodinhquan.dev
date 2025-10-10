// Core Portfolio Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string;
  location: string;
  bio: string;
  cvUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  id: string;
  platform:
    | "linkedin"
    | "github"
    | "instagram"
    | "twitter"
    | "facebook"
    | "other";
  url: string;
  username?: string;
  isVisible: boolean;
  order: number;
}

export interface TechStack {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "design" | "other";
  iconName: string; // Icon component name
  proficiencyLevel: 1 | 2 | 3 | 4 | 5; // 1-5 scale
  yearsOfExperience?: number;
  isVisible: boolean;
  order: number;
}

export interface Skill {
  id: string;
  title: string;
  description?: string;
  category: "technical" | "soft" | "language" | "other";
  proficiencyLevel: 1 | 2 | 3 | 4 | 5;
  isVisible: boolean;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: ProjectImage[];
  status: "completed" | "in-progress" | "planned" | "archived";
  featured: boolean;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  myRole?: string;
  challenges?: string;
  learnings?: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
  type: "full-time" | "part-time" | "contract" | "internship" | "freelance";
  location: string;
  locationType: "onsite" | "remote" | "hybrid";
  startDate: string;
  endDate?: string; // null means current job
  isCurrentJob: boolean;
  companyLogo?: string;
  companyWebsite?: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  provider: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate: string;
  expiryDate?: string;
  skills?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  grade?: string;
  gpa?: number;
  maxGpa?: number;
  activities?: string[];
  certificates?: Certificate[];
  relevantCourses?: string[];
  startDate: string;
  endDate?: string; // null means currently studying
  isCurrentStudy: boolean;
  institutionLogo?: string;
  institutionWebsite?: string;
  location: string;
  isVisible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  images: MemoryImage[];
  tags: string[];
  location?: string;
  mood?: "happy" | "excited" | "proud" | "grateful" | "nostalgic" | "other";
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

// Portfolio Settings
export interface PortfolioSettings {
  id: string;
  theme: "light" | "dark" | "auto";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  showNavigation: boolean;
  showSidebar: boolean;
  enableAnimations: boolean;
  enableParticles: boolean;
  socialLinksPosition: "sidebar" | "footer" | "both";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  googleAnalyticsId?: string;
  isMaintenanceMode: boolean;
  customCss?: string;
  customJs?: string;
  updatedAt: string;
}

// Navigation
export interface NavigationItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  isVisible: boolean;
  order: number;
  isExternal: boolean;
  url?: string; // for external links
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
  error?: string;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface UpdateUserForm {
  name?: string;
  title?: string;
  location?: string;
  bio?: string;
  avatar?: File;
  cvFile?: File;
}

export interface CreateProjectForm {
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: File[];
  status: Project["status"];
  featured: boolean;
  startDate: string;
  endDate?: string;
  teamSize?: number;
  myRole?: string;
  challenges?: string;
  learnings?: string;
}

// Store Types
export interface AppState {
  isLoading: boolean;
  error: string | null;
  currentSection: string;
  isMobileMenuOpen: boolean;
  theme: "light" | "dark";
}

// Hook Types
export interface UsePortfolioDataResult {
  user: User | null;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  memories: Memory[];
  skills: Skill[];
  techStack: TechStack[];
  socialLinks: SocialLink[];
  settings: PortfolioSettings | null;
  navigation: NavigationItem[];
  isLoading: boolean;
  error: string | null;
}

// Utility Types
export type SortOrder = "asc" | "desc";
export type SortField =
  | "order"
  | "createdAt"
  | "updatedAt"
  | "title"
  | "name"
  | "date";

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

export interface FilterOptions {
  isVisible?: boolean;
  featured?: boolean;
  category?: string;
  status?: string;
  type?: string;
}
