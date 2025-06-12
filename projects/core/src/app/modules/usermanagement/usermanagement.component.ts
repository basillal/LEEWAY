import { Component, ChangeDetectorRef } from '@angular/core';
import { Theme, customSettings, defaultShadow } from './theme-settings';

// Define LayoutStyle type for type safety
type LayoutStyle =
  | 'grid'
  | 'small'
  | 'create'
  | 'modal'
  | 'tabbed'
  | 'sidebar'
  | 'card-stack'
  | 'wizard'
  | 'split-pane'
  | 'timeline'
  | 'kanban'
  | 'dashboard'
  | 'accordion'
  | 'form-wizard';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent {
  // Available layout styles
  layoutStyles: LayoutStyle[] = [
    'grid',
    'small',
    'create',
    'modal',
    'tabbed',
    'sidebar',
    'card-stack',
    'wizard',
    'split-pane',
    'timeline',
    'kanban',
    'dashboard',
    'accordion',
    'form-wizard',
  ];

  // Set of currently active layouts, initialized with 'grid'
  activeLayouts: Set<LayoutStyle> = new Set(['grid']);

  // Import settings from theme-settings.ts
  customSettings: Theme = customSettings;
  defaultShadow: string = defaultShadow;

  constructor(private cdr: ChangeDetectorRef) {}

  // Getter for available layouts
  get availableLayouts(): LayoutStyle[] {
    return this.layoutStyles;
  }

  // Toggle a layout's active state
  toggleLayout(style: LayoutStyle): void {
    if (this.activeLayouts.has(style)) {
      this.activeLayouts.delete(style);
    } else {
      this.activeLayouts.add(style);
    }
    this.cdr.detectChanges();
  }

  // Check if a layout is active
  isActive(style: LayoutStyle): boolean {
    return this.activeLayouts.has(style);
  }
}