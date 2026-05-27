import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Service } from '../../../core/mock-data';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {
  readonly service = input.required<Service>();
}
