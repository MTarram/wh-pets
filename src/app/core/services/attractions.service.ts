import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from '../constants/api';
import { IListResponse } from '../models/list-response.model';
import { IAttraction } from '../models/attraction.model';

@Injectable({ providedIn: 'root' })
export class AttractionService {
  constructor(private http: HttpClient) {}

  /** List attractions with pagination, sorting, and search */
  list(
    search: string = '',
    page: number = 0,
    per_page: number = 10,
    sort_column: string = 'id',
    sort_order: 'asc' | 'desc' = 'asc'
  ): Observable<IListResponse<IAttraction>> {
    let params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('per_page', per_page.toString())
      .set('sort_column', sort_column)
      .set('sort_order', sort_order);
    return this.http.get<IListResponse<IAttraction>>(END_POINTS.ATTRACTIONS, {
      params,
    });
  }

  /** Create a new attraction */
  create(attraction: Partial<IAttraction>): Observable<IAttraction> {
    return this.http.post<IAttraction>(
      `${END_POINTS.ATTRACTIONS_AUTH}/create`,
      attraction
    );
  }

  /** Update an existing attraction */
  update(attraction: Partial<IAttraction>): Observable<IAttraction> {
    return this.http.put<IAttraction>(
      `${END_POINTS.ATTRACTIONS_AUTH}/update`,
      attraction
    );
  }

  /** Delete an attraction */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${END_POINTS.ATTRACTIONS_AUTH}/delete`, {
      body: { id },
    });
  }
}
