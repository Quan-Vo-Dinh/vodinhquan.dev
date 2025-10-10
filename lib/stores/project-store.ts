import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Project, SortOptions, FilterOptions } from "@/types";

interface ProjectStore {
  // State
  projects: Project[];
  featuredProjects: Project[];
  isLoading: boolean;
  error: string | null;

  // Filters and sorting
  filters: FilterOptions;
  sortOptions: SortOptions;
  searchQuery: string;

  // Actions
  setProjects: (projects: Project[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Individual project actions
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;

  // Filter and search actions
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSortOptions: (options: SortOptions) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;

  // Computed getters
  getFilteredProjects: () => Project[];
  getFeaturedProjects: () => Project[];
  getVisibleProjects: () => Project[];
  getProjectById: (id: string) => Project | undefined;
  getProjectsByTechnology: (tech: string) => Project[];
  getProjectsByStatus: (status: Project["status"]) => Project[];

  clearError: () => void;
  reset: () => void;
}

const initialState = {
  projects: [],
  featuredProjects: [],
  isLoading: false,
  error: null,
  filters: {},
  sortOptions: {
    field: "order" as const,
    order: "asc" as const,
  },
  searchQuery: "",
};

export const useProjectStore = create<ProjectStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic setters
      setProjects: (projects) => {
        const featuredProjects = projects.filter(
          (p) => p.featured && p.isVisible
        );
        set({ projects, featuredProjects }, false, "setProjects");
      },

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Individual project actions
      addProject: (project) =>
        set(
          (state) => {
            const newProjects = [...state.projects, project].sort(
              (a, b) => a.order - b.order
            );
            const featuredProjects = newProjects.filter(
              (p) => p.featured && p.isVisible
            );
            return { projects: newProjects, featuredProjects };
          },
          false,
          "addProject"
        ),

      updateProject: (id, updates) =>
        set(
          (state) => {
            const newProjects = state.projects.map((project) =>
              project.id === id ? { ...project, ...updates } : project
            );
            const featuredProjects = newProjects.filter(
              (p) => p.featured && p.isVisible
            );
            return { projects: newProjects, featuredProjects };
          },
          false,
          "updateProject"
        ),

      removeProject: (id) =>
        set(
          (state) => {
            const newProjects = state.projects.filter(
              (project) => project.id !== id
            );
            const featuredProjects = newProjects.filter(
              (p) => p.featured && p.isVisible
            );
            return { projects: newProjects, featuredProjects };
          },
          false,
          "removeProject"
        ),

      toggleProjectFeatured: (id) =>
        set(
          (state) => {
            const newProjects = state.projects.map((project) =>
              project.id === id
                ? { ...project, featured: !project.featured }
                : project
            );
            const featuredProjects = newProjects.filter(
              (p) => p.featured && p.isVisible
            );
            return { projects: newProjects, featuredProjects };
          },
          false,
          "toggleProjectFeatured"
        ),

      toggleProjectVisibility: (id) =>
        set(
          (state) => {
            const newProjects = state.projects.map((project) =>
              project.id === id
                ? { ...project, isVisible: !project.isVisible }
                : project
            );
            const featuredProjects = newProjects.filter(
              (p) => p.featured && p.isVisible
            );
            return { projects: newProjects, featuredProjects };
          },
          false,
          "toggleProjectVisibility"
        ),

      reorderProjects: (projects) => {
        const featuredProjects = projects.filter(
          (p) => p.featured && p.isVisible
        );
        set({ projects, featuredProjects }, false, "reorderProjects");
      },

      // Filter and search actions
      setFilters: (newFilters) =>
        set(
          (state) => ({ filters: { ...state.filters, ...newFilters } }),
          false,
          "setFilters"
        ),

      setSortOptions: (sortOptions) =>
        set({ sortOptions }, false, "setSortOptions"),

      setSearchQuery: (searchQuery) =>
        set({ searchQuery }, false, "setSearchQuery"),

      clearFilters: () =>
        set({ filters: {}, searchQuery: "" }, false, "clearFilters"),

      // Computed getters
      getFilteredProjects: () => {
        const { projects, filters, sortOptions, searchQuery } = get();
        let filtered = [...projects];

        // Apply visibility filter
        if (filters.isVisible !== undefined) {
          filtered = filtered.filter((p) => p.isVisible === filters.isVisible);
        }

        // Apply featured filter
        if (filters.featured !== undefined) {
          filtered = filtered.filter((p) => p.featured === filters.featured);
        }

        // Apply status filter
        if (filters.status) {
          filtered = filtered.filter((p) => p.status === filters.status);
        }

        // Apply search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query) ||
              p.technologies.some((tech) => tech.toLowerCase().includes(query))
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          let aValue: any;
          let bValue: any;

          switch (sortOptions.field) {
            case "title":
              aValue = a.title;
              bValue = b.title;
              break;
            case "createdAt":
              aValue = a.createdAt;
              bValue = b.createdAt;
              break;
            case "updatedAt":
              aValue = a.updatedAt;
              bValue = b.updatedAt;
              break;
            case "order":
              aValue = a.order;
              bValue = b.order;
              break;
            default:
              aValue = a.order;
              bValue = b.order;
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return sortOptions.order === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }

          if (typeof aValue === "number" && typeof bValue === "number") {
            return sortOptions.order === "asc"
              ? aValue - bValue
              : bValue - aValue;
          }

          return 0;
        });

        return filtered;
      },

      getFeaturedProjects: () => get().featuredProjects,

      getVisibleProjects: () => get().projects.filter((p) => p.isVisible),

      getProjectById: (id) => get().projects.find((p) => p.id === id),

      getProjectsByTechnology: (tech) =>
        get().projects.filter((p) =>
          p.technologies.some((t) =>
            t.toLowerCase().includes(tech.toLowerCase())
          )
        ),

      getProjectsByStatus: (status) =>
        get().projects.filter((p) => p.status === status),

      clearError: () => set({ error: null }, false, "clearError"),

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "project-store",
    }
  )
);
