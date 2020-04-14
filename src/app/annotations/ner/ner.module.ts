import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NerComponent } from './ner.component';



@NgModule({
  declarations: [NerComponent],
  imports: [
    CommonModule
  ],
  exports: [NerComponent]
})
export class NerModule { }
