import { Component, input, output } from '@angular/core';

/**
 * Topic 3 + 5: what @for ... @empty renders. Optional action button (shown with @if)
 * that emits when clicked.
 * Usage: <app-empty-state title="No products" message="Try another category" actionLabel="Show all" (action)="reset()" />
 */
@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty">
      <div class="icon">{{ icon() }}</div>
      <h3>{{ title() }}</h3>
      @if (message()) {
        <p>{{ message() }}</p>
      }
      @if (actionLabel()) {
        <button (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `,
  styles: `
    .empty { text-align: center; padding: 40px 16px; border: 2px dashed #e5e7eb; border-radius: 12px; color: #475569; }
    .icon { font-size: 2.5rem; }
    h3 { margin: 8px 0 4px; color: #1f2937; }
    p { margin: 0 0 12px; }
  `,
})
export class EmptyState {
  title = input.required<string>();
  message = input<string>();
  icon = input('📭');
  actionLabel = input<string>();
  action = output<void>();
}
