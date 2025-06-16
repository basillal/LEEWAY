import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface Theme {
  themeColor: string;
  themeTextColor: string;
  cardBackgroundColor: string;
  themeAccentColor: string;
  borderRadius: string;
  gridShadow: string;
  showShadow: boolean; // Added
  minHeight?: string;
  maxHeight?: string;
  containerHeight?: string;
  containerWidth?: string;
  transition?: string;
}

@Component({
  selector: 'bl-frame',
  templateUrl: './bl-frame.component.html',
  encapsulation: ViewEncapsulation.None // Allow global styles like Tailwind
})
export class BlFrameComponent {
  @Input() layoutStyle: 'grid' | 'small' | 'create' | 'modal' | 'tabbed' | 'sidebar' | 'card-stack' | 'wizard' | 'split-pane' | 'timeline' | 'kanban' | 'dashboard' | 'accordion' | 'form-wizard' = 'grid';
  @Input() theme: Theme = {
    themeColor: '#f9fafb',
    themeTextColor: '#1f2937',
    cardBackgroundColor: '#ffffff',
    themeAccentColor: '#0d9488',
    borderRadius: '0.5rem',
    gridShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    showShadow: true, // Added
    minHeight: '400px',
    containerHeight: '100%',
    containerWidth: '100%',
    transition: 'all 0.3s ease',
  };
  @Input() title: string = '';
  @Input() tabs: string[] = ['Tab 1', 'Tab 2', 'Tab 3'];
  @Input() wizardSteps: string[] = ['Step 1', 'Step 2', 'Step 3'];
  @Input() currentStepIndex: number = 0;
  @Input() containerWidth: string = '100%';
  @Input() containerHeight: string = 'auto';
  @Input() minHeight: string = '400px';
  @Input() showShadow: boolean = true; // Added as direct input for flexibility

  activeTab: string = this.tabs[0];

  openCreateView(): void {
    // Logic to switch to create/modal view
  }

  closeCreateView(): void {
    // Logic to close create/modal view
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  goToStep(index: number): void {
    this.currentStepIndex = index;
  }

  // Helper to get effective shadow value
  get effectiveShadow(): string {
    return (this.showShadow !== undefined ? this.showShadow : this.theme.showShadow) ? this.theme.gridShadow : 'none';
  }
}