import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'inject',
    loadChildren: () => import('./injector/injector.module').then(m => m.InjectorModule)
  },
  {
    path: 'adjust',
    loadChildren: () => import('./adjustor/adjustor.module').then(m => m.AdjustorModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
