import { Component, input } from '@angular/core';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Topic 2 + 3: the simplest reusable component — two inputs, no logic.
 * Usage: <app-badge label="In stock" tone="success" />
 */
@Component({
  selector: 'app-badge',
  template: `<span class="badge" [class]="tone()">{{ label() }}</span>`,
  styles: `
    .badge { display: inline-block; padding: 2px 10px; border-radius: 999px;
             font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
    .neutral { background: #f1f5f9; color: #475569; }
    .success { background: #dcfce7; color: #15803d; }
    .warning { background: #fef3c7; color: #b45309; }
    .danger  { background: #fee2e2; color: #b91c1c; }
    .info    { background: #dbeafe; color: #1d4ed8; }
  `,
})
export class Badge {
  label = input.required<string>();
  tone = input<BadgeTone>('neutral');
}
