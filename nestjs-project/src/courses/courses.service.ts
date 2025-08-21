import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Division, Prisma } from '@prisma/client'; 

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

    async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return course;
  }

  async enroll(userId: number, courseId: number) {
    return this.prisma.enrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });
  }

  async findEnrollmentsByUserId(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId: userId },
      include: {
         course: true,
         },
    });
  }

async getCourseContent(userId: number, courseId: number) {
  const user = await this.prisma.user.findUnique({ where: { id: userId } });
  const enrollment = await this.prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId,
      },
    },
  });

  if (user.role !== 'ADMIN' && !enrollment) {
    throw new ForbiddenException('You are not enrolled in this course');
  }

  return this.prisma.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        orderBy: {
          order: 'asc',
        },
        include: {
          lessons: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });
 }

  addChapter(courseId: number, data: { title: string; order: number }) {
    return this.prisma.chapter.create({
      data: {
        title: data.title,
        order: data.order,
        courseId: courseId,
      },
    });
  }

  addLesson(chapterId: number, data: { title: string; order: number; videoUrl?: string }) {
    return this.prisma.lesson.create({
      data: {
        title: data.title,
        order: data.order,
        videoUrl: data.videoUrl,
        chapterId: chapterId,
      },
    });
  }

  findAll(search?: string, 
    categoryId?: number, 
    division?: Division,
    minRating?: number,
    maxDuration?: number,
    sort?: 'relevant' | 'highestRated' | 'mostReviewed' | 'newest',

  ) {
    const where: Prisma.CourseWhereInput = {};

    if (division) { where.division = division; }
    if (minRating) where.rating = { gte: minRating };
     if (maxDuration) {
    if (maxDuration === 1021) { 
      where.totalDuration = { gte: 1020 };
    } else {
      where.totalDuration = { lte: maxDuration }; 
    }
  }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { categories: { some: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }
    if (categoryId) {
      where.categories = { some: { id: categoryId } };
    }

    let orderBy: Prisma.CourseOrderByWithRelationInput | undefined;

  switch (sort) {
    case 'highestRated':
      orderBy = { rating: 'desc' };
      break;
    case 'mostReviewed':
      orderBy = { ratingCount: 'desc' }; 
      break;
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    default:
      orderBy = undefined; 
  }

    return this.prisma.course.findMany({ 
      where,
      orderBy,
      include: { categories: true } });
  }

findTopRated(division?: Division) {
    const where: Prisma.CourseWhereInput = {
        rating: { not: null }
    };
    if (division) { where.division = division; }

    return this.prisma.course.findMany({
        where,
        orderBy: {
            rating: 'desc',
        },
        take: 8,
        include: {
            categories: true,
        },
    });
 }

}