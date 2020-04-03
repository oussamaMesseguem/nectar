import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';

const routes: Routes = [
  {
    path: '',
    component: ContentUploadComponent
  },
  {
    path: 'adjust',
    component: AdjustmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InjectionRoutingModule { }
