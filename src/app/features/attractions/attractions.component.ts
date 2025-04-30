import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  takeUntil,
} from 'rxjs';
import { AttractionService } from '../../core/services/attractions.service';
import { IAttraction } from '../../core/models/attraction.model';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../shared/services/toaster.service';
import {
  AddEditAttractionComponent,
  AttractionFormResult,
} from './add-edit-attraction/add-edit-attraction.component';

@Component({
  selector: 'app-attractions',
  standalone: false,
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.scss',
})
export class AttractionsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'detail',
    'coverimage',
    'latitude',
    'longitude',
    'actions',
  ];
  dataSource = new MatTableDataSource<IAttraction>();
  totalAttractions = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  // Observable for search input
  private search$ = new Subject<string>();
  private lastSearch = '';

  // To unsubscribe from observables when the component is destroyed
  private destroy$ = new Subject<void>();

  constructor(
    private attractionService: AttractionService,
    private dialog: MatDialog,
    private toastService: ToasterService
  ) {}

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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.totalAttractions = res.total;
      });
  }

  ngAfterViewInit() {
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(startWith({}), takeUntil(this.destroy$))
      .subscribe(() => this.loadAttractions(this.lastSearch));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  editAttraction(attraction: IAttraction) {
    const ref = this.dialog.open<
      AddEditAttractionComponent,
      IAttraction,
      AttractionFormResult
    >(AddEditAttractionComponent, {
      width: '400px',
      data: attraction,
    });
    ref.afterClosed().subscribe((res: any) => {
      if (res.status === 'saved') {
        this.loadAttractions(this.lastSearch);
        this.toastService.showMessage(res.data.message);
      }
    });
  }

  createAttraction() {
    const ref = this.dialog.open<
      AddEditAttractionComponent,
      null,
      AttractionFormResult
    >(AddEditAttractionComponent, {
      width: '400px',
      data: null,
    });
    ref.afterClosed().subscribe((res: any) => {
      if (res.status === 'saved') {
        this.loadAttractions(this.lastSearch);
        this.toastService.showMessage(res.data.message);
      }
    });
  }

  deleteAttraction(id: number) {
    if (!confirm('Are you sure you want to delete this attraction?')) return;

    this.attractionService.delete(id).subscribe(
      (res: any) => {
        this.toastService.showMessage(res.message);
        this.loadAttractions(this.lastSearch);
      },
      (error) => {
        this.toastService.showMessage(error.error.message);
      }
    );
  }
}
