import { Controller, Get, UseGuards ,Delete,Param, ParseIntPipe,Patch,Body} from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';


@UseGuards(AdminGuard) 
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}