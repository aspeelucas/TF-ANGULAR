import { Component } from '@angular/core';
import { IStudent } from './models/student.model';
import { StudentsService } from './students.services';
import { LoadingService } from '../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { IUsers } from '../users/models/users.interface';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'phone',
    'role',
    'actions',
  ];
  dataSource: IStudent[] = [];
  loading = false;
  totalItemsPage = 0;
  pageSize = 5;
  currentPage = 1;
  currentUser: IUsers | null = null;

  constructor(
    private studentsService: StudentsService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private storeServices: Store
  ) {}

  ngOnInit(): void {
    this.getPageData();
    this.getCurrentUser();
  }

  getPageData() {
    this.loadingService.setLoading(true);

    forkJoin([this.studentsService.paginate(this.currentPage)]).subscribe({
      next: (value) => {
        const paginationResult = value[0];
        console.log(paginationResult);
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
    this.studentsService.paginate(this.currentPage, ev.pageSize).subscribe({
      next: (paginationResult) => {
        this.totalItemsPage = paginationResult.items;
        this.dataSource = paginationResult.data;
        this.pageSize = ev.pageSize;
      },
    });
  }

  onDeleteUser(ev: IStudent): void {
    this.loadingService.setLoading(true);
    this.studentsService.deleteUser(ev.id).subscribe({
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
        this.currentUser = user;
      },
    });
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  showModalDeleted(ev: IStudent): void {
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

  onUserSubmitted(user: IStudent): void {
    this.loadingService.setLoading(true);
    this.studentsService.createUser(user).subscribe({
      next: (users) => {
        this.dataSource = [...users];
      },
      complete: () => {
        this.loadingService.setLoading(false);
      },
    });
  }

  onCreateUser(): void {
    this.dialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.onUserSubmitted(result);
          }
        },
      });
  }

  onEditUser(user: IStudent) {
    this.dialog
      .open(StudentDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.loadingService.setLoading(true);
            this.studentsService.updateUserById(user.id, result).subscribe({
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
