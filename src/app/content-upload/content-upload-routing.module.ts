import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentUploadComponent } from './content-upload.component';

const routes: Routes = [
  {
    path: '',
    component: ContentUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentUploadRoutingModule { }
