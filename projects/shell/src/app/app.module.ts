import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftMenuLibModule } from '@libs/left-menu-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'projects/core/src/environments/environment';
import { AppLayoutComponent } from './modules/app-layout/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    LeftMenuLibModule,
    BrowserAnimationsModule
    
  ],
  providers: [{ provide: 'env', useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
