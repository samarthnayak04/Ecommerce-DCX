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
  profileSaved = false;

  loginEmail = '';
  loginPassword = '';
  loginError = '';

  editForm = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  };

  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  faqs = [
    {
      question: 'What happens when I update my email address (or mobile number)?',
      answer: 'Your login email id (or mobile number) changes. You\'ll receive all your account-related communication on your updated email address (or mobile number).',
      open: false
    },
    {
      question: 'When will my DCX account be updated with the new email address (or mobile number)?',
      answer: 'It happens as soon as you save the changes. You\'ll receive a confirmation notification on your new email or mobile.',
      open: false
    },
    {
      question: 'What happens to my existing DCX account when I update my email address (or mobile number)?',
      answer: 'Updating your email address (or mobile number) doesn\'t invalidate your account. Your account remains fully functional. You\'ll continue seeing your order history, saved information and personal details.',
      open: false
    },
    {
      question: 'Does my address information get shared with sellers?',
      answer: 'Your address is only shared with sellers for the purpose of delivering your orders. We never share your personal information with third parties for marketing purposes.',
      open: false
    }
  ];

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(u => {
      this.currentUser = u;
      if (u) {
        this.editForm = {
          name: u.name,
          email: u.email,
          mobile: u.phone || '',
          address: u.address || '',
          address2: u.address2 || '',
          city: u.city || '',
          state: u.state || '',
          zip: u.pincode || ''
        };
      }
    });
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
    this.profileSaved = false;
  }

  saveProfile(): void {
    this.profileSaved = true;
    setTimeout(() => this.profileSaved = false, 3000);
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
