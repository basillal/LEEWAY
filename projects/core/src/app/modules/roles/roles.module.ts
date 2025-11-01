import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule, Routes } from '@angular/router';
// import { CreateViewLibModule } from '@libs/create-view-lib';
import { BasicReportLibModule } from '@libs/basic-report-lib';
import { BlFrameModule } from '@libs/bl-frame';
import { LeftMenuLibModule } from '@libs/left-menu-lib';
import { environment } from 'projects/core/src/environments/environment';
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
    providers: [{ provide: 'env', useValue: environment }]
  ,
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlFrameModule,
    BasicReportLibModule,
    LeftMenuLibModule
]
})
export class RolesModule { }
