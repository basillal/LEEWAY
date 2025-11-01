import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { BasicReportLibModule } from '@libs/basic-report-lib';
import { SharedAuthModule } from '@libs/shared-auth';
import { environment } from 'projects/core/src/environments/environment';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];
@NgModule({
  declarations: [
    DashboardComponent
  ],
  providers: [{ provide: 'env', useValue: environment }]
  ,
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BasicReportLibModule,
    SharedAuthModule

    
  ]
})
export class DashboardModule { }
