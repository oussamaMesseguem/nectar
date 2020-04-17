import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NerComponent } from './ner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [NerComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  exports: [NerComponent]
})
export class NerModule { }
