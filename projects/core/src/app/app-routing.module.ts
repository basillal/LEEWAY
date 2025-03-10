import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', 
    redirectTo: 'dashboard',
     pathMatch: 'full'
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
