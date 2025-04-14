import { NgModule } from '@angular/core';
import { CreateViewLibComponent } from './create-view-lib.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateViewLibComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateViewLibComponent
  ]
})
export class CreateViewLibModule { }
