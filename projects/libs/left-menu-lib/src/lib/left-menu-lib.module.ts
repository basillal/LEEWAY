import { NgModule } from '@angular/core';
import { LeftMenuLibComponent } from './left-menu-lib.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LeftMenuLibComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    LeftMenuLibComponent
  ]
})
export class LeftMenuLibModule { }
