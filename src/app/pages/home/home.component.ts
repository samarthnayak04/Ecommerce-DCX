import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  categories = [
    { name: 'Phones', icon: 'fas fa-mobile-alt fa-2x' },
    { name: 'Gaming', icon: 'fas fa-gamepad fa-2x' },
    { name: 'TVs', icon: 'fas fa-tv fa-2x' },
    { name: 'Laptops', icon: 'fas fa-laptop fa-2x' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.featuredProducts = products.slice(0, 3);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}
