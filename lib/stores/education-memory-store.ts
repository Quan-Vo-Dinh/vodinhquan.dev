import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Education, Memory } from "@/types";

interface EducationStore {
  // State
  educations: Education[];
  currentStudy: Education | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setEducations: (educations: Education[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Individual education actions
  addEducation: (education: Education) => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  toggleEducationVisibility: (id: string) => void;
  setCurrentStudy: (id: string) => void;
  reorderEducations: (educations: Education[]) => void;

  // Computed getters
  getVisibleEducations: () => Education[];
  getEducationById: (id: string) => Education | undefined;
  getCurrentStudy: () => Education | null;

  clearError: () => void;
  reset: () => void;
}

interface MemoryStore {
  // State
  memories: Memory[];
  featuredMemories: Memory[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setMemories: (memories: Memory[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Individual memory actions
  addMemory: (memory: Memory) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  removeMemory: (id: string) => void;
  toggleMemoryVisibility: (id: string) => void;
  toggleMemoryFeatured: (id: string) => void;
  reorderMemories: (memories: Memory[]) => void;

  // Computed getters
  getVisibleMemories: () => Memory[];
  getFeaturedMemories: () => Memory[];
  getMemoryById: (id: string) => Memory | undefined;
  getMemoriesByTag: (tag: string) => Memory[];
  getMemoriesByMood: (mood: Memory["mood"]) => Memory[];

  clearError: () => void;
  reset: () => void;
}

// Education Store
const educationInitialState = {
  educations: [],
  currentStudy: null,
  isLoading: false,
  error: null,
};

export const useEducationStore = create<EducationStore>()(
  devtools(
    (set, get) => ({
      ...educationInitialState,

      // Basic setters
      setEducations: (educations) => {
        const currentStudy =
          educations.find((edu) => edu.isCurrentStudy) || null;
        set({ educations, currentStudy }, false, "setEducations");
      },

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Individual education actions
      addEducation: (education) =>
        set(
          (state) => {
            const newEducations = [...state.educations, education].sort(
              (a, b) => a.order - b.order
            );
            const currentStudy =
              newEducations.find((edu) => edu.isCurrentStudy) || null;
            return { educations: newEducations, currentStudy };
          },
          false,
          "addEducation"
        ),

      updateEducation: (id, updates) =>
        set(
          (state) => {
            const newEducations = state.educations.map((edu) =>
              edu.id === id ? { ...edu, ...updates } : edu
            );
            const currentStudy =
              newEducations.find((edu) => edu.isCurrentStudy) || null;
            return { educations: newEducations, currentStudy };
          },
          false,
          "updateEducation"
        ),

      removeEducation: (id) =>
        set(
          (state) => {
            const newEducations = state.educations.filter(
              (edu) => edu.id !== id
            );
            const currentStudy =
              newEducations.find((edu) => edu.isCurrentStudy) || null;
            return { educations: newEducations, currentStudy };
          },
          false,
          "removeEducation"
        ),

      toggleEducationVisibility: (id) =>
        set(
          (state) => ({
            educations: state.educations.map((edu) =>
              edu.id === id ? { ...edu, isVisible: !edu.isVisible } : edu
            ),
          }),
          false,
          "toggleEducationVisibility"
        ),

      setCurrentStudy: (id) =>
        set(
          (state) => {
            const newEducations = state.educations.map((edu) => ({
              ...edu,
              isCurrentStudy: edu.id === id,
            }));
            const currentStudy =
              newEducations.find((edu) => edu.id === id) || null;
            return { educations: newEducations, currentStudy };
          },
          false,
          "setCurrentStudy"
        ),

      reorderEducations: (educations) => {
        const currentStudy =
          educations.find((edu) => edu.isCurrentStudy) || null;
        set({ educations, currentStudy }, false, "reorderEducations");
      },

      // Computed getters
      getVisibleEducations: () =>
        get().educations.filter((edu) => edu.isVisible),

      getEducationById: (id) => get().educations.find((edu) => edu.id === id),

      getCurrentStudy: () => get().currentStudy,

      clearError: () => set({ error: null }, false, "clearError"),

      reset: () => set(educationInitialState, false, "reset"),
    }),
    {
      name: "education-store",
    }
  )
);

// Memory Store
const memoryInitialState = {
  memories: [],
  featuredMemories: [],
  isLoading: false,
  error: null,
};

export const useMemoryStore = create<MemoryStore>()(
  devtools(
    (set, get) => ({
      ...memoryInitialState,

      // Basic setters
      setMemories: (memories) => {
        const featuredMemories = memories.filter(
          (m) => m.isFeatured && m.isVisible
        );
        set({ memories, featuredMemories }, false, "setMemories");
      },

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Individual memory actions
      addMemory: (memory) =>
        set(
          (state) => {
            const newMemories = [...state.memories, memory].sort(
              (a, b) => a.order - b.order
            );
            const featuredMemories = newMemories.filter(
              (m) => m.isFeatured && m.isVisible
            );
            return { memories: newMemories, featuredMemories };
          },
          false,
          "addMemory"
        ),

      updateMemory: (id, updates) =>
        set(
          (state) => {
            const newMemories = state.memories.map((memory) =>
              memory.id === id ? { ...memory, ...updates } : memory
            );
            const featuredMemories = newMemories.filter(
              (m) => m.isFeatured && m.isVisible
            );
            return { memories: newMemories, featuredMemories };
          },
          false,
          "updateMemory"
        ),

      removeMemory: (id) =>
        set(
          (state) => {
            const newMemories = state.memories.filter(
              (memory) => memory.id !== id
            );
            const featuredMemories = newMemories.filter(
              (m) => m.isFeatured && m.isVisible
            );
            return { memories: newMemories, featuredMemories };
          },
          false,
          "removeMemory"
        ),

      toggleMemoryVisibility: (id) =>
        set(
          (state) => {
            const newMemories = state.memories.map((memory) =>
              memory.id === id
                ? { ...memory, isVisible: !memory.isVisible }
                : memory
            );
            const featuredMemories = newMemories.filter(
              (m) => m.isFeatured && m.isVisible
            );
            return { memories: newMemories, featuredMemories };
          },
          false,
          "toggleMemoryVisibility"
        ),

      toggleMemoryFeatured: (id) =>
        set(
          (state) => {
            const newMemories = state.memories.map((memory) =>
              memory.id === id
                ? { ...memory, isFeatured: !memory.isFeatured }
                : memory
            );
            const featuredMemories = newMemories.filter(
              (m) => m.isFeatured && m.isVisible
            );
            return { memories: newMemories, featuredMemories };
          },
          false,
          "toggleMemoryFeatured"
        ),

      reorderMemories: (memories) => {
        const featuredMemories = memories.filter(
          (m) => m.isFeatured && m.isVisible
        );
        set({ memories, featuredMemories }, false, "reorderMemories");
      },

      // Computed getters
      getVisibleMemories: () => get().memories.filter((m) => m.isVisible),

      getFeaturedMemories: () => get().featuredMemories,

      getMemoryById: (id) => get().memories.find((m) => m.id === id),

      getMemoriesByTag: (tag) =>
        get().memories.filter((m) =>
          m.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        ),

      getMemoriesByMood: (mood) =>
        get().memories.filter((m) => m.mood === mood),

      clearError: () => set({ error: null }, false, "clearError"),

      reset: () => set(memoryInitialState, false, "reset"),
    }),
    {
      name: "memory-store",
    }
  )
);
