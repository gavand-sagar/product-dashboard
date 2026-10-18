import { Component, computed, input, output } from '@angular/core';

/**
 * Topics 3–5 at once: numeric inputs, values derived from them, @if to hide the whole
 * control when there is only one page, @for for the page buttons, and an output.
 * Usage: <app-pagination [total]="items.length" [pageSize]="6" [page]="page" (pageChange)="page = $event" />
 */
@Component({
  selector: 'app-pagination',
  template: `
    @if (pageCount() > 1) {
      <nav class="pagination" aria-label="Pages">
        <button (click)="go(page() - 1)" [disabled]="page() === 1">‹ Prev</button>
        @for (p of pages(); track p) {
          <button [class.current]="p === page()" (click)="go(p)">{{ p }}</button>
        }
        <button (click)="go(page() + 1)" [disabled]="page() === pageCount()">Next ›</button>
        <span class="info">{{ from() }}–{{ to() }} of {{ total() }}</span>
      </nav>
    }
  `,
  styles: `
    .pagination { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
    button { border: 1px solid #e5e7eb; background: #fff; border-radius: 6px; padding: 4px 10px; cursor: pointer; font: inherit; }
    button.current { background: #c3002f; border-color: #c3002f; color: #fff; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
    .info { margin-left: 8px; color: #64748b; font-size: 0.85rem; }
  `,
})
export class Pagination {
  total = input.required<number>();
  pageSize = input(10);
  page = input(1);
  pageChange = output<number>();

  pageCount = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));
  pages = computed(() => Array.from({ length: this.pageCount() }, (_, i) => i + 1));
  from = computed(() => (this.page() - 1) * this.pageSize() + 1);
  to = computed(() => Math.min(this.total(), this.page() * this.pageSize()));

  go(p: number) {
    if (p >= 1 && p <= this.pageCount() && p !== this.page()) this.pageChange.emit(p);
  }
}
