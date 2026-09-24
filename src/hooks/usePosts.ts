import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types';
import { postsApi } from '../lib/adapter';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await postsApi.getAll();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat artikel');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPost = async (post: Omit<Post, 'id' | 'created_at' | 'views_count'>) => {
    const created = await postsApi.create(post);
    setPosts((prev) => [created, ...prev]);
    return created;
  };

  const editPost = async (id: string, updates: Partial<Post>) => {
    const updated = await postsApi.update(id, updates);
    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removePost = async (id: string) => {
    await postsApi.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    posts,
    publishedPosts: posts.filter((p) => p.status === 'published'),
    loading,
    error,
    refreshPosts: fetchPosts,
    addPost,
    editPost,
    removePost
  };
}
