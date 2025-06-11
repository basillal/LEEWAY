import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bl-frame',
  templateUrl: './bl-frame.component.html',
  styleUrls: ['./bl-frame.component.css'],
})
export class BlFrameComponent implements OnInit {
  @Input() layoutStyle: 'grid' | 'small' | 'create' | 'modal' | 'tabbed' | 'sidebar' | 'card-stack' | 'wizard' = 'grid';
  @Input() themeColor: string = '#f3f4f6';
  @Input() themeTextColor: string = '#1f2937';
  @Input() themeAccentColor: string = '#0ea5e9';
  @Input() containerHeight: string = 'calc(100vh - 100px)';
  @Input() title: string = 'Default Title';
  @Input() isCreateView: boolean = false;
  @Input() tabs: string[] = []; // For tabbed layout
  @Input() wizardSteps: string[] = []; // For wizard layout
  activeTab: string = '';
  currentStepIndex: number = 0;

  ngOnInit() {
    if (this.layoutStyle === 'tabbed' && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
    }
  }

  openCreateView() {
    this.isCreateView = true;
  }

  closeCreateView() {
    this.isCreateView = false;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  nextStep() {
    if (this.currentStepIndex < this.wizardSteps.length - 1) {
      this.currentStepIndex++;
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    }
  }
}
