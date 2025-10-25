import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', 
    redirectTo: 'dashboard',
     pathMatch: 'full' }, 
  {
    path: 'dashboard',
    loadChildren: () => 
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'https://core-leeway.vercel.app/remoteEntry.js',
        exposedModule: './DashboardModule'
      }).then((m) => {
        console.log('Loaded Module:', m);
        return m.DashboardModule;
      }).catch((err) => {
        console.error('Error loading remote module', err);
        throw err;
      })
  },
  {
  path: 'usermanagement',
  loadChildren: () => 
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './UsermanagementModule'
    }).then((m) => {
      console.log('Loaded Module:', m);
      return m.UsermanagementModule;
    }).catch((err) => {
      console.error('Error loading remote module', err);
      throw err;
    })
},
{
  path: 'roles',
  loadChildren: () => 
    loadRemoteModule({
      type: 'module',
      remoteEntry: 'https://core-leeway.vercel.app/remoteEntry.js',
      exposedModule: './RolesModule'
    }).then((m) => {
      console.log('Loaded Module:', m);
      return m.RolesModule;
    }).catch((err) => {
      console.error('Error loading remote module', err);
      throw err;
    })
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
