import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [UserComponent, CrudUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    NgbPaginationModule
  ],
})
export class UserModule {}
