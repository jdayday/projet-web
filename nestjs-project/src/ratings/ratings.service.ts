import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async submitRating(userId: number, dto: CreateRatingDto) {
    const { courseId, value } = dto;

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) {
      throw new ForbiddenException('You must be enrolled to rate this course.');
    }

    await this.prisma.rating.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { value },
      create: { userId, courseId, value },
    });

    const courseRatings = await this.prisma.rating.findMany({
      where: { courseId },
    });

    const ratingCount = courseRatings.length;
    const ratingSum = courseRatings.reduce((sum, rating) => sum + rating.value, 0);
    const averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;

    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        rating: averageRating,
        ratingCount: ratingCount,
      },
    });
  }

  async getUserRatings(userId: number) {
    const ratings = await this.prisma.rating.findMany({
      where: { userId },
      select: { courseId: true, value: true },
    });

    return ratings; 
  }

}