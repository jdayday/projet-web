import { Controller, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { LessonsService } from './lessons.service';

@UseGuards(AtGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Post(':lessonId/complete')
  @HttpCode(HttpStatus.OK)
  markLessonAsComplete(
    @GetCurrentUserId() userId: number,
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.lessonsService.markLessonAsComplete(userId, lessonId);
  }
}