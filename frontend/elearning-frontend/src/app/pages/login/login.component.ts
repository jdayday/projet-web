import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // 1. Declare the property here
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    // 2. Initialize it here inside the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

 onSubmit() {
    if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
            next: () => {
                // This will now navigate to the courses page on success
                this.router.navigate(['/courses']);
            },
            error: (err) => {
                console.error('Login failed:', err);
                // You can add an error message for the user here
            },
        });
    }
  }
}