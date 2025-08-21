
export interface Category {
  id: number;
  name: string;
}


export interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  rating: number;
  ratingCount: number;
  image?: string;
  oldPrice?: number;
  badge?: string;
  totalDuration?: number;
  categories?: Category[];
}