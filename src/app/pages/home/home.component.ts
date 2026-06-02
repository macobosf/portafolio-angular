import { Component, ChangeDetectionStrategy, signal, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PROGRAMADORES, PROJECTS, SERVICES } from '../../core/mock-data';
import { ProgrammerCardComponent } from '../../shared/components/programmer-card/programmer-card.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage, ProgrammerCardComponent, ServiceCardComponent, ProjectCardComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly programmer = PROGRAMADORES[0];
  protected readonly services = SERVICES;
  protected readonly featuredProjects = PROJECTS.filter((p) => p.destacado);
  // signal en lugar de manipulación directa del DOM para que OnPush detecte cada cambio de carácter
  protected readonly typewriterText = signal('');

  private readonly phrases = [
    'Especialista en Redes Mikrotik',
    'Desarrollador Angular',
    'Soluciones IT Integrales',
  ];

  constructor() {
    // afterNextRender solo ejecuta en el browser; ngAfterViewInit también corre en SSR y rompería los setTimeout
    afterNextRender(() => this.runTypewriter());
  }

  private runTypewriter(): void {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = this.phrases[phraseIndex];
      if (deleting) {
        this.typewriterText.set(phrase.slice(0, --charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % this.phrases.length;
          setTimeout(tick, 400); // pausa antes de empezar a escribir la siguiente frase
          return;
        }
      } else {
        this.typewriterText.set(phrase.slice(0, ++charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          setTimeout(tick, 1800); // pausa al terminar la frase antes de borrar
          return;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    };

    tick();
  }
}
