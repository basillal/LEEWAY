import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
