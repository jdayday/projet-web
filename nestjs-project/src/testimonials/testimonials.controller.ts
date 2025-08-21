import { Controller, Get } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { Public } from '../common/decorators';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Public() 
  @Get()
  findAll() {
    return this.testimonialsService.findAll();
  }
}