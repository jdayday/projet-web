import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards, Query, Patch  } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { Division } from '@prisma/client';
import { InstructorGuard } from 'src/common/guards/instructor.guard';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

/* @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }*/

@UseGuards(InstructorGuard)
  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.coursesService.create(createCourseDto, userId);
  }

  @UseGuards(InstructorGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() updateCourseDto: UpdateCourseDto,
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('role') userRole: string,  
  ) {
    return this.coursesService.update(courseId, updateCourseDto, userId, userRole);
  }

  @UseGuards(InstructorGuard) 
  @Get('my-creations')
  findMyCreatedCourses(@GetCurrentUserId() userId: number) {
    return this.coursesService.findCoursesByInstructor(userId);
  }

@Public()
@Get()
findAll(
  @Query('search') search?: string,
  @Query('categoryId') categoryId?: string,
  @Query('division') division?: Division,
  @Query('minRating') minRating?: string,
  @Query('minDuration') minDuration?: string,
  @Query('maxDuration') maxDuration?: string,
  @Query('sort') sort?: 'relevant' | 'highestRated' | 'mostReviewed' | 'newest',
  ) {
    const categoryIdNum = categoryId ? parseInt(categoryId, 10) : undefined;
    const minRatingNum = minRating ? parseFloat(minRating) : undefined;
    const minDurationNum = minDuration ? parseInt(minDuration, 10) : undefined;
    const maxDurationNum = maxDuration ? parseInt(maxDuration, 10) : undefined;

    return this.coursesService.findAll(
      search,
      categoryIdNum,
      division,
      minRatingNum,
      minDurationNum,
      maxDurationNum,
      sort,
    );
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


  @UseGuards(InstructorGuard) 
  @Post(':courseId/chapters')
  addChapter(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() data: { title: string; order: number },
  ) {
    return this.coursesService.addChapter(courseId, data);
  }

  @UseGuards(InstructorGuard) 
  @Post('chapters/:chapterId/lessons')
  addLesson(
    @Param('chapterId', ParseIntPipe) chapterId: number,
    @Body() data: { title: string; order: number; videoUrl?: string },
  ) {
    return this.coursesService.addLesson(chapterId, data);
  }
  
  @Get(':id/enrollment-status')
  checkEnrollmentStatus(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.coursesService.checkEnrollmentStatus(userId, courseId);
  }

}
