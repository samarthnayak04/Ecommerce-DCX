import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = 'All';
  sortBy = 'default';
  searchQuery = '';

  categories = ['All', 'Phones', 'Gaming', 'TVs', 'Laptops'];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.applyFilters();
    });
    this.productService.getSearchQuery().subscribe(q => {
      this.searchQuery = q;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.allProducts];

    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (this.sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (this.sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (this.sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (this.sortBy === 'reviews') result.sort((a, b) => b.reviews - a.reviews);

    this.filteredProducts = result;
  }

  filterByCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
