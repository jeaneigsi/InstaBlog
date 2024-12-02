import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BlogPost } from '@/lib/api';

interface BlogStore {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  getBlog: (id: string) => BlogPost | undefined;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogs: [],
      addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
      getBlog: (id) => get().blogs.find((blog) => blog.id === id),
    }),
    {
      name: 'blog-storage',
    }
  )
);