import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentStore {
  recentSlugs: string[];
  addRecent: (slug: string) => void;
  clearRecents: () => void;
}

export const useRecentStore = create<RecentStore>()(
  persist(
    (set) => ({
      recentSlugs: [],
      addRecent: (slug: string) =>
        set((state) => {
          const filtered = state.recentSlugs.filter((s) => s !== slug);
          return { recentSlugs: [slug, ...filtered].slice(0, 6) };
        }),
      clearRecents: () => set({ recentSlugs: [] }),
    }),
    {
      name: 'calc-hub-recent-storage',
    }
  )
);
