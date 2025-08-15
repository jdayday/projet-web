import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const userCount = await this.prisma.user.count();
    const courseCount = await this.prisma.course.count();
    const enrollmentCount = await this.prisma.enrollment.count();

    // Calculate total revenue
    const enrollments = await this.prisma.enrollment.findMany({
      include: {
        course: {
          select: {
            price: true,
          },
        },
      },
    });
    const totalRevenue = enrollments.reduce((sum, enrollment) => {
      return sum + (enrollment.course.price || 0);
    }, 0);

    return {
      userCount,
      courseCount,
      enrollmentCount,
      totalRevenue,
    };
  }
}