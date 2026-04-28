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
  heroProducts: Product[] = [];

  brands = [
    { name: 'Apple',     slug: 'apple',     logo: 'brands/apple.png' },
    { name: 'Samsung',   slug: 'samsung',   logo: 'brands/samsung.png' },
    { name: 'Sony',      slug: 'sony',      logo: 'brands/sony.png' },
    { name: 'Google',    slug: 'google',    logo: 'brands/google.png' },
    { name: 'Microsoft', slug: 'microsoft', logo: 'brands/microsoft.png' },
    { name: 'ASUS',      slug: 'asus',      logo: 'brands/asus.png' },
    { name: 'OnePlus',   slug: 'oneplus',   logo: 'brands/oneplus.png' },
  ];

  categories = [
    { name: 'Phones',  icon: 'fas fa-mobile-alt fa-lg', bg: '#EDE9FE', color: '#7C3AED', count: 4 },
    { name: 'Gaming',  icon: 'fas fa-gamepad fa-lg',    bg: '#FEE2E2', color: '#DC2626', count: 3 },
    { name: 'TVs',     icon: 'fas fa-tv fa-lg',         bg: '#DBEAFE', color: '#2563EB', count: 2 },
    { name: 'Laptops', icon: 'fas fa-laptop fa-lg',     bg: '#D1FAE5', color: '#059669', count: 3 },
    { name: 'Audio',   icon: 'fas fa-headphones fa-lg', bg: '#FEF3C7', color: '#D97706', count: 2 },
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.featuredProducts = products.slice(0, 4);
      this.heroProducts = products.filter(p => p.category === 'Phones').slice(0, 3);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  goToCategory(category: string): void {
    this.productService.setSearchQuery('');
    this.router.navigate(['/products'], { queryParams: { category } });
  }

  goToBrand(slug: string): void {
    this.productService.setSearchQuery(slug);
    this.router.navigate(['/products']);
  }

  onHeroImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNlZWVlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  }

  onBrandLogoError(event: Event): void {
    const wrap = (event.target as HTMLImageElement).closest('.brand-logo-wrap') as HTMLElement;
    if (wrap) wrap.style.display = 'none';
  }
}
