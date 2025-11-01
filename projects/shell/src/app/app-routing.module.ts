import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { SharedAuthComponent } from '@libs/shared-auth';
import { AppLayoutComponent } from './modules/app-layout/app-layout.component';

const routes: Routes = [
  // 🔹 Login route — standalone (no layout)
  { path: 'login', component: SharedAuthComponent },

  // 🔹 All "core" routes wrapped with layout
  {
    path: 'core',          // 👈 Now under /core
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard', // http://localhost:4200/core/dashboard
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './DashboardModule',
          })
            .then((m) => m.DashboardModule)
            .catch((err) => {
              console.error('Error loading DashboardModule', err);
              throw err;
            }),
      },
      {
        path: 'usermanagement', // http://localhost:4200/core/usermanagement
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './UsermanagementModule',
          })
            .then((m) => m.UsermanagementModule)
            .catch((err) => {
              console.error('Error loading UsermanagementModule', err);
              throw err;
            }),
      },
      {
        path: 'roles', // http://localhost:4200/core/roles
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './RolesModule',
          })
            .then((m) => m.RolesModule)
            .catch((err) => {
              console.error('Error loading RolesModule', err);
              throw err;
            }),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default inside core
    ],
  },

  // 🔹 Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false, // optional — switch to true if you need hash URLs
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
