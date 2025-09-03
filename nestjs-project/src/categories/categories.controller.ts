import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Public } from '../common/decorators';
import { Division } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get()
  findAll(@Query('division') division?: Division) {
    return this.categoriesService.findAll(division);
  }

  @Public()
  @Get('top')
  findTop(@Query('division') division?: Division) {
    return this.categoriesService.findTopCategories(division);
  }

}