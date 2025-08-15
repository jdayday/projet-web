import { Injectable } from '@nestjs/common';
import { Division, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAll(division?: Division) {
    const where: Prisma.CategoryWhereInput = {};

    if (division) {
      where.division = division;
    }

    return this.prisma.category.findMany({
      where: where,
    });
  }
}