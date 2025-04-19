import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/services/loader.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PetsDashboard';

  constructor(public loaderService: LoaderService) {}
}
