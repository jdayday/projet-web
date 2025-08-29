import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async markLessonAsComplete(userId: number, lessonId: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { chapter: true },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    
    const courseId = lesson.chapter.courseId;

    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) throw new ForbiddenException('You are not enrolled in this course');

    await this.prisma.lessonCompletion.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {},
      create: { userId, lessonId },
    });

    const totalLessons = await this.prisma.lesson.count({
      where: { chapter: { courseId: courseId } },
    });
    const completedLessons = await this.prisma.lessonCompletion.count({
      where: { userId: userId, lesson: { chapter: { courseId: courseId } } },
    });
    const progress = totalLessons > 0 ? completedLessons / totalLessons : 0;

    await this.prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { progress },
    });

    return { progress };
  }
}