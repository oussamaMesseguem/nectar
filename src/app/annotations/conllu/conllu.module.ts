import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConlluComponent } from './conllu.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';



@NgModule({
  declarations: [ConlluComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatTableModule
  ],
  exports: [ConlluComponent]
})
export class ConlluModule { }
