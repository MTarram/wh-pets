import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../../../core/models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../../core/services/users.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../shared/services/toaster.service';

export type UserFormResult =
  | 'saved'
  | 'cancelled'
  | { status: 'saved' | 'cancelled'; data: any };

@Component({
  selector: 'app-add-edit-user',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss',
})
export class AddEditUserComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToasterService,
    private dialogRef: MatDialogRef<AddEditUserComponent, UserFormResult>,
    @Inject(MAT_DIALOG_DATA) public data: IUser | null
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fname: [this.data?.fname || '', Validators.required],
      lname: [this.data?.lname || '', Validators.required],
      username: [this.data?.username || '', Validators.required],
    });
  }

  submit() {
    const val = this.form.value;
    this.isLoading = true;

    if (this.data) {
      // Edit existing
      this.userService
        .update({
          id: this.data.id,
          email: val.username,
          avatar: 'https://www.melivecode.com/users/1.png',
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
            this.toastService.showMessage('Error updating user');
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      // Create new
      this.userService
        .create({
          email: val.username,
          avatar: 'https://www.melivecode.com/users/1.png',
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
            this.toastService.showMessage('Error creating user');
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
