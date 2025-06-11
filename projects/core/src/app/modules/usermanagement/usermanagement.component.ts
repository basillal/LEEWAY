import { Component, ChangeDetectorRef } from '@angular/core';

type LayoutStyle =
  | 'grid'
  | 'small'
  | 'create'
  | 'modal'
  | 'tabbed'
  | 'sidebar'
  | 'card-stack'
  | 'wizard';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent {
  layoutStyles: LayoutStyle[] = [
    'grid',
    'small',
    'create',
    'modal',
    'tabbed',
    'sidebar',
    'card-stack',
    'wizard'
  ];

  activeLayouts: Set<LayoutStyle> = new Set(['grid']);

  constructor(private cdr: ChangeDetectorRef) {}

  get availableLayouts(): LayoutStyle[] {
    return this.layoutStyles;
  }

  toggleLayout(style: LayoutStyle): void {
    if (this.activeLayouts.has(style)) {
      this.activeLayouts.delete(style);
    } else {
      this.activeLayouts.add(style);
    }
    this.cdr.detectChanges();
  }

  isActive(style: LayoutStyle): boolean {
    return this.activeLayouts.has(style);
  }

  // ✨ Customization Options
  customSettings = {
    borderRadius: '1rem',
    cardBackgroundColor: '#ffffff',
    themeColor: '#f8f9fa',
    themeTextColor: '#111827',
    themeAccentColor: '#14b8a6',
    showShadow: true
  };
  
  defaultShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  
}