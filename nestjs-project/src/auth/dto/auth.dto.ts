import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;  
  
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  division?: string;

  @IsString()
  @IsOptional()
  role?: string;


}