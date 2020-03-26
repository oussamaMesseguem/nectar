import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentUploadComponent } from './content-upload.component';
import { ContentUploadRoutingModule } from './content-upload-routing.module';

@NgModule({
  declarations: [ContentUploadComponent],
  imports: [
    CommonModule,
    ContentUploadRoutingModule
  ]
})
export class ContentUploadModule { }
