import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Badge } from '../badge/badge';
import { Rating } from '../rating/rating';
import { Product } from '../../models/product';

/**
 * All topics together: a required object input, @switch for the stock badge,
 * @if for the button, two outputs, and composition of other components (Badge, Rating).
 * Usage: <app-product-card [product]="p" (addToCart)="add($event)" (selected)="open($event)" />
 */
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, Badge, Rating],
  template: `
    <article class="card" (click)="selected.emit(product())">
      <header>
        <h3>{{ product().name }}</h3>
        @switch (true) {
          @case (product().stock === 0) {
            <app-badge label="Out of stock" tone="danger" />
          }
          @case (product().stock < 5) {
            <app-badge [label]="'Only ' + product().stock + ' left'" tone="warning" />
          }
          @default {
            <app-badge label="In stock" tone="success" />
          }
        }
      </header>
      <app-rating [value]="product().rating" />
      <p class="price">{{ product().price | currency: 'EUR' }}</p>
      @if (product().stock > 0) {
        <!-- $event.stopPropagation(): the click should not also select the card -->
        <button class="primary" (click)="$event.stopPropagation(); addToCart.emit(product())">
          Add to cart
        </button>
      } @else {
        <button disabled>Sold out</button>
      }
    </article>
  `,
  styles: `
    .card { display: flex; flex-direction: column; gap: 8px; padding: 16px; border: 1px solid #e5e7eb;
            border-radius: 12px; background: #fff; cursor: pointer; transition: box-shadow 0.15s; }
    .card:hover { box-shadow: 0 6px 16px rgb(0 0 0 / 0.08); }
    header { display: flex; justify-content: space-between; align-items: start; gap: 8px; }
    h3 { margin: 0; font-size: 1rem; }
    .price { margin: 0; font-weight: 700; font-size: 1.1rem; }
  `,
})
export class ProductCard {
  product = input.required<Product>();
  addToCart = output<Product>();
  selected = output<Product>();
}
