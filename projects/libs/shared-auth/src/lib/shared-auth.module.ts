import { ModuleWithProviders, NgModule } from '@angular/core';
import { SharedAuthComponent } from './shared-auth.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/authService.service';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { SharedToastService } from './toast/shared-toast.service';
import { ToastComponent } from './toast/toast.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from './services/spinner.service';



@NgModule({
  declarations: [
    SharedAuthComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ToastrModule.forRoot(),
    ToastComponent,
    NgxSpinnerModule
  ],
  exports: [
    SharedAuthComponent,
    ToastComponent,
    NgxSpinnerModule
    
  ],
  providers: [
    AuthService,
    AuthGuard,
    SharedToastService,
    SpinnerService
  ]
})
export class SharedAuthModule {
  // static forRoot(config: AuthConfig): ModuleWithProviders<SharedAuthModule> {
  //   return {
  //     ngModule: SharedAuthModule,
  //     providers: [
  //       {
  //         provide: 'AUTH_CONFIG',
  //         useValue: config
  //       },
  //       AuthService,
  //       AuthGuard,
  //       UserDisplayNameService,
  //       // {
  //       //   provide: HTTP_INTERCEPTORS,
  //       //   useClass: CommonHttpInterceptor,
  //       //   multi: true,
  //       // },
  //     ],
  //   };
  // }
 }

export { SharedToastService } from './toast/shared-toast.service';
export { ToastComponent } from './toast/toast.component';
