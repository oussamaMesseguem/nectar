import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConlluComponent } from './conllu.component';



@NgModule({
  declarations: [ConlluComponent],
  imports: [
    CommonModule
  ],
  exports: [ConlluComponent]
})
export class ConlluModule { }
