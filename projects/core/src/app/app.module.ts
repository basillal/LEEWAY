import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuLibModule } from 'dist/libs/left-menu-lib';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AgGridLibModule } from '@libs/ag-grid-lib';
import { MultiDropdownLibModule } from '@libs/multi-dropdown-lib';
import { BasicReportLibModule } from '@libs/basic-report-lib';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeftMenuLibModule,
    AgGridLibModule,
    MultiDropdownLibModule,
    BasicReportLibModule
  
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent,DashboardModule]

})
export class AppModule { }
