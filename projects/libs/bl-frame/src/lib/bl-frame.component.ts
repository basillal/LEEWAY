import {
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';

import { WizardStepDirective } from './wizard-step.directive';
import { TabContentDirective } from './tab-content.directive';

export interface Theme {
  themeColor: string;
  themeTextColor: string;
  cardBackgroundColor: string;
  themeAccentColor: string;
  borderRadius: string;
  gridShadow: string;
  showShadow: boolean;
  minHeight?: string;
  maxHeight?: string;
  containerHeight?: string;
  containerWidth?: string;
  transition?: string;
}

@Component({
  selector: 'bl-frame',
  templateUrl: './bl-frame.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlFrameComponent implements AfterContentInit {
  @Input() layoutStyle:
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
    | 'form-wizard' = 'grid';

  @Input() theme: Theme = {
    themeColor: '#f9fafb',
    themeTextColor: '#1f2937',
    cardBackgroundColor: '#ffffff',
    themeAccentColor: '#0d9488',
    borderRadius: '0.5rem',
    gridShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    showShadow: true,
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
  @Input() showShadow: boolean = true;

  @ContentChildren(WizardStepDirective) wizardStepTemplates!: QueryList<WizardStepDirective>;
  @ContentChildren(TabContentDirective) tabContentTemplates!: QueryList<TabContentDirective>;

  stepTemplates: TemplateRef<any>[] = [];
  tabTemplates: { [key: string]: TemplateRef<any> } = {};

  activeTab: string = '';

  ngAfterContentInit() {
    // Wizard steps
    this.stepTemplates = this.wizardStepTemplates
      ?.toArray()
      .sort((a, b) => a.stepIndex - b.stepIndex)
      .map((step) => step.templateRef) ?? [];

    // Tab content mapping added
    this.tabTemplates = {};
    this.tabContentTemplates?.forEach((tpl) => {
      if (tpl.tabName) {
        this.tabTemplates[tpl.tabName] = tpl.templateRef;
      }
    });

    // Set first active tab if not already
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
    }

    // Debug logging
    console.log('✅ Tab Templates:', this.tabTemplates);
    console.log('👉 Active Tab:', this.activeTab);
  }
  @Output() createClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();
  
  openCreateView(): void {
    this.createClicked.emit();
  }
  
  closeCreateView(): void {
    this.backClicked.emit();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  goToStep(index: number): void {
    this.currentStepIndex = index;
  }

  get effectiveShadow(): string {
    return (this.showShadow !== undefined ? this.showShadow : this.theme.showShadow)
      ? this.theme.gridShadow
      : 'none';
  }
}