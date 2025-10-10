import {
  userService as apiUserService,
  projectService as apiProjectService,
  experienceService as apiExperienceService,
  educationService as apiEducationService,
  memoryService as apiMemoryService,
  navigationService as apiNavigationService,
} from "./api-services";

import {
  staticUserService,
  staticProjectService,
  staticExperienceService,
  staticEducationService,
  staticMemoryService,
  staticNavigationService,
} from "./static-services";

// Environment-based service configuration
const USE_STATIC_SERVICES =
  process.env.NODE_ENV === "production" ||
  process.env.NEXT_PUBLIC_USE_STATIC_SERVICES === "true";

// Service selection based on environment
export const userService = USE_STATIC_SERVICES
  ? staticUserService
  : apiUserService;
export const projectService = USE_STATIC_SERVICES
  ? staticProjectService
  : apiProjectService;
export const experienceService = USE_STATIC_SERVICES
  ? staticExperienceService
  : apiExperienceService;
export const educationService = USE_STATIC_SERVICES
  ? staticEducationService
  : apiEducationService;
export const memoryService = USE_STATIC_SERVICES
  ? staticMemoryService
  : apiMemoryService;
export const navigationService = USE_STATIC_SERVICES
  ? staticNavigationService
  : apiNavigationService;

// Export type for service configuration
export type ServiceConfig = {
  userService: typeof userService;
  projectService: typeof projectService;
  experienceService: typeof experienceService;
  educationService: typeof educationService;
  memoryService: typeof memoryService;
  navigationService: typeof navigationService;
};

export const services: ServiceConfig = {
  userService,
  projectService,
  experienceService,
  educationService,
  memoryService,
  navigationService,
};
