import { Component, OnInit } from '@angular/core';
import { IUsers } from './models/users.interface';
import { UsersService } from '../../../../core/services/users.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'role',
    'password',
    'actions',
  ];
  dataSource: IUsers[] = [];
  roles: string[] = [];
  loading = false;
  currentUser: IUsers | null = null;

  totalItemsPage = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private usersService: UsersService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private storeServices: Store
  ) {

  }

  ngOnInit(): void {
    this.getPageData();
    this.getCurrentUser();
  }

  getPageData() {
    this.loadingService.setLoading(true);

    forkJoin([
      this.usersService.getRoles(),
      this.usersService.paginate(this.currentPage),
    ]).subscribe({
      next: (value) => {
        this.roles = value[0];
        const paginationResult = value[1];
        this.totalItemsPage = paginationResult.items;
        this.dataSource = paginationResult.data;
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onPage(ev: PageEvent) {
    this.currentPage = ev.pageIndex + 1;
    this.usersService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginationResult) => {
        this.totalItemsPage = paginationResult.items;
        this.dataSource = paginationResult.data;
        this.pageSize = ev.pageSize;
      },
    });
  }

  onDeleteUser(ev: IUsers): void {
    this.loadingService.setLoading(true);
    this.usersService.deleteUser(ev.id).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  getCurrentUser(): void {
    this.storeServices.select(selectAuthUser).subscribe({
      next: (user) => {
        console.log(user);
        this.currentUser = user;
      },
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  showModalDeleted(ev: IUsers): void {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este usuario?',
      text: 'Los cambios no se podran revertirse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteUser(ev);
      }
    });
  }

  onUserSubmitted(user: IUsers): void {
    this.loadingService.setLoading(true);
    this.usersService.createUser(user).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  // metodos dialog
  onCreateUser(): void {
    this.dialog
      .open(UserDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.onUserSubmitted(result);
          }
        },
      });
  }

  onEditUser(user: IUsers) {
    this.dialog
      .open(UserDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.loadingService.setLoading(true);
            this.usersService.updateUserById(user.id, result).subscribe({
              next: (users) => {
                this.dataSource = [...users];
              },
              complete: () => {
                this.loadingService.setLoading(false);
              },
            });
          }
        },
      });
  }
}
