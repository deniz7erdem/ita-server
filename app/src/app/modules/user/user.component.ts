import { Component } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(private userService: UserService) {}
  users: any;
  loading: boolean = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.loading = false;
      this.collectionSize = this.users.length;
    });
  }
}
