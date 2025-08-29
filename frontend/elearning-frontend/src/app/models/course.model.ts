import { User } from './user.model';
import { Testimonial } from './testimonial.model';

export interface Lesson {
  id: number;
  title: string;
  order: number;
  videoUrl?: string;
  resourceUrl?: string;
}

export interface Chapter {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  image?: string;
  oldPrice?: number;
  badge?: string;
  totalDuration?: number;
  division: string; 
  rating?: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;

  // Relational fields
  author?: User;
  categories: Category[]; 
  chapters: Chapter[]; 
  testimonials?: Testimonial[]; 
}