import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Experience, SortOptions, FilterOptions } from "@/types";

interface ExperienceStore {
  // State
  experiences: Experience[];
  currentJob: Experience | null;
  isLoading: boolean;
  error: string | null;

  // Filters and sorting
  filters: FilterOptions;
  sortOptions: SortOptions;
  searchQuery: string;

  // Actions
  setExperiences: (experiences: Experience[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Individual experience actions
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  toggleExperienceVisibility: (id: string) => void;
  setCurrentJob: (id: string) => void;
  reorderExperiences: (experiences: Experience[]) => void;

  // Filter and search actions
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSortOptions: (options: SortOptions) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;

  // Computed getters
  getFilteredExperiences: () => Experience[];
  getVisibleExperiences: () => Experience[];
  getExperienceById: (id: string) => Experience | undefined;
  getExperiencesByCompany: (company: string) => Experience[];
  getExperiencesByType: (type: Experience["type"]) => Experience[];
  getCurrentJob: () => Experience | null;

  clearError: () => void;
  reset: () => void;
}

const initialState = {
  experiences: [],
  currentJob: null,
  isLoading: false,
  error: null,
  filters: {},
  sortOptions: {
    field: "order" as const,
    order: "asc" as const,
  },
  searchQuery: "",
};

export const useExperienceStore = create<ExperienceStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic setters
      setExperiences: (experiences) => {
        const currentJob = experiences.find((exp) => exp.isCurrentJob) || null;
        set({ experiences, currentJob }, false, "setExperiences");
      },

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Individual experience actions
      addExperience: (experience) =>
        set(
          (state) => {
            const newExperiences = [...state.experiences, experience].sort(
              (a, b) => a.order - b.order
            );
            const currentJob =
              newExperiences.find((exp) => exp.isCurrentJob) || null;
            return { experiences: newExperiences, currentJob };
          },
          false,
          "addExperience"
        ),

      updateExperience: (id, updates) =>
        set(
          (state) => {
            const newExperiences = state.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...updates } : exp
            );
            const currentJob =
              newExperiences.find((exp) => exp.isCurrentJob) || null;
            return { experiences: newExperiences, currentJob };
          },
          false,
          "updateExperience"
        ),

      removeExperience: (id) =>
        set(
          (state) => {
            const newExperiences = state.experiences.filter(
              (exp) => exp.id !== id
            );
            const currentJob =
              newExperiences.find((exp) => exp.isCurrentJob) || null;
            return { experiences: newExperiences, currentJob };
          },
          false,
          "removeExperience"
        ),

      toggleExperienceVisibility: (id) =>
        set(
          (state) => ({
            experiences: state.experiences.map((exp) =>
              exp.id === id ? { ...exp, isVisible: !exp.isVisible } : exp
            ),
          }),
          false,
          "toggleExperienceVisibility"
        ),

      setCurrentJob: (id) =>
        set(
          (state) => {
            const newExperiences = state.experiences.map((exp) => ({
              ...exp,
              isCurrentJob: exp.id === id,
            }));
            const currentJob =
              newExperiences.find((exp) => exp.id === id) || null;
            return { experiences: newExperiences, currentJob };
          },
          false,
          "setCurrentJob"
        ),

      reorderExperiences: (experiences) => {
        const currentJob = experiences.find((exp) => exp.isCurrentJob) || null;
        set({ experiences, currentJob }, false, "reorderExperiences");
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
      getFilteredExperiences: () => {
        const { experiences, filters, sortOptions, searchQuery } = get();
        let filtered = [...experiences];

        // Apply visibility filter
        if (filters.isVisible !== undefined) {
          filtered = filtered.filter(
            (exp) => exp.isVisible === filters.isVisible
          );
        }

        // Apply type filter
        if (filters.type) {
          filtered = filtered.filter((exp) => exp.type === filters.type);
        }

        // Apply search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (exp) =>
              exp.company.toLowerCase().includes(query) ||
              exp.position.toLowerCase().includes(query) ||
              exp.description.toLowerCase().includes(query) ||
              exp.technologies.some((tech) =>
                tech.toLowerCase().includes(query)
              )
          );
        }

        // Apply sorting
        filtered.sort((a, b) => {
          let aValue: any;
          let bValue: any;

          switch (sortOptions.field) {
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
            case "date":
              aValue = a.startDate;
              bValue = b.startDate;
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

      getVisibleExperiences: () =>
        get().experiences.filter((exp) => exp.isVisible),

      getExperienceById: (id) => get().experiences.find((exp) => exp.id === id),

      getExperiencesByCompany: (company) =>
        get().experiences.filter((exp) =>
          exp.company.toLowerCase().includes(company.toLowerCase())
        ),

      getExperiencesByType: (type) =>
        get().experiences.filter((exp) => exp.type === type),

      getCurrentJob: () => get().currentJob,

      clearError: () => set({ error: null }, false, "clearError"),

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "experience-store",
    }
  )
);
