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
  searchValue: string | undefined;
  ngOnInit() {
    this.userService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.loading = false;
    });
  }
}
