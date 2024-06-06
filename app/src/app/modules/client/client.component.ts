import { Component } from '@angular/core';
import { ClientService } from './_services/client.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './create-client/create-client.component';
import { DetailClientComponent } from './detail-client/detail-client.component';
import { Client } from '../../models/client.model';

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
  clients: Client[] = [];
  subscriptions: Subscription[] = [];
  ngOnInit() {
    this.getClients();
    let goc = this.clientService.getOnlineClients().subscribe((res) => {
      this.onlineClients.next(res);
    });

    this.subscriptions.push(goc);

    let gol = this.clientService.getOnlineList().subscribe((res) => {
      this.clients = this.clients.map((client) => {
        if (res.includes(client.id)) {
          client.online = true;
        } else {
          client.online = false;
        }
        return client;
      });
    });

    this.subscriptions.push(gol);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getClients() {
    this.clientService.getAll().subscribe((res) => {
      this.clients = res;
    });
  }

  openCreateClientModal() {
    const modalRef = this.modalService.open(CreateClientComponent);
    modalRef.result.then((res) => {
      this.getClients();
    });
  }

  openDetailClientModal(client: Client) {
    const modalRef = this.modalService.open(DetailClientComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.client = client;
    modalRef.result.then((res) => {
      this.getClients();
    });
  }
}
