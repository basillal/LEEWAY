import { NgModule } from '@angular/core';
import { BasicReportLibComponent } from './basic-report-lib.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiDropdownLibModule } from '@libs/multi-dropdown-lib';


@NgModule({
  declarations: [
    BasicReportLibComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MultiDropdownLibModule
   ],
  exports: [
    BasicReportLibComponent
  ]
})
export class BasicReportLibModule { }
