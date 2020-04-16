import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConlluComponent } from './conllu.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { ValueListComponent } from './value-list/value-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PairComponent } from './value-list/pair/pair.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [ConlluComponent, ValueListComponent, PairComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatTableModule,
    MatTooltipModule
  ],
  exports: [ConlluComponent]
})
export class ConlluModule { }
