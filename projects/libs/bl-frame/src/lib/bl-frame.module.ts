import { NgModule } from '@angular/core';
import { BlFrameComponent } from './bl-frame.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WizardStepDirective } from './wizard-step.directive';
import { TabContentDirective } from './tab-content.directive';



@NgModule({
  declarations: [
    BlFrameComponent,
    WizardStepDirective,
    TabContentDirective
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BlFrameComponent,WizardStepDirective,
    
  ]
})
export class BlFrameModule { }
