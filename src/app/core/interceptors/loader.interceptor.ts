import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../../shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderService.showLoader();

    return next
      .handle(request)
      .pipe(finalize(() => this.loaderService.hideLoader()));
  }
}
