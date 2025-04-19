import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../core/models/user.model';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../core/services/users.service';
import {
  debounceTime,
  distinctUntilChanged,
  merge,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  AddEditUserComponent,
  UserFormResult,
} from './add-edit-user/add-edit-user.component';
import { ToasterService } from '../../shared/services/toaster.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'fname',
    'lname',
    'username',
    'avatar',
    'actions',
  ];

  dataSource = new MatTableDataSource<IUser>();
  totalUsers = 0;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  private search$ = new Subject<string>();
  private lastSearch = '';

  constructor(
    private userService: UserService,
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
          return this.userService.list(
            term,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize || this.pageSize,
            this.sort.active || 'id',
            this.sort.direction || 'asc'
          );
        })
      )
      .subscribe((resp) => {
        this.dataSource.data = resp.data;
        this.totalUsers = resp.total;
      });
  }

  ngAfterViewInit() {
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(startWith({}))
      .subscribe(() => this.loadUsers(this.lastSearch));
  }

  loadUsers(searchTerm: string = '') {
    const page = this.paginator.pageIndex + 1;
    const size = this.paginator.pageSize || this.pageSize;
    const sort = this.sort.active || 'id';
    const order = this.sort.direction || 'asc';

    this.userService
      .list(searchTerm, page, size, sort, order)
      .subscribe((res) => {
        this.dataSource.data = res.data;
        this.totalUsers = res.total;
      });
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.search$.next(term);
  }

  editUser(user: IUser) {
    const ref = this.dialog.open<AddEditUserComponent, IUser, UserFormResult>(
      AddEditUserComponent,
      {
        width: '400px',
        data: user,
      }
    );
    ref.afterClosed().subscribe((res: any) => {
      if (res.status === 'saved') {
        this.loadUsers(this.lastSearch);
        this.toastService.showMessage(res.data.message);
      }
    });
  }

  createUser() {
    const ref = this.dialog.open<AddEditUserComponent, null, UserFormResult>(
      AddEditUserComponent,
      {
        width: '400px',
        data: null,
      }
    );
    ref.afterClosed().subscribe((res: any) => {
      if (res.status === 'saved') {
        this.loadUsers(this.lastSearch);
        this.toastService.showMessage(res.data.message);
      }
    });
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.delete(id).subscribe((res: any) => {
      this.toastService.showMessage(res.message);
      this.loadUsers(this.lastSearch);
    });
  }
}
