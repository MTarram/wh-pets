import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { END_POINTS } from '../constants/api';
import { IWeeklySales, IPetSaleDetail } from '../models/pet-sales.model';

@Injectable({ providedIn: 'root' })
export class PetSalesService {
  constructor(private http: HttpClient) {}

  /** GET weekly total pets */
  getWeeklySales(date: string): Observable<IWeeklySales> {
    return this.http.get<IWeeklySales>(`${END_POINTS.PET_SALES}/7days/${date}`);
  }

  /** GET pets sales on a single day */
  getDailySales(date: string): Observable<IPetSaleDetail[]> {
    return this.http.get<IPetSaleDetail[]>(`${END_POINTS.PET_SALES}/${date}`);
  }
}
