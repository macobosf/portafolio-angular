import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT_REQUESTS, ContactRequest } from '../../core/mock-data';
import { AuthMockService } from '../../core/auth-mock.service';
import { RequestBadgeComponent } from '../../shared/components/request-badge/request-badge.component';

@Component({
  selector: 'app-dashboard-programmer',
  imports: [RouterLink, RequestBadgeComponent],
  templateUrl: './dashboard-programmer.component.html',
  styleUrl: './dashboard-programmer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProgrammerComponent {
  protected readonly auth = inject(AuthMockService);
  protected readonly requests = signal<ContactRequest[]>(CONTACT_REQUESTS);
  protected readonly selectedRequest = signal<ContactRequest | null>(null);

  protected selectRequest(req: ContactRequest): void {
    this.selectedRequest.set(req);
  }

  protected closeDetail(): void {
    this.selectedRequest.set(null);
  }

  get pendingCount(): number {
    return this.requests().filter((r) => r.estado === 'Pendiente').length;
  }

  get respondedCount(): number {
    return this.requests().filter((r) => r.estado === 'Respondida').length;
  }
}
