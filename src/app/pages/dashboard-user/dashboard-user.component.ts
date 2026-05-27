import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_REQUESTS, PROGRAMADORES } from '../../core/mock-data';
import { AuthMockService } from '../../core/auth-mock.service';
import { RequestBadgeComponent } from '../../shared/components/request-badge/request-badge.component';

@Component({
  selector: 'app-dashboard-user',
  imports: [RouterLink, RequestBadgeComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrl: './dashboard-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUserComponent {
  protected readonly auth = inject(AuthMockService);
  protected readonly requests = CONTACT_REQUESTS;
  protected readonly programadores = PROGRAMADORES;

  protected getProgramadorNombre(id: string): string {
    return this.programadores.find((p) => p.id === id)?.nombre ?? 'Desconocido';
  }
}
