import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { UserRoutingModule } from './user-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [UserComponent, CrudUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
  ],
})
export class UserModule {}
