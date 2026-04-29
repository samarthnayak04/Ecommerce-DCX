import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  dateOfBirth?: string;
  gender?: string;
  joinDate: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(null);
  private loginError$ = new BehaviorSubject<string>('');

  getUser(): Observable<User | null> {
    return this.user$.asObservable();
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable(obs => {
      this.user$.subscribe(u => obs.next(u !== null));
    });
  }

  getLoginError(): Observable<string> {
    return this.loginError$.asObservable();
  }

  login(email: string, password: string): boolean {
    if (email && password.length >= 4) {
      const firstName = email.split('@')[0].split('.')[0] || 'John';
      const lastName = email.split('@')[0].split('.')[1] || 'Doe';

      this.user$.next({
        email,
        name: `${firstName} ${lastName}`,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        phone: '+91 98765 43210',
        address: '123 Main Street, Tech City',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        joinDate: new Date().toISOString().split('T')[0]
      });
      this.loginError$.next('');
      return true;
    }
    this.loginError$.next('Invalid credentials. Please try again.');
    return false;
  }

  logout(): void {
    this.user$.next(null);
  }
}
