import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR', 'ATHLETE'] },
  },
  {
    path: 'club-list',
    loadChildren: () =>
      import('./pages/clube/clube-list/clube-list.module').then(
        (m) => m.ClubeListPageModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR'] },
  },
  {
    path: 'event-list',
    loadChildren: () =>
      import('./pages/evento/evento-list/evento-list.module').then(
        (m) => m.EventListPageModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR', 'ATHLETE'] },
  },
  {
    path: 'training-schedule',
    loadChildren: () =>
      import(
        './pages/sessao-treino/sessao-treino-list/sessao-treino-list.module'
      ).then((m) => m.SessaoTreinoListPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR', 'ATHLETE'] },
  },
  {
    path: 'list-users',
    loadChildren: () =>
      import('./pages/usuarios/list-users/list-users.module').then(
        (m) => m.ListUsersPageModule
      ),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR'] },
  },
  {
    path: 'excel-upload',
    loadChildren: () => import('./excel-upload/excel-upload.module').then( m => m.ExcelUploadPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['TREINADOR'] },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
