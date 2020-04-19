import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'inject',
    loadChildren: () => import('./injection/injection.module').then(m => m.InjectionModule)
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
