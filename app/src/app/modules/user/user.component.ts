import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudUserComponent } from './crud-user/crud-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}
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

  open(user?: any) {
    const modalRef = this.modalService.open(CrudUserComponent);
    modalRef.componentInstance.user = user ?? null;
  }
}
