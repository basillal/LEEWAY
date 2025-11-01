import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [AgGridModule], // or add custom cell renderers
  exports: [AgGridModule],
})
export class AgGridSharedModule {}
