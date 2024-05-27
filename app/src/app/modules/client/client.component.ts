import { Component } from '@angular/core';
import { ClientService } from './_services/client.service';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './create-client/create-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  constructor(
    public clientService: ClientService,
    private modalService: NgbModal
  ) {}
  onlineClients: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  clients: any;
  ngOnInit() {
    this.clientService.getAll().subscribe((res) => {
      this.clients = res;
    });
    this.clientService.getOnlineClients().subscribe((res) => {
      this.onlineClients.next(res);
    });
  }

  openCreateClientModal() {
    const modalRef = this.modalService.open(CreateClientComponent);
    modalRef.result.then((res) => {
      this.clientService.getAll().subscribe((res) => {
        this.clients = res;
      });
    });
  }
}
