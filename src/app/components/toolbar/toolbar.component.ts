import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, FontSize, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  currentTheme: Theme = 'light';
  currentFont: FontSize = 'normal';
  isGrayscale = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(t => this.currentTheme = t);
    this.themeService.getFontSize().subscribe(f => this.currentFont = f);
    this.themeService.getGrayscale().subscribe(g => this.isGrayscale = g);
  }

  setFont(size: FontSize): void {
    this.themeService.setFontSize(size);
  }

  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  toggleGrayscale(): void {
    this.themeService.toggleGrayscale();
  }
}
