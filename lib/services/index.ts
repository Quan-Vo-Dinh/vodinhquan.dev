// Re-export all services for easier imports
export * from "./api-client";
export * from "./api-services";

// Mock services are available via direct import when needed
// import { getMockServices } from './mock-services';

// Static services for production deployment without backend
export * from "./static-services";
