import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientRoutingModule } from './client-routing.module';
import { CreateClientComponent } from './create-client/create-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { LogsClientComponent } from './detail-client/logs-client/logs-client.component';

@NgModule({
  declarations: [ClientComponent, CreateClientComponent, DetailClientComponent, LogsClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    NgbPaginationModule,
  ],
})
export class ClientModule {}
