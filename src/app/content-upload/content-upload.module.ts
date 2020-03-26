import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentUploadComponent } from './content-upload.component';
import { ContentUploadRoutingModule } from './content-upload-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [ContentUploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    ContentUploadRoutingModule
  ]
})
export class ContentUploadModule { }
