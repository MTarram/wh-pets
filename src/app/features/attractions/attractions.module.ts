import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AttractionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AttractionsRoutingModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatSortModule,
    MatIconModule,
  ],
})
export class AttractionsModule {}
