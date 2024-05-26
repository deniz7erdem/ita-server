import { Component } from '@angular/core';
import { ClientService } from './_services/client.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  constructor(public clientService: ClientService) {}
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
}
