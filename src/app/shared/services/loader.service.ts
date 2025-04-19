import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  showLoader(): void {
    this.isLoading$.next(true);
  }

  hideLoader(): void {
    this.isLoading$.next(false);
  }
}
