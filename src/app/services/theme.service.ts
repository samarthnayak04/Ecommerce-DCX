import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type FontSize = 'small' | 'normal' | 'large';
export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme$ = new BehaviorSubject<Theme>('light');
  private fontSize$ = new BehaviorSubject<FontSize>('normal');
  private grayscale$ = new BehaviorSubject<boolean>(false);

  getTheme() { return this.theme$.asObservable(); }
  getFontSize() { return this.fontSize$.asObservable(); }
  getGrayscale() { return this.grayscale$.asObservable(); }

  setTheme(theme: Theme): void {
    this.theme$.next(theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }

  setFontSize(size: FontSize): void {
    this.fontSize$.next(size);
    document.body.classList.remove('font-small', 'font-normal', 'font-large');
    document.body.classList.add(`font-${size}`);
  }

  toggleGrayscale(): void {
    const next = !this.grayscale$.getValue();
    this.grayscale$.next(next);
    document.body.classList.toggle('grayscale', next);
  }
}
