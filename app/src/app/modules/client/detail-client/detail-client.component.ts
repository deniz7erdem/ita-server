import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../models/client.model';
import { LogsClientComponent } from './logs-client/logs-client.component';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss',
})
export class DetailClientComponent {
  @Input() client: Client;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}
  activeTab: string = '';

  setActiveTab(tab: string) {
    if (this.activeTab === tab) {
      this.activeTab = '';
      return;
    }
    this.activeTab = tab;
  }

  openLogsModal() {
    const modalRef = this.modalService.open(LogsClientComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = this.client.id;
  }
}
