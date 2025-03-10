import { NgModule } from '@angular/core';
import { AgGridLibComponent } from './ag-grid-lib.component';
import { AgGridModule } from 'ag-grid-angular';




@NgModule({
  declarations: [
    AgGridLibComponent
  ],
  imports: [
    AgGridModule
  ],
  exports: [
    AgGridLibComponent
  ]
})
export class AgGridLibModule { }
