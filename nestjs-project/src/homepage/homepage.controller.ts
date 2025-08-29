import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { HomepageService } from './homepage.service';

@UseGuards(AtGuard) 
@Controller('homepage')
export class HomepageController {
  constructor(private homepageService: HomepageService) {}

  @Get('me')
  getPersonalizedHomepage(@GetCurrentUserId() userId: number) {
    return this.homepageService.getPersonalizedHomepage(userId);
  }
}