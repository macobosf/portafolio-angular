import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PROGRAMADORES, PROJECTS, Project } from '../../core/mock-data';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  protected readonly project = signal<Project | undefined>(undefined);
  protected readonly programadorNombre = signal<string>('');

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = PROJECTS.find((p) => p.slug === slug);
    this.project.set(found);
    if (found) {
      const prog = PROGRAMADORES.find((d) => found.programadorIds.includes(d.id));
      this.programadorNombre.set(prog?.nombre ?? '');
    }
  }
}
