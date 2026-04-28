import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  email = '';
  password = '';
  searchQuery = '';
  currentUser: User | null = null;
  cartCount = 0;
  loginError = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(u => this.currentUser = u);
    this.cartService.getCount().subscribe(c => this.cartCount = c);
    this.authService.getLoginError().subscribe(e => this.loginError = e);
  }

  onLogin(): void {
    this.authService.login(this.email, this.password);
  }

  onLogout(): void {
    this.authService.logout();
    this.email = '';
    this.password = '';
  }

  onSearch(): void {
    this.productService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/products']);
  }

  openCart(): void {
    this.cartService.toggleCart();
  }
}
