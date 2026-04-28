import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  name: string;
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
      this.user$.next({ email, name: email.split('@')[0] });
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
