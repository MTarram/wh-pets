import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  merge,
  startWith,
} from 'rxjs';
import { AttractionService } from '../../core/services/attractions.service';
import { IAttraction } from '../../core/models/attraction.model';

@Component({
  selector: 'app-attractions',
  standalone: false,
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.scss',
})
export class AttractionsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'detail',
    'coverimage',
    'latitude',
    'longitude',
  ];
  dataSource = new MatTableDataSource<IAttraction>();
  totalAttractions = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  private search$ = new Subject<string>();
  private lastSearch = '';

  constructor(private attractionService: AttractionService) {}

  ngOnInit() {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.lastSearch = term;
          this.paginator.firstPage(); // reset to page 1
          return this.attractionService.list(
            term,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize || this.pageSize,
            this.sort.active || 'id',
            this.sort.direction || 'asc'
          );
        })
      )
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.totalAttractions = res.total;
      });
  }

  ngAfterViewInit() {
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(startWith({}))
      .subscribe(() => this.loadAttractions(this.lastSearch));
  }

  loadAttractions(searchTerm: string = '') {
    const page = this.paginator.pageIndex + 1;
    const size = this.paginator.pageSize || this.pageSize;
    const sort = this.sort.active || 'id';
    const order = this.sort.direction || 'asc';

    this.attractionService
      .list(searchTerm, page, size, sort, order)
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.totalAttractions = res.total;
      });
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.search$.next(term);
  }

  deleteAttraction(id: number) {
    this.attractionService.delete(id).subscribe(() => this.loadAttractions());
  }
}
