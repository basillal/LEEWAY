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

/**
 * Theme configuration interface for styling the BlFrameComponent.
 */
export interface Theme {
  /** Background color of the overall layout */
  themeColor: string;
  /** Text color used throughout the component */
  themeTextColor: string;
  /** Background color of cards or content sections */
  cardBackgroundColor: string;
  /** Accent color used for highlights, buttons, borders, etc. */
  themeAccentColor: string;
  /** CSS border-radius value for rounded corners */
  borderRadius: string;
  /** Box shadow applied to cards or containers */
  gridShadow: string;
  /** Whether the shadow should be applied */
  showShadow: boolean;
  /** Optional minimum height of the main container */
  minHeight?: string;
  /** Optional maximum height of the main container */
  maxHeight?: string;
  /** Optional height of the component container */
  containerHeight?: string;
  /** Optional width of the component container */
  containerWidth?: string;
  /** Optional CSS transition for smooth animations */
  transition?: string;
}


/**
 * A reusable and configurable layout wrapper component that supports
 * multiple UI layout patterns, theme-based styling, dynamic content insertion,
 * and common actions like create/back navigation.
 * 
 * ## Features:
 * - Multiple layout styles (grid, modal, tabbed, wizard, sidebar, kanban, etc.)
 * - Dynamic theming using the `Theme` interface
 * - Tabbed layout with dynamic content switching
 * - Wizard layout with step management
 * - Create/back action support for forms and modals
 * - Template projection using `WizardStepDirective` and `TabContentDirective`
 * - Customizable container dimensions and transitions
 * 
 * ## Inputs:
 * 
 * - `layoutStyle`: Defines the layout style of the component.
 *   - Options: `'grid' | 'small' | 'create' | 'modal' | 'tabbed' | 'sidebar' | 'card-stack' | 'wizard' | 'split-pane' | 'timeline' | 'kanban' | 'dashboard' | 'accordion' | 'form-wizard'`
 * 
 * - `theme`: Custom theme object to configure styling (background, border, colors, etc.).
 *   - Properties include:
 *     - `themeColor`: Background color of the layout
 *     - `themeTextColor`: Text color
 *     - `cardBackgroundColor`: Background color for content cards
 *     - `themeAccentColor`: Accent color (e.g., for buttons/highlights)
 *     - `borderRadius`: Border radius for rounding
 *     - `gridShadow`: CSS box-shadow for container
 *     - `showShadow`: Whether to show the shadow
 *     - `minHeight`, `maxHeight`, `containerHeight`, `containerWidth`, `transition`: Optional dimension and animation properties
 * 
 * - `title`: Title to be displayed in the layout (useful for modal/create modes).
 * - `tabs`: Array of tab labels (used in `tabbed` layout).
 * - `wizardSteps`: Array of step labels (used in `wizard` layout).
 * - `currentStepIndex`: Index of the active step in wizard layout (default: `0`).
 * - `containerWidth`: Custom container width (overrides theme).
 * - `containerHeight`: Custom container height (overrides theme).
 * - `minHeight`: Minimum height of the layout (overrides theme).
 * - `showShadow`: Whether to show shadow (overrides theme).
 * 
 * ## Outputs:
 * 
 * - `createClicked`: Emits when the create action is triggered (used in 'create' layout).
 * - `backClicked`: Emits when the back action is triggered (e.g., modal/cancel).
 * 
 * ## Directives:
 * 
 * - `WizardStepDirective`: Marks a `<ng-template>` as a wizard step. Requires a `stepIndex`.
 * - `TabContentDirective`: Marks a `<ng-template>` as tab content. Requires a `tabName`.
 * 
 * ## Usage Example:
 * ```html
 * <bl-frame
 *   [layoutStyle]="'tabbed'"
 *   [tabs]="['Overview', 'Settings']"
 *   [title]="'User Management'"
 *   [theme]="customTheme"
 *   (createClicked)="onCreateClicked()"
 *   (backClicked)="onBackClicked()"
 * >
 *   <ng-template tabContent tabName="Overview">
 *     <p>Overview content here.</p>
 *   </ng-template>
 *   <ng-template tabContent tabName="Settings">
 *     <p>Settings content here.</p>
 *   </ng-template>
 * </bl-frame>
 * ```
 * 
 * ## Notes:
 * - For tabbed layouts, ensure that `tabs` and `tabContent` template names match.
 * - For wizard layout, use `wizardSteps` with matching `WizardStepDirective` templates.
 * - Layouts are fully stylable via `theme` input, enabling custom visual designs.
 */

@Component({
  selector: 'bl-frame',
  templateUrl: './bl-frame.component.html',
  styleUrls: ['../styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlFrameComponent implements AfterContentInit {
  /**
   * Defines the layout style of the component.
   * 
   * Available options:
   * - 'grid', 'small', 'create', 'modal', 'tabbed', 'sidebar',
   * - 'card-stack', 'wizard', 'split-pane', 'timeline',
   * - 'kanban', 'dashboard', 'accordion', 'form-wizard'
   */
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

  /**
   * Theme configuration for customizing the visual appearance of the component.
   *
   * Properties:
   * - `themeColor`: Background color of the overall theme.
   * - `themeTextColor`: Text color used inside the component.
   * - `cardBackgroundColor`: Background color of cards or blocks.
   * - `themeAccentColor`: Highlight or accent color.
   * - `borderRadius`: Border radius for rounded corners.
   * - `gridShadow`: Shadow style applied to containers.
   * - `showShadow`: Whether shadow is enabled.
   * - `minHeight`: Minimum height of the layout.
   * - `containerHeight`: Fixed height of the component.
   * - `containerWidth`: Width of the component.
   * - `transition`: CSS transition animation.
   */
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

  /** Header title displayed in the layout (if applicable) */
  @Input() title: string = '';

  /** Labels for tabs shown in 'tabbed' layout */
  @Input() tabs: string[] = ['Tab 1', 'Tab 2', 'Tab 3'];

  /** Step labels for the wizard layout */
  @Input() wizardSteps: string[] = ['Step 1', 'Step 2', 'Step 3'];

  /** Currently active step index in 'wizard' layout */
  @Input() currentStepIndex: number = 0;

  /** Overrides the theme container width */
  @Input() containerWidth: string = '100%';

  /** Overrides the theme container height */
  @Input() containerHeight: string = 'auto';

  /** Overrides the theme minimum height */
  @Input() minHeight: string = '400px';

  /** Overrides theme.showShadow if needed */
  @Input() showShadow: boolean = true;

  /**
   * Emits when a "Create" action is triggered (used in 'create' layout)
   */
  @Output() createClicked = new EventEmitter<void>();


  /**
   * Modal sizes
   * */
  @Input() modalSize: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
 

  /**
   * Emits when a "Back" action is triggered (e.g. in modal, create layout)
   */
  @Output() backClicked = new EventEmitter<void>();

  /**
   * Collects all wizard step templates using `WizardStepDirective`
   */
  @ContentChildren(WizardStepDirective) wizardStepTemplates!: QueryList<WizardStepDirective>;

  /**
   * Collects all tab content templates using `TabContentDirective`
   */
  @ContentChildren(TabContentDirective) tabContentTemplates!: QueryList<TabContentDirective>;

  /** Ordered list of wizard step templates */
  stepTemplates: TemplateRef<any>[] = [];

  /** Mapped tab name to its template reference */
  tabTemplates: { [key: string]: TemplateRef<any> } = {};

  /** Currently active tab name in 'tabbed' layout */
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

  get modalSizeClass(): string {
    const sizes: Record<string, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-2xl',
      full: 'w-full max-w-7xl'
    };
    return sizes[this.modalSize] || 'max-w-md';
  }
  
}