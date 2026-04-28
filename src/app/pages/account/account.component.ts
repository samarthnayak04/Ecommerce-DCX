import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  currentUser: User | null = null;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  activeTab = 'profile';

  loginEmail = '';
  loginPassword = '';
  loginError = '';

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(u => this.currentUser = u);
    this.cartService.getItems().subscribe(items => this.cartItems = items);
    this.cartService.getTotal().subscribe(t => this.cartTotal = t);
    this.authService.getLoginError().subscribe(e => this.loginError = e);
  }

  login(): void {
    this.authService.login(this.loginEmail, this.loginPassword);
  }

  logout(): void {
    this.authService.logout();
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }
}
