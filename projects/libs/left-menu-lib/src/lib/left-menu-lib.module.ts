import { NgModule } from '@angular/core';
import { LeftMenuLibComponent } from './left-menu-lib.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TabCommunicationService } from './tab-communication.service';



@NgModule({
  declarations: [
    LeftMenuLibComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    LeftMenuLibComponent,
  ],
  providers: [TabCommunicationService]
})
export class LeftMenuLibModule { }
