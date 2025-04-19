import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetSalesRoutingModule } from './pet-sales-routing.module';
import { PetSalesComponent } from './pet-sales.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [PetSalesComponent],
  imports: [
    CommonModule,
    PetSalesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PetSalesModule {}
