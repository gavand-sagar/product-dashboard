import { Component, input, output } from '@angular/core';

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

/**
 * Topic 4 + 5: @for over an input array (track by id), an optional value shown with @if,
 * and an output that tells the parent which tab was picked. The parent owns the state.
 * Usage: <app-tabs [tabs]="tabs" [active]="current" (tabChange)="current = $event" />
 */
@Component({
  selector: 'app-tabs',
  template: `
    <nav class="tabs" role="tablist">
      @for (tab of tabs(); track tab.id) {
        <button
          role="tab"
          [class.active]="tab.id === active()"
          [attr.aria-selected]="tab.id === active()"
          (click)="tabChange.emit(tab.id)"
        >
          {{ tab.label }}
          @if (tab.count !== undefined) {
            <span class="count">{{ tab.count }}</span>
          }
        </button>
      }
    </nav>
  `,
  styles: `
    .tabs { display: flex; gap: 4px; border-bottom: 2px solid #e5e7eb; }
    button { border: 0; background: none; padding: 10px 14px; cursor: pointer; font: inherit;
             color: #475569; border-bottom: 2px solid transparent; margin-bottom: -2px; }
    button.active { color: #c3002f; border-bottom-color: #c3002f; font-weight: 600; }
    .count { margin-left: 6px; background: #f1f5f9; border-radius: 999px; padding: 0 8px; font-size: 0.75rem; }
  `,
})
export class Tabs {
  tabs = input.required<Tab[]>();
  active = input<string>('');
  tabChange = output<string>();
}
