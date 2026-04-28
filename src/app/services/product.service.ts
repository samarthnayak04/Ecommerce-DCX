import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [

    // ── Phones ─────────────────────────────────────────
    {
      id: 1,
      name: 'iPhone 15 Pro',
      model: '15 Pro',
      price: 999.00,
      description: 'Titanium design with A17 Pro chip, customizable Action Button, and the most powerful iPhone camera system ever.',
      image: 'https://easyphones.co.in/cdn/shop/files/Apple_iPhone_15_Pro_Max_-_Refurbished_White.png?v=1755515090&width=416',
      imageLocal: 'iphone-15-pro.png',
      rating: 5,
      reviews: 248,
      category: 'Phones',
      badge: 'New',
      brand: 'apple'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      model: 'S24 Ultra',
      price: 1299.00,
      originalPrice: 1449.00,
      description: 'The ultimate Galaxy with built-in S Pen, 200MP camera system, and 7 years of OS & security updates.',
      image: 'https://sell.gameloot.in/wp-content/uploads/sites/4/2024/02/Samsung-Galaxy-S24-Ultra-5G.jpg', // ✅ fixed
      imageLocal: 's24-ultra.png',
      rating: 5,
      reviews: 192,
      category: 'Phones',
      badge: 'Hot',
      brand: 'samsung'
    },
    {
      id: 3,
      name: 'Google Pixel 8 Pro',
      model: 'Pixel 8 Pro',
      price: 899.00,
      description: 'Google AI baked in, pro-grade camera, and 7 years of updates.',
      image: 'https://cdn.dummyjson.com/products/images/smartphones/Google%20Pixel%208%20Pro/thumbnail.webp',
      imageLocal: 'pixel-8-pro.png',
      rating: 4,
      reviews: 134,
      category: 'Phones',
      brand: 'google'
    },
    {
      id: 4,
      name: 'OnePlus 12',
      model: '12',
      price: 649.00,
      originalPrice: 799.00,
      description: 'Snapdragon 8 Gen 3, 100W charging, LTPO display.',
      image: 'https://cdn.dummyjson.com/products/images/smartphones/OnePlus%2012/thumbnail.webp',
      imageLocal: 'oneplus-12.png',
      rating: 4,
      reviews: 87,
      category: 'Phones',
      badge: 'Sale',
      brand: 'oneplus'
    },

    // ── Gaming ─────────────────────────────────────────
    {
      id: 5,
      name: 'PlayStation 5',
      model: 'PS5',
      price: 499.00,
      description: 'Next-gen console with ultra-fast SSD.',
      image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&q=80',
      imageLocal: 'ps5.png',
      rating: 5,
      reviews: 521,
      category: 'Gaming',
      badge: 'Hot',
      brand: 'sony'
    },
    {
      id: 6,
      name: 'Xbox Series X',
      model: 'Series X',
      price: 499.00,
      description: 'Powerful Xbox with 4K gaming.',
      image: 'https://images.unsplash.com/photo-1621259182978-8ef6b0b9c7bc?w=400&q=80',
      imageLocal: 'xbox-series-x.svg',
      rating: 5,
      reviews: 348,
      category: 'Gaming',
      brand: 'microsoft'
    },

    // ── TVs ────────────────────────────────────────────
    {
      id: 8,
      name: 'Samsung 65" Neo QLED 4K',
      model: 'Neo QLED 65',
      price: 1299.00,
      originalPrice: 1799.00,
      description: 'Mini LED, Dolby Atmos, 4K 120Hz.',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80',
      imageLocal: 'samsung-neo-qled-65.png',
      rating: 5,
      reviews: 178,
      category: 'TVs',
      badge: 'Sale',
      brand: 'samsung'
    },

    // ── Laptops ────────────────────────────────────────
    {
      id: 10,
      name: 'MacBook Pro 16" M3 Pro',
      model: 'M3 Pro',
      price: 2499.00,
      description: 'M3 Pro chip with 22-hour battery.',
      image: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20M3/thumbnail.webp',
      imageLocal: 'macbookpro-16-m3.png',
      rating: 5,
      reviews: 312,
      category: 'Laptops',
      badge: 'New',
      brand: 'apple'
    },
    {
      id: 12,
      name: 'ASUS ROG Zephyrus G14',
      model: 'G14',
      price: 1399.00,
      originalPrice: 1599.00,
      description: 'Ryzen 9 + RTX 4060 gaming laptop.',
      image: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20ROG%20Strix%20G15/thumbnail.webp',
      imageLocal: 'asus-rog-g14.png',
      rating: 4,
      reviews: 201,
      category: 'Laptops',
      badge: 'Sale',
      brand: 'asus'
    },

    // ── Audio ──────────────────────────────────────────
    {
      id: 13,
      name: 'Apple AirPods Pro 2',
      model: 'AirPods Pro 2',
      price: 249.00,
      description: 'Active Noise Cancellation with Spatial Audio.',
      image: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Pro%202nd%20Generation/thumbnail.webp',
      imageLocal: 'airpods-pro-2.png',
      rating: 5,
      reviews: 567,
      category: 'Audio',
      badge: 'Hot',
      brand: 'apple'
    },
    {
      id: 14,
      name: 'Sony WH-1000XM5',
      model: 'WH-1000XM5',
      price: 349.00,
      originalPrice: 399.00,
      description: 'Industry-leading noise cancelling headphones.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
      imageLocal: 'wh-1000xm5.png',
      rating: 5,
      reviews: 423,
      category: 'Audio',
      badge: 'Sale',
      brand: 'sony'
    }
  ];

  private searchQuery$ = new BehaviorSubject<string>('');

  getAll(): Observable<Product[]> {
    return of(this.products);
  }

  getById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  search(query: string): Observable<Product[]> {
    const q = query.toLowerCase();

    return of(
      this.products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.brand?.toLowerCase().includes(q) ?? false)
      )
    );
  }

  setSearchQuery(query: string): void {
    this.searchQuery$.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery$.asObservable();
  }
}