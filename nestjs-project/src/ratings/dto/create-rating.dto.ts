import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  courseId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  value: number; 
}