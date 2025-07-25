import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'busca', loadChildren: () => import('./pages/busca/busca.module').then(m => m.BuscaPageModule) },
  { path: 'detalhes-livro/:id', loadChildren: () => import('./pages/detalhes-livro/detalhes-livro.module').then(m => m.DetalhesLivroPageModule) },
  { path: 'estante', loadChildren: () => import('./pages/estante/estante.module').then(m => m.EstantePageModule) },
  { path: 'estatisticas', loadChildren: () => import('./pages/estatisticas/estatisticas.module').then(m => m.EstatisticasPageModule) },
  { path: 'editar-progresso/:id', loadChildren: () => import('./pages/editar-progresso/editar-progresso.module').then(m => m.EditarProgressoPageModule) },
  { path: 'conquistas', loadChildren: () => import('./pages/conquistas/conquistas.module').then(m => m.ConquistasPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
