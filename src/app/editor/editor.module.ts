import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor/editor.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { AnnotationListComponent } from './annotation-list/annotation-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConlluModule } from '../annotators/conllu/conllu.module';
import { NerModule } from '../annotators/ner/ner.module';
import { ExportComponent } from './export/export.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { InjectorComponent } from '../injector/injector/injector.component';
import { AdjustorModule } from '../adjustor/adjustor.module';
import { InjectorModule } from '../injector/injector.module';


@NgModule({
  declarations: [EditorComponent, AnnotationListComponent, ExportComponent, InjectorComponent],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Material Modules
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTooltipModule,
    // Nectar Modules
    AdjustorModule,
    ConlluModule,
    InjectorModule,
    NerModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
