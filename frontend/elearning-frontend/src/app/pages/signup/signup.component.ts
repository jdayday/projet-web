import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  role: string | null = null;
  
  get isStudent(): boolean {
    return this.role === 'STUDENT';
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role');
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      state: ['', Validators.required],
    }, { validators: passwordMatchValidator });

    if (this.isStudent) {
      this.signupForm.addControl('division', this.fb.control('', Validators.required));
    }
  }

  onSubmit() {
    console.log(this.signupForm);
    if (this.signupForm.invalid) {
      return;
    }
    const formData = { ...this.signupForm.value, role: this.role };

    this.authService.signup(formData).subscribe({
      next: () => {
        this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error('Signup failed', err);
      },
    });
  }
}