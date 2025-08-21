export enum Division {
  BASE_7 = 'BASE_7',
  BASE_8 = 'BASE_8',
  BASE_9 = 'BASE_9',
  SECONDAIRE_1 = 'SECONDAIRE_1',
  SECONDAIRE_2 = 'SECONDAIRE_2',
  SECONDAIRE_3 = 'SECONDAIRE_3',
  BAC_INFO = 'BAC_INFO',
  BAC_MATH = 'BAC_MATH',
  BAC_SCIENCE = 'BAC_SCIENCE',
  BAC_SPORT = 'BAC_SPORT',
  CONCOURS = 'CONCOURS',
}

export interface Category {
  id: number;
  name: string;
  division: Division;
}

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

export interface Course {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  price?: number;
  author?: string;
  image?: string;
  oldPrice?: number;
  badge?: string;
  totalDuration?: number;
  division: Division;
  rating?: number;
  ratingCount: number;
  categories?: Category[];
  chapters?: Chapter[];
}