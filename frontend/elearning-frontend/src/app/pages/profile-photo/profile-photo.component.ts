import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-photo',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {
  currentUser$: Observable<User | null>;
  successMessage = '';

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.profileService.uploadAvatar(file).subscribe({
        next: (response) => {
          this.authService.updateUser({ avatarUrl: response.avatarUrl }, response.accessToken);
          this.successMessage = 'Photo updated successfully!';
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => console.error('Avatar upload failed', err)
      });
    }
  }
}