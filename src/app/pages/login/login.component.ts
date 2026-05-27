import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthMockService } from '../../core/auth-mock.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthMockService);
  private readonly router = inject(Router);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected loginAsProgrammer(): void {
    this.auth.loginAsProgrammer();
    this.router.navigate(['/dashboard/programador']);
  }

  protected loginAsUser(): void {
    this.auth.loginAsUser();
    this.router.navigate(['/dashboard/usuario']);
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      this.loginAsProgrammer();
    }
  }
}
