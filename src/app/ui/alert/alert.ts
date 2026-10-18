import { Component, input, output } from '@angular/core';

/**
 * Topic 3–5: inputs for type/title/dismissible, @if for the close button, an output
 * when dismissed, and <ng-content> so the parent can put any text inside (like a Vue slot).
 * Usage: <app-alert type="success" title="Saved" [dismissible]="true" (dismissed)="hide()">Your order is placed.</app-alert>
 */
@Component({
  selector: 'app-alert',
  template: `
    <div class="alert" [class]="type()" role="alert">
      <div class="body">
        @if (title()) {
          <strong>{{ title() }}</strong>
        }
        <ng-content />
      </div>
      @if (dismissible()) {
        <button class="close" aria-label="Dismiss" (click)="dismissed.emit()">✕</button>
      }
    </div>
  `,
  styles: `
    .alert { display: flex; align-items: start; gap: 12px; padding: 12px 16px; border-radius: 10px; border-left: 4px solid; }
    .body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .info    { background: #eff6ff; border-color: #2563eb; color: #1e3a8a; }
    .success { background: #f0fdf4; border-color: #16a34a; color: #14532d; }
    .warning { background: #fffbeb; border-color: #d97706; color: #78350f; }
    .danger  { background: #fef2f2; border-color: #dc2626; color: #7f1d1d; }
    .close { border: 0; background: none; cursor: pointer; font-size: 1rem; color: inherit; }
  `,
})
export class Alert {
  type = input<'info' | 'success' | 'warning' | 'danger'>('info');
  title = input<string>();
  dismissible = input(false);
  dismissed = output<void>();
}
