import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Division } from '@prisma/client';

@Injectable()
export class HomepageService {
  constructor(private prisma: PrismaService) {}

  async getPersonalizedHomepage(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { firstName: true, division: true },
    });

    if (!user || !user.division) {
      return null;
    }

    const continueLearning = await this.prisma.enrollment.findMany({
        where: {
          userId: userId,
          progress: { gt: 0, lt: 1 }, 
        },
        take: 4,
        orderBy: { course: { updatedAt: 'desc' } },
        include: {
          course: { include: { author: true } },
        },
      });
     const userDivisionForQuery = user.division.replace(/ /g, '_').toUpperCase() as Division;


    const topCoursesInDivision = await this.prisma.course.findMany({
      where: {
        division: userDivisionForQuery ,
        NOT: {
          enrollments: { some: { userId: userId } },
        },
      },
      take: 12,
      orderBy: { rating: { sort: 'desc', nulls: 'last' } },
      include: { author: true ,  categories: true },
    });

    const userCategoryInterests = await this.prisma.category.findMany({
      where: {
        courses: {
          some: {
            enrollments: {
              some: { userId },
            },
          },
        },
      },
      select: { id: true },
    });
    const categoryIds = userCategoryInterests.map(c => c.id);

    let recommendations: any[] = [];
    if (categoryIds.length > 0) {
      recommendations = await this.prisma.course.findMany({
        where: {
          division: userDivisionForQuery,
          NOT: { enrollments: { some: { userId } } },
          categories: {
            some: {
              id: { in: categoryIds },
            },
          },
        },
        take: 12,
        orderBy: { rating: { sort: 'desc', nulls: 'last' } },
        include: { author: true, categories: true },
      });
    }

    if (recommendations.length === 0) {
      recommendations = topCoursesInDivision;
    }


    return {
      user,
      continueLearning,
      topCoursesInDivision,
      recommendations,
    };
  }

}