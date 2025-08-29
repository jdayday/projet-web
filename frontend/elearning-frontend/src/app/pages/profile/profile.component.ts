import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  // NOTE: AvatarComponent and FormsModule are no longer needed here
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  isLoading = true;
  successMessage = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      headline: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.profileForm.patchValue(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.isLoading = false;
      }
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: (response) => {
        this.user = response.user;
        this.authService.updateUser(response.user, response.accessToken);
        this.showSuccess('Profile saved successfully!');
      },
      error: (err) => console.error('Failed to update profile', err)
    });
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 3000);
  }
}