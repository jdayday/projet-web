import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards, Query  } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCurrentUserId, Public } from '../common/decorators';
import { Division } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('division') division?: Division,
    @Query('minRating') minRating?: string,
    @Query('maxDuration') maxDuration?: string,
    @Query('sort') sort?: 'relevant' | 'highestRated' | 'mostReviewed' | 'newest',


  ) {
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;
    const minRatingNum = minRating ? parseFloat(minRating) : undefined;
    const maxDurationNum = maxDuration ? parseInt(maxDuration) : undefined;

    return this.coursesService.findAll(search, categoryIdNum, division,minRatingNum, maxDurationNum, sort);
  }
  @Public()
  @Get('top-rated')
  findTopRated() {
    return this.coursesService.findTopRated();
  }

  @Public()
  @Get(':id') 
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Post(':id/enroll') 
  @HttpCode(HttpStatus.CREATED)
  enroll(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.coursesService.enroll(userId, courseId);
  }

  @Get('me/my-courses')
  getMyEnrolledCourses(@GetCurrentUserId() userId: number) {
    return this.coursesService.findEnrollmentsByUserId(userId);
  }

  @Get(':id/content')
  getCourseContent(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.coursesService.getCourseContent(userId, courseId);
  }


  @UseGuards(AdminGuard)
  @Post(':courseId/chapters')
  addChapter(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() data: { title: string; order: number },
  ) {
    return this.coursesService.addChapter(courseId, data);
  }

  @UseGuards(AdminGuard)
  @Post('chapters/:chapterId/lessons')
  addLesson(
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Body() data: { title: string; order: number; videoUrl?: string },
  ) {
    return this.coursesService.addLesson(chapterId, data);
  }

}
