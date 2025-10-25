import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule, Routes } from '@angular/router';
// import { CreateViewLibModule } from '@libs/create-view-lib';
import { BasicReportLibModule } from '@libs/basic-report-lib';
import { BlFrameModule } from '@libs/bl-frame';
const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  }
];

@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlFrameModule,
    BasicReportLibModule,
  ]
})
export class RolesModule { }
