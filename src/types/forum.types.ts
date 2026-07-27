import { Timestamp } from 'firebase/firestore';

export interface ForumPost {
  id: string;
  requestId: string;
  authorId: string;
  authorName: string;
  authorRole: 'client' | 'provider';
  content: string;
  images?: string[];
  attachments?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likes: number;
  likedBy: string[];
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: 'client' | 'provider';
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  likes: number;
  likedBy: string[];
}
