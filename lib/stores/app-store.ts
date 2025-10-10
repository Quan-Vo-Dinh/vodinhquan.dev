import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AppState } from "@/types";

interface AppStore extends AppState {
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentSection: (section: string) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  currentSection: "about",
  isMobileMenuOpen: false,
  theme: "dark",
};

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Actions
        setLoading: (loading) =>
          set({ isLoading: loading }, false, "setLoading"),

        setError: (error) => set({ error }, false, "setError"),

        setCurrentSection: (section) =>
          set({ currentSection: section }, false, "setCurrentSection"),

        toggleMobileMenu: () =>
          set(
            (state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }),
            false,
            "toggleMobileMenu"
          ),

        setMobileMenuOpen: (open) =>
          set({ isMobileMenuOpen: open }, false, "setMobileMenuOpen"),

        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === "light" ? "dark" : "light" }),
            false,
            "toggleTheme"
          ),

        setTheme: (theme) => set({ theme }, false, "setTheme"),

        clearError: () => set({ error: null }, false, "clearError"),

        reset: () => set(initialState, false, "reset"),
      }),
      {
        name: "app-store",
        partialize: (state) => ({
          theme: state.theme,
          currentSection: state.currentSection,
        }),
      }
    ),
    {
      name: "app-store",
    }
  )
);
