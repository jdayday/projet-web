import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class CartCheckoutDto {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsInt({ each: true })
  courseIds: number[];
}