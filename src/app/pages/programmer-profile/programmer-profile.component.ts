import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PROGRAMADORES, PROJECTS, Project, Programmer } from '../../core/mock-data';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-programmer-profile',
  imports: [RouterLink, ProjectCardComponent],
  templateUrl: './programmer-profile.component.html',
  styleUrl: './programmer-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgrammerProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  protected readonly programmer = signal<Programmer | undefined>(undefined);
  protected readonly projects = signal<Project[]>([]);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = PROGRAMADORES.find((p) => p.slug === slug);
    this.programmer.set(found);
    if (found) {
      this.projects.set(PROJECTS.filter((p) => p.programadorIds.includes(found.id)));
    }
  }
}
