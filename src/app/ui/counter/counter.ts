import { Component, input, output } from '@angular/core';

/**
 * Topic 5: the classic input + output pair. The parent owns the number; the counter
 * only ASKS for a change by emitting. (Vue: prop + emit('update:value').)
 * Usage: <app-counter [value]="qty" [max]="10" (valueChange)="qty = $event" />
 */
@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button (click)="change(-1)" [disabled]="value() <= min()" aria-label="Decrease">−</button>
      <span>{{ value() }}</span>
      <button (click)="change(1)" [disabled]="value() >= max()" aria-label="Increase">+</button>
    </div>
  `,
  styles: `
    .counter { display: inline-flex; align-items: center; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
    button { border: 0; background: #f8fafc; width: 32px; height: 32px; cursor: pointer; font-size: 1rem; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
    span { min-width: 36px; text-align: center; font-weight: 600; }
  `,
})
export class Counter {
  value = input(0);
  min = input(0);
  max = input(99);
  valueChange = output<number>();

  change(delta: number) {
    const next = Math.min(this.max(), Math.max(this.min(), this.value() + delta));
    if (next !== this.value()) this.valueChange.emit(next);
  }
}
