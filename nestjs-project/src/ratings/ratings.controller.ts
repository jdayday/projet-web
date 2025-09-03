import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@UseGuards(AtGuard)
@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  submitRating(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateRatingDto,
  ) {
    return this.ratingsService.submitRating(userId, dto);
  }
}