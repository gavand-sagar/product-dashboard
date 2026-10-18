import { Component, computed, input } from '@angular/core';

/**
 * Topic 3 + 4: inputs with defaults, a value derived from an input (computed),
 * and @if / @else to choose between a photo and initials.
 * Usage: <app-avatar name="Anna de Vries" /> or <app-avatar name="Jan" imageUrl="jan.png" size="lg" />
 */
@Component({
  selector: 'app-avatar',
  template: `
    @if (imageUrl()) {
      <img class="avatar" [class]="size()" [src]="imageUrl()" [alt]="name()" />
    } @else {
      <span class="avatar" [class]="size()" [title]="name()">{{ initials() }}</span>
    }
  `,
  styles: `
    .avatar { display: inline-grid; place-items: center; border-radius: 50%; object-fit: cover;
              background: #c3002f; color: #fff; font-weight: 700; }
    .sm { width: 28px; height: 28px; font-size: 0.7rem; }
    .md { width: 40px; height: 40px; font-size: 0.9rem; }
    .lg { width: 64px; height: 64px; font-size: 1.3rem; }
  `,
})
export class Avatar {
  name = input.required<string>();
  imageUrl = input<string>();
  size = input<'sm' | 'md' | 'lg'>('md');

  // computed: like a Vue computed — re-calculated only when name() changes
  initials = computed(() =>
    this.name()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
  );
}
