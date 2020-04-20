import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjustorComponent } from './adjustor.component';
import { SentenceComponent } from './sentence/sentence.component';
import { TokenComponent } from './token/token.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdjustorRoutingModule } from './adjustor-routing.module';

@NgModule({
  declarations: [AdjustorComponent, SentenceComponent, TokenComponent],
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    AdjustorRoutingModule
  ],
  exports: [
    AdjustorComponent
  ]
})
export class AdjustorModule { }
