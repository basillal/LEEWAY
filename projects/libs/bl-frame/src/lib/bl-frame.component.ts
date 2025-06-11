// bl-frame.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bl-frame',
  templateUrl: './bl-frame.component.html',
  styleUrls: ['./bl-frame.component.css']
})
export class BlFrameComponent {
  @Input() layoutStyle: string = 'grid';
  @Input() title: string = '';

  // Theme customization
  @Input() themeColor: string = '#f8f9fa';
  @Input() themeTextColor: string = '#111827';
  @Input() themeAccentColor: string = '#14b8a6';

  // Size and layout customization
  @Input() containerHeight: string = 'calc(100vh - 80px)';
  @Input() containerWidth: string = '100%';
  @Input() minHeight: string = '100vh';
  @Input() maxHeight: string = '100vh';

  // Card and section customization
  @Input() cardBackgroundColor: string = '#ffffff';
  @Input() borderRadius: string = '1rem';
  @Input() gridShadow: string = '0 4px 6px rgba(0, 0, 0, 0.1)';

  // Tabbed layout
  @Input() tabs: string[] = [];
  @Input() activeTab: string = '';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Wizard layout
  @Input() wizardSteps: string[] = [];
  @Input() currentStepIndex: number = 0;

  // Carousel layout (future expansion)
  @Input() slides: any[] = [];
  @Input() activeSlide: number = 0;

  // Hero layout
  @Input() heroImageUrl: string = '';

  // Accordion layout (future expansion)
  @Input() accordionSections: { title: string, content: string, open: boolean }[] = [];

  // Actions
  openCreateView() {
    this.layoutStyle = 'create';
  }

  closeCreateView() {
    this.layoutStyle = 'grid';
  }
}


/* You can now use all the layout templates dynamically through `layoutStyle`.
   Each layout uses `@Input` properties for full customization from the parent. */