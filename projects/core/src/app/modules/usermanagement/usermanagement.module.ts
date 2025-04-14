import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanagementComponent } from './usermanagement.component';
import { AgGridLibModule } from "../../../../../libs/ag-grid-lib/src/lib/ag-grid-lib.module";
import { RouterModule, Routes } from '@angular/router';
import { MultiDropdownLibModule } from '@libs/multi-dropdown-lib';
import { FormsModule } from '@angular/forms';
import { BasicReportLibModule } from '@libs/basic-report-lib';
import { CreateViewLibModule } from '@libs/create-view-lib';
const routes: Routes = [
  {
    path: '',
    component: UsermanagementComponent
  }
];

@NgModule({
  declarations: [
    UsermanagementComponent
  ],
  imports: [
    CommonModule,
    AgGridLibModule,
    RouterModule.forChild(routes),
    MultiDropdownLibModule,
    FormsModule,
    BasicReportLibModule,
    CreateViewLibModule
]
})
export class UsermanagementModule { }
