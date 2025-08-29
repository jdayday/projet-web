import { Body, Controller, Get, Patch,Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetCurrentUserId } from '../common/decorators';
import { AtGuard } from '../common/guards';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(AtGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/avatars', 
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadAvatar(
    @GetCurrentUserId() userId: number, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.profileService.updateAvatar(userId, file.path);
  }


  @Get('me')
  getMe(@GetCurrentUserId() userId: number) {
    return this.profileService.getProfile(userId);
  }

  @Patch('me')
  updateMe(@GetCurrentUserId() userId: number, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(userId, dto);
  }
}