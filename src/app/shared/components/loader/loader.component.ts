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
  styles: [
    `
      :host ::ng-deep {
        .loaderContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          bottom: 0;
          inset-inline: 0;
          background-color: rgba(255, 255, 255, 0.362);
          z-index: 1;
        }
      }
    `,
  ],
})
export class LoaderComponent {}
