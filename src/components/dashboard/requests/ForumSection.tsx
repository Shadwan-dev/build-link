'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ForumPost } from '@/types/forum.types';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale/es';
import { Briefcase, Loader2, MessageSquare, Send, ThumbsUp, User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ForumSectionProps {
  requestId: string;
  posts: ForumPost[];
  onNewPost: (content: string) => Promise<void>;
  onReply: (postId: string, content: string) => Promise<void>;
  onLike: (postId: string) => Promise<void>;
}

export const ForumSection = ({
  requestId,
  posts,
  onNewPost,
  onReply,
  onLike,
}: ForumSectionProps) => {
  const { user } = useAuth();
  const [newPost, setNewPost] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    try {
      await onNewPost(newPost);
      setNewPost('');
      toast.success('✅ Mensaje publicado');
    } catch (error) {
      toast.error('Error al publicar mensaje');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (postId: string) => {
    if (!replyContent.trim()) return;

    setLoading(true);
    try {
      await onReply(postId, replyContent);
      setReplyContent('');
      setReplyingTo(null);
      toast.success('✅ Respuesta publicada');
    } catch (error) {
      toast.error('Error al publicar respuesta');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Función para formatear fecha con fallback
  const formatDate = (date: any) => {
    if (!date) return 'Fecha no disponible';
    try {
      const dateObj = date.toDate ? date.toDate() : new Date(date);
      return formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
    } catch (error) {
      return 'Fecha no disponible';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary-500" />
          Foro del proyecto
        </h3>
      </div>

      {/* Lista de posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p>No hay mensajes en el foro</p>
            <p className="text-sm">Sé el primero en publicar</p>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition"
            >
              {/* Post principal */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  {post.authorRole === 'client' ? (
                    <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {post.authorName}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      {post.authorRole === 'client' ? 'Cliente' : 'Proveedor'}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{post.content}</p>

                  {/* Imágenes del post */}
                  {post.images && post.images.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Imagen ${i + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                          onClick={() => window.open(img, '_blank')}
                        />
                      ))}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => onLike(post.id)}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      {post.likes > 0 && <span>{post.likes}</span>}
                    </button>
                    <button
                      onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                      className="text-xs text-gray-500 hover:text-primary-600 transition"
                    >
                      Responder
                    </button>
                  </div>

                  {/* Respuestas */}
                  {post.replies && post.replies.length > 0 && (
                    <div className="mt-3 pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-2">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                            {reply.authorRole === 'client' ? (
                              <User className="w-3 h-3 text-gray-500" />
                            ) : (
                              <Briefcase className="w-3 h-3 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 dark:text-white text-xs">
                                {reply.authorName}
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">
                                {formatDate(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulario de respuesta */}
                  {replyingTo === post.id && (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Escribe una respuesta..."
                        className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={() => handleSubmitReply(post.id)}
                        disabled={loading || !replyContent.trim()}
                        className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Nuevo post */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <form onSubmit={handleSubmitPost} className="flex gap-2">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Escribe un mensaje en el foro..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={loading || !newPost.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publicar'}
          </button>
        </form>
      </div>
    </div>
  );
};
