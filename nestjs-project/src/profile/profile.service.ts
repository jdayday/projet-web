import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        headline: true,
        bio: true,
        role: true,
        avatarUrl: true,
      },
    });
    return user;
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });

    const { access_token } = await this.authService.refreshAccessToken(userId);

    delete updatedUser .hash;
    delete updatedUser .hashedRt;
    return { user: updatedUser, accessToken: access_token };
  }

    async updateAvatar(userId: number, avatarPath: string) {
    const avatarUrl = `http://localhost:3000/${avatarPath.replace(/\\/g, '/')}`;

    await  this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: avatarUrl },
    });

    const { access_token } = await this.authService.refreshAccessToken(userId);

    return { avatarUrl: avatarUrl, accessToken: access_token };
  }

}