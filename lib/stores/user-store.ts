import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User, SocialLink, TechStack, Skill } from "@/types";

interface UserStore {
  // State
  user: User | null;
  socialLinks: SocialLink[];
  techStack: TechStack[];
  skills: Skill[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setSocialLinks: (links: SocialLink[]) => void;
  setTechStack: (stack: TechStack[]) => void;
  setSkills: (skills: Skill[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Individual item actions
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void;
  removeSocialLink: (id: string) => void;
  reorderSocialLinks: (links: SocialLink[]) => void;

  addTechStack: (tech: TechStack) => void;
  updateTechStack: (id: string, updates: Partial<TechStack>) => void;
  removeTechStack: (id: string) => void;
  reorderTechStack: (stack: TechStack[]) => void;

  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (skills: Skill[]) => void;

  clearError: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  socialLinks: [],
  techStack: [],
  skills: [],
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Basic setters
      setUser: (user) => set({ user }, false, "setUser"),

      setSocialLinks: (socialLinks) =>
        set({ socialLinks }, false, "setSocialLinks"),

      setTechStack: (techStack) => set({ techStack }, false, "setTechStack"),

      setSkills: (skills) => set({ skills }, false, "setSkills"),

      setLoading: (isLoading) => set({ isLoading }, false, "setLoading"),

      setError: (error) => set({ error }, false, "setError"),

      // Social Links actions
      addSocialLink: (link) =>
        set(
          (state) => ({
            socialLinks: [...state.socialLinks, link].sort(
              (a, b) => a.order - b.order
            ),
          }),
          false,
          "addSocialLink"
        ),

      updateSocialLink: (id, updates) =>
        set(
          (state) => ({
            socialLinks: state.socialLinks.map((link) =>
              link.id === id ? { ...link, ...updates } : link
            ),
          }),
          false,
          "updateSocialLink"
        ),

      removeSocialLink: (id) =>
        set(
          (state) => ({
            socialLinks: state.socialLinks.filter((link) => link.id !== id),
          }),
          false,
          "removeSocialLink"
        ),

      reorderSocialLinks: (socialLinks) =>
        set({ socialLinks }, false, "reorderSocialLinks"),

      // Tech Stack actions
      addTechStack: (tech) =>
        set(
          (state) => ({
            techStack: [...state.techStack, tech].sort(
              (a, b) => a.order - b.order
            ),
          }),
          false,
          "addTechStack"
        ),

      updateTechStack: (id, updates) =>
        set(
          (state) => ({
            techStack: state.techStack.map((tech) =>
              tech.id === id ? { ...tech, ...updates } : tech
            ),
          }),
          false,
          "updateTechStack"
        ),

      removeTechStack: (id) =>
        set(
          (state) => ({
            techStack: state.techStack.filter((tech) => tech.id !== id),
          }),
          false,
          "removeTechStack"
        ),

      reorderTechStack: (techStack) =>
        set({ techStack }, false, "reorderTechStack"),

      // Skills actions
      addSkill: (skill) =>
        set(
          (state) => ({
            skills: [...state.skills, skill].sort((a, b) => a.order - b.order),
          }),
          false,
          "addSkill"
        ),

      updateSkill: (id, updates) =>
        set(
          (state) => ({
            skills: state.skills.map((skill) =>
              skill.id === id ? { ...skill, ...updates } : skill
            ),
          }),
          false,
          "updateSkill"
        ),

      removeSkill: (id) =>
        set(
          (state) => ({
            skills: state.skills.filter((skill) => skill.id !== id),
          }),
          false,
          "removeSkill"
        ),

      reorderSkills: (skills) => set({ skills }, false, "reorderSkills"),

      clearError: () => set({ error: null }, false, "clearError"),

      reset: () => set(initialState, false, "reset"),
    }),
    {
      name: "user-store",
    }
  )
);
