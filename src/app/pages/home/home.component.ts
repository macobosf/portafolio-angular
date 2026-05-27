import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROGRAMADORES, PROJECTS, SERVICES } from '../../core/mock-data';
import { ProgrammerCardComponent } from '../../shared/components/programmer-card/programmer-card.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProgrammerCardComponent, ServiceCardComponent, ProjectCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly programmer = PROGRAMADORES[0];
  protected readonly services = SERVICES;
  protected readonly featuredProjects = PROJECTS.filter((p) => p.destacado);
}
