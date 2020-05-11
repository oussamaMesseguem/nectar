import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NerPlusPlusComponent } from './ner-plus-plus.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenComponent } from './token/token.component';
import { MatMenuModule } from '@angular/material/menu';
import { ObserversModule } from '@angular/cdk/observers';



@NgModule({
  declarations: [NerPlusPlusComponent, TokenComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    ObserversModule
  ],
  exports: [NerPlusPlusComponent]
})
export class NerPlusPlusModule { }
