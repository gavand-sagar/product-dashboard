import { Component, computed, input, output } from '@angular/core';

/**
 * Topic 4 + 5: @for over a generated list, plus an output.
 * Read-only by default; set [readonly]="false" to let the user click a star.
 * Usage: <app-rating [value]="4" /> or <app-rating [value]="r" [readonly]="false" (rated)="r = $event" />
 */
@Component({
  selector: 'app-rating',
  template: `
    <span class="stars" [attr.aria-label]="value() + ' out of ' + max()">
      @for (star of stars(); track star) {
        <button
          type="button"
          class="star"
          [class.on]="star <= value()"
          [disabled]="readonly()"
          (click)="rated.emit(star)"
        >★</button>
      }
    </span>
  `,
  styles: `
    .stars { display: inline-flex; gap: 2px; }
    .star { border: 0; background: none; padding: 0; font-size: 1.1rem; color: #cbd5e1; cursor: pointer; }
    .star.on { color: #f59e0b; }
    .star:disabled { cursor: default; }
  `,
})
export class Rating {
  value = input(0);
  max = input(5);
  readonly = input(true);
  rated = output<number>();

  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));
}
