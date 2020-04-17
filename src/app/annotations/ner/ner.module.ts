import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NerComponent } from './ner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { TokenComponent } from './token/token.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [NerComponent, TokenComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [NerComponent]
})
export class NerModule { }
