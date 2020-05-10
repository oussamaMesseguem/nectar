import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NerComponent } from './ner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { TokenComponent } from './token/token.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ObserversModule } from '@angular/cdk/observers';



@NgModule({
  declarations: [NerComponent, TokenComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    ObserversModule
  ],
  exports: [NerComponent]
})
export class NerModule { }
