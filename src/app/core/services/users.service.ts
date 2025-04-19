import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { END_POINTS } from '../constants/api';
import { IListResponse } from '../models/list-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  /** List users with pagination, sorting, and search */
  list(
    search: string = '',
    page: number = 0,
    per_page: number = 10,
    sort_column: string = 'id',
    sort_order: 'asc' | 'desc' = 'asc'
  ): Observable<IListResponse<IUser>> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('sort_column', sort_column)
      .set('sort_order', sort_order);
    return this.http.get<IListResponse<IUser>>(END_POINTS.USERS, { params });
  }

  /** Create a new user */
  create(user: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(`${END_POINTS.USERS}/create`, user);
  }

  /** Update an existing user */
  update(user: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${END_POINTS.USERS}/update`, user);
  }

  /** Delete a user */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${END_POINTS.USERS}/delete`, {
      body: { id },
    });
  }
}
