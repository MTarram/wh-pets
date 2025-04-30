import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AttractionService } from '../../../core/services/attractions.service';
import { IAttraction } from '../../../core/models/attraction.model';
import { ToasterService } from '../../../shared/services/toaster.service';

export type AttractionFormResult =
  | 'saved'
  | 'cancelled'
  | { status: 'saved' | 'cancelled'; data: any };

@Component({
  selector: 'app-add-edit-attraction',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-edit-attraction.component.html',
  styleUrl: './add-edit-attraction.component.scss',
})
export class AddEditAttractionComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private attractionService: AttractionService,
    private toastService: ToasterService,
    private dialogRef: MatDialogRef<
      AddEditAttractionComponent,
      AttractionFormResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: IAttraction | null
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      detail: [this.data?.detail || '', Validators.required],
      latitude: [this.data?.latitude || 0, Validators.required],
      longitude: [this.data?.longitude || 0, Validators.required],
    });
  }

  submit() {
    const val = this.form.value;
    this.isLoading = true;

    if (this.data) {
      // Edit existing
      this.attractionService
        .update({
          id: this.data.id,
          coverimage: 'https://www.melivecode.com/attractions/6.jpg',
          ...val,
        })
        .subscribe({
          next: (res) => {
            this.dialogRef.close({
              status: 'saved',
              data: res,
            });
          },
          error: (_) => {
            this.toastService.showMessage('Error updating attraction');
            this.isLoading = false;
          },
          complete: () => (this.isLoading = false),
        });
    } else {
      // Create new
      this.attractionService
        .create({
          coverimage: 'https://www.melivecode.com/attractions/6.jpg',
          ...val,
        })
        .subscribe({
          next: (res) => {
            this.dialogRef.close({
              status: 'saved',
              data: res,
            });
          },
          error: (_) => {
            this.toastService.showMessage('Error creating attraction');
            this.isLoading = false;
          },
          complete: () => (this.isLoading = false),
        });
    }
  }

  cancel() {
    this.dialogRef.close('cancelled');
  }
}
