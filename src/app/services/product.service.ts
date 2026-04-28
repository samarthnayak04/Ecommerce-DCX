import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Samsung Galaxy S5',
      price: 699.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/galaxy-s5.jpg',
      rating: 5,
      reviews: 15,
      category: 'Phones'
    },
    {
      id: 2,
      name: 'Xbox One',
      price: 399.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/xbox-one.jpg',
      rating: 4,
      reviews: 8,
      category: 'Gaming'
    },
    {
      id: 3,
      name: 'Playstation 4',
      price: 699.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/ps4.jpg',
      rating: 5,
      reviews: 4,
      category: 'Gaming'
    },
    {
      id: 4,
      name: 'OnePlus 5',
      price: 699.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/oneplus5.jpg',
      rating: 5,
      reviews: 15,
      category: 'Phones'
    },
    {
      id: 5,
      name: 'Vizio Smart TV',
      price: 599.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/vizio-tv.jpg',
      rating: 3,
      reviews: 22,
      category: 'TVs'
    },
    {
      id: 6,
      name: 'Microsoft Surface',
      price: 399.99,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dignissam.',
      image: 'assets/images/surface.jpg',
      rating: 5,
      reviews: 14,
      category: 'Laptops'
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
    return of(this.products.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ));
  }

  setSearchQuery(query: string): void {
    this.searchQuery$.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuery$.asObservable();
  }
}
