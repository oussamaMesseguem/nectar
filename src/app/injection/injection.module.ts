import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentUploadComponent } from './content-upload/content-upload.component';
import { InjectionRoutingModule } from './injection-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TokenComponent } from './adjustment/token/token.component';
import { SentenceComponent } from './adjustment/sentence/sentence.component';

@NgModule({
  declarations: [ContentUploadComponent, AdjustmentComponent, TokenComponent, SentenceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatMenuModule,
    InjectionRoutingModule
  ]
})
export class InjectionModule { }
