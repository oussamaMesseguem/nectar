import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdjustorComponent } from './adjustor/adjustor.component';

const routes: Routes = [
{
    path: '',
    component: AdjustorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdjustorRoutingModule { }
