import { NgModule } from '@angular/core';
import { MultiDropdownLibComponent } from './multi-dropdown-lib.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    MultiDropdownLibComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    MultiDropdownLibComponent
  ]
})
export class MultiDropdownLibModule { }
