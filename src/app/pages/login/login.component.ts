import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../core/auth.service';

function parseFirebaseError(error: unknown): string {
  const code = (error as { code?: string }).code;
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres';
    case 'auth/user-not-found':
      return 'Usuario no encontrado';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta';
    case 'auth/invalid-credential':
      return 'Credenciales inválidas';
    default:
      return 'Ocurrió un error. Intenta de nuevo.';
  }
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (!this.auth.isLoading() && this.auth.isAuthenticated()) {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        if (redirect) {
          this.router.navigateByUrl(redirect);
        } else if (this.auth.isProgrammer()) {
          this.router.navigate(['/dashboard/programador']);
        } else {
          this.router.navigate(['/dashboard/usuario']);
        }
      }
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.errorMessage.set(null);
    try {
      await this.auth.loginWithEmail(
        this.form.value.email!,
        this.form.value.password!,
      );
    } catch (e) {
      this.errorMessage.set(parseFirebaseError(e));
      this.submitting.set(false);
    }
  }

  protected async loginWithGoogle(): Promise<void> {
    this.errorMessage.set(null);
    try {
      await this.auth.loginWithGoogle();
    } catch (e) {
      this.errorMessage.set(parseFirebaseError(e));
    }
  }
}
