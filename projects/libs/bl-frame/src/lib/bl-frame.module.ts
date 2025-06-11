import { NgModule } from '@angular/core';
import { BlFrameComponent } from './bl-frame.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BlFrameComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BlFrameComponent
  ]
})
export class BlFrameModule { }
