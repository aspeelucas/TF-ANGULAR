import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../../../core/services/users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { IUsers } from '../../models/users.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'phone', 'role'];
  displayedColumnsCourses: string[] = ['id2', 'name', 'start', 'end', 'price'];
  dataSource: IUsers[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setLoading(true);
    this.usersService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (findedUser) => {
        if (findedUser) {
          this.dataSource = [findedUser];
        }
      },
      complete: () => this.loadingService.setLoading(false),
    });
  }
}
