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
  // All available layout styles
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

  // Track active layouts (can support multi-layout view)
  activeLayouts: Set<LayoutStyle> = new Set(['grid']); // Default active

  constructor(private cdr: ChangeDetectorRef) {}

  // Expose available layouts to template
  get availableLayouts(): LayoutStyle[] {
    return this.layoutStyles;
  }

  // Toggle layout visibility
  toggleLayout(style: LayoutStyle): void {
    if (this.activeLayouts.has(style)) {
      this.activeLayouts.delete(style);
    } else {
      this.activeLayouts.add(style);
    }
    this.cdr.detectChanges(); // Ensure UI updates
  }

  // Check if a layout is currently active
  isActive(style: LayoutStyle): boolean {
    return this.activeLayouts.has(style);
  }
}
