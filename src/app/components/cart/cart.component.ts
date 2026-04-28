import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;
  isOpen = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => this.items = items);
    this.cartService.getTotal().subscribe(t => this.total = t);
    this.cartService.isOpen$.subscribe(open => this.isOpen = open);
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQty(productId: number, qty: number): void {
    this.cartService.updateQuantity(productId, qty);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  close(): void {
    this.cartService.isOpen$.next(false);
  }
}
