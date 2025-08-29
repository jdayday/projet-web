export type JwtPayload = {
  email: string;
  sub: number;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
};