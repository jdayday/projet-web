import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatarUrl: string | null | undefined;
  @Input() firstName: string | null | undefined;
  @Input() lastName: string | null | undefined;

  initials = '';

  ngOnInit(): void {
    this.generateInitials();
  }

  private generateInitials(): void {
    const fn = this.firstName?.charAt(0).toUpperCase() || '';
    const ln = this.lastName?.charAt(0).toUpperCase() || '';
    this.initials = `${fn}${ln}`;
  }
}