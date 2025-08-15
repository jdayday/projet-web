import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe(data => {
      this.stats = data;
    });
  }
}