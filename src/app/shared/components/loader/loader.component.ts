import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="loaderContainer">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
