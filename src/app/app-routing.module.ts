import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/layouts/main/main.component';


const routes: Routes = [
  {
    path: 'iniciar-sesion',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () =>
          import('./modules/users/cliente/client.module').then(
            (m) => m.ClientModule
          ),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
    ],
  },

  { path: '**', pathMatch: 'full', redirectTo: 'iniciar-sesion' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
