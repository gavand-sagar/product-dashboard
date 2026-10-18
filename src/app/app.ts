import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Alert } from './ui/alert/alert';
import { Avatar } from './ui/avatar/avatar';
import { Badge } from './ui/badge/badge';
import { Counter } from './ui/counter/counter';
import { EmptyState } from './ui/empty-state/empty-state';
import { Pagination } from './ui/pagination/pagination';
import { ProductCard } from './ui/product-card/product-card';
import { Rating } from './ui/rating/rating';
import { Tab, Tabs } from './ui/tabs/tabs';
import { PRODUCTS, Product } from './models/product';

interface CartLine {
  product: Product;
  qty: number;
}

/**
 * The PARENT: owns all the state (signals) and passes it DOWN through inputs.
 * Children report back UP through outputs. Every component in ./ui is reusable.
 */
@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, Alert, Avatar, Badge, Counter, EmptyState, Pagination, ProductCard, Rating, Tabs],
  template: `
    <header class="topbar">
      <h1>Product Catalog</h1>
      <span class="spacer"></span>
      <app-badge [label]="cartCount() + ' in cart'" [tone]="cartCount() ? 'info' : 'neutral'" />
      <app-avatar name="Anna de Vries" size="sm" />
    </header>

    <main>
      @if (showWelcome()) {
        <app-alert type="info" title="Welcome!" [dismissible]="true" (dismissed)="showWelcome.set(false)">
          Every piece of this page is a small reusable component. Try the tabs, the cart and the stars.
        </app-alert>
      }

      <app-tabs [tabs]="tabs()" [active]="category()" (tabChange)="selectCategory($event)" />

      <div class="layout">
        <section>
          <div class="grid">
            @for (p of pageItems(); track p.id) {
              <app-product-card [product]="p" (addToCart)="addToCart($event)" (selected)="selected.set($event)" />
            } @empty {
              <app-empty-state
                title="No products here"
                message="Nothing matches this category."
                actionLabel="Show all products"
                (action)="selectCategory('all')"
              />
            }
          </div>
          <app-pagination [total]="filtered().length" [pageSize]="pageSize" [page]="page()" (pageChange)="page.set($event)" />
        </section>

        <aside class="side">
          <div class="panel">
            <h2>Cart</h2>
            @for (line of cart(); track line.product.id) {
              <div class="line">
                <span class="name">{{ line.product.name }}</span>
                <app-counter [value]="line.qty" [min]="0" [max]="line.product.stock" (valueChange)="setQty(line.product.id, $event)" />
              </div>
            } @empty {
              <p class="muted">Your cart is empty.</p>
            }
            @if (cart().length) {
              <p class="total">Total: {{ cartTotal() | currency: 'EUR' }}</p>
            }
          </div>

          @if (selected(); as p) {
            <div class="panel">
              <h2>{{ p.name }}</h2>
              <p class="muted">{{ p.category }} · {{ p.price | currency: 'EUR' }}</p>
              <p>Your rating:</p>
              <app-rating [value]="myRatings()[p.id] ?? 0" [readonly]="false" (rated)="rate(p.id, $event)" />
              @if (myRatings()[p.id]; as r) {
                <p class="muted">You gave it {{ r }} star{{ r === 1 ? '' : 's' }}.</p>
              }
            </div>
          }
        </aside>
      </div>
    </main>
  `,
  styles: `
    :host { display: block; font-family: system-ui, 'Segoe UI', Roboto, sans-serif; color: #1f2937; background: #f6f7fb; min-height: 100vh; }
    .topbar { display: flex; align-items: center; gap: 12px; padding: 12px 24px; background: #c3002f; color: #fff; }
    .topbar h1 { margin: 0; font-size: 1.2rem; }
    .spacer { flex: 1; }
    main { padding: 24px; display: flex; flex-direction: column; gap: 16px; max-width: 1200px; margin: 0 auto; }
    .layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
    section { display: flex; flex-direction: column; gap: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .grid app-empty-state { grid-column: 1 / -1; }
    .side { display: flex; flex-direction: column; gap: 16px; }
    .panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
    .panel h2 { margin: 0 0 12px; font-size: 1.05rem; }
    .line { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
    .name { font-size: 0.9rem; }
    .total { font-weight: 700; margin: 12px 0 0; }
    .muted { color: #64748b; margin: 4px 0; }
    @media (max-width: 800px) { .layout { grid-template-columns: 1fr; } }
  `,
})
export class App {
  readonly pageSize = 6;

  products = signal(PRODUCTS);
  category = signal('all');
  page = signal(1);
  cart = signal<CartLine[]>([]);
  selected = signal<Product | null>(null);
  myRatings = signal<Partial<Record<number, number>>>({}); // Partial: a product may have no rating yet
  showWelcome = signal(true);

  tabs = computed<Tab[]>(() => {
    const all = this.products();
    const count = (c: string) => all.filter((p) => p.category === c).length;
    return [
      { id: 'all', label: 'All', count: all.length },
      { id: 'electronics', label: 'Electronics', count: count('electronics') },
      { id: 'office', label: 'Office', count: count('office') },
      { id: 'furniture', label: 'Furniture', count: count('furniture') },
      { id: 'garden', label: 'Garden', count: count('garden') }, // empty on purpose → shows @empty
    ];
  });

  filtered = computed(() =>
    this.category() === 'all' ? this.products() : this.products().filter((p) => p.category === this.category()),
  );
  pageItems = computed(() => this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize));

  cartCount = computed(() => this.cart().reduce((n, l) => n + l.qty, 0));
  cartTotal = computed(() => this.cart().reduce((s, l) => s + l.qty * l.product.price, 0));

  selectCategory(id: string) {
    this.category.set(id);
    this.page.set(1);
  }

  addToCart(product: Product) {
    this.cart.update((lines) => {
      const found = lines.find((l) => l.product.id === product.id);
      if (!found) return [...lines, { product, qty: 1 }];
      return lines.map((l) => (l === found ? { ...l, qty: Math.min(l.qty + 1, product.stock) } : l));
    });
  }

  setQty(id: number, qty: number) {
    this.cart.update((lines) =>
      lines.map((l) => (l.product.id === id ? { ...l, qty } : l)).filter((l) => l.qty > 0),
    );
  }

  rate(id: number, stars: number) {
    this.myRatings.update((r) => ({ ...r, [id]: stars }));
  }
}
