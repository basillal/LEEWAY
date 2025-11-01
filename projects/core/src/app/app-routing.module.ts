import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedAuthComponent } from '@libs/shared-auth';

const routes: Routes = [
  { path: '', 
    redirectTo: 'dashboard',
     pathMatch: 'full'
  }, 

  {
    path: 'login',
    component: SharedAuthComponent,
    pathMatch: 'full',
    data: {
      module: 'Shell',
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      )
  },

  {
    path: 'usermanagement',
    loadChildren: () =>
      import('./modules/usermanagement/usermanagement.module').then(
        m => m.UsermanagementModule
      )
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./modules/roles/roles.module').then(
        m => m.RolesModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
