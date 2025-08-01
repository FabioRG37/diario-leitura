import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'criar-conta',
    loadChildren: () => import('./pages/criar-conta/criar-conta.module').then(m => m.CriarContaPageModule)
   },
  { path: 'home',
     loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
   },
  { path: 'busca', 
    loadChildren: () => import('./pages/busca/busca.module').then(m => m.BuscaPageModule),
    canActivate: [AuthGuard]
   },
  { path: 'detalhes-livro/:id', 
    loadChildren: () => import('./pages/detalhes-livro/detalhes-livro.module').then(m => m.DetalhesLivroPageModule),
    canActivate: [AuthGuard]
   },
  { path: 'estante', 
    loadChildren: () => import('./pages/estante/estante.module').then(m => m.EstantePageModule),
    canActivate: [AuthGuard]
   },
  { path: 'estatisticas', 
    loadChildren: () => import('./pages/estatisticas/estatisticas.module').then(m => m.EstatisticasPageModule),
    canActivate: [AuthGuard]
   },
  { path: 'editar-progresso/:id', 
    loadChildren: () => import('./pages/editar-progresso/editar-progresso.module').then(m => m.EditarProgressoPageModule),
    canActivate: [AuthGuard]
   },
  { path: 'conquistas', 
    loadChildren: () => import('./pages/conquistas/conquistas.module').then(m => m.ConquistasPageModule),
    canActivate: [AuthGuard]
   },
  { path: 'meta', 
    loadChildren: () => import('./pages/meta/meta.module').then(m => m.MetaPageModule),
    canActivate: [AuthGuard]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
