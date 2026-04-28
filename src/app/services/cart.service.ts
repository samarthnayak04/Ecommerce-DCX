import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);
  isOpen$ = new BehaviorSubject<boolean>(false);

  getItems(): Observable<CartItem[]> {
    return this.items$.asObservable();
  }

  getCount(): Observable<number> {
    return this.items$.pipe(map(items => items.reduce((sum, i) => sum + i.quantity, 0)));
  }

  getTotal(): Observable<number> {
    return this.items$.pipe(map(items =>
      items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
    ));
  }

  addToCart(product: Product): void {
    const current = this.items$.getValue();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.items$.next(current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items$.next([...current, { product, quantity: 1 }]);
    }
    this.isOpen$.next(true);
  }

  removeFromCart(productId: number): void {
    this.items$.next(this.items$.getValue().filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.items$.next(this.items$.getValue().map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    ));
  }

  clearCart(): void {
    this.items$.next([]);
  }

  toggleCart(): void {
    this.isOpen$.next(!this.isOpen$.getValue());
  }
}
