import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }
  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
        where: { id: id },
        data: dto,
    });
  }
  delete(id: number) {
      return this.prisma.user.delete({
          where: { id: id },
      });
  }
  
}