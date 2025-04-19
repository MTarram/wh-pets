import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  showMessage(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
