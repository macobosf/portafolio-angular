import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PROGRAMADORES } from '../../core/mock-data';

@Component({
  selector: 'app-contact-request',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactRequestComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly programadores = PROGRAMADORES;
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', [Validators.required, Validators.email]],
    programadorId: ['1', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  protected reset(): void {
    this.form.reset({ programadorId: '1' });
    this.submitted.set(false);
  }
}
