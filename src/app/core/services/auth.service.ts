import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { END_POINTS } from '../constants/api';

interface LoginResponse {
  status: string;
  message: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(!!this.token);

  constructor(private http: HttpClient) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  private get token(): string | null {
    return sessionStorage.getItem('JWT_TOKEN');
  }

  login(username: string, password: string) {
    return this.http
      .post<LoginResponse>(END_POINTS.LOGIN, { username, password })
      .pipe(
        tap((res) => {
          sessionStorage.setItem('JWT_TOKEN', res.accessToken);
          this.loggedIn$.next(true);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('JWT_TOKEN');
    this.loggedIn$.next(false);
  }
}
