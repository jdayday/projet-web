import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(userId: number) {
  if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
          this.users = this.users.filter(u => u.id !== userId);
      });
  }
 }
}