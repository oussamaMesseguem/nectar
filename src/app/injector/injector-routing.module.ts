import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InjectorComponent } from './injector/injector.component';

const routes: Routes = [
  {
    path: '',
    component: InjectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InjectionRoutingModule { }
