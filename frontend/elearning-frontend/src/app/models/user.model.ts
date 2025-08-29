export type UserRole = 'STUDENT' | 'ADMIN' | 'PARENT' | 'INSTRUCTOR';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  headline?: string; 
  bio?: string;
  avatarUrl?: string;
  phone?: string;
  dateOfBirth?: Date;
  state?: string;
  division?: string; 

  createdAt: Date;
  updatedAt: Date;
}