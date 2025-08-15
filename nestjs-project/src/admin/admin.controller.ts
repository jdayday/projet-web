import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminService } from './admin.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }
}