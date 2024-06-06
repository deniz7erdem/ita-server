import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../../../models/client.model';
import { LogsClientComponent } from './logs-client/logs-client.component';
import { ClientService } from '../_services/client.service';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss',
})
export class DetailClientComponent {
  @Input() client: Client;
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private clientService: ClientService
  ) {}

  sendDefinedJob(jobName: string) {
    const jobNameTR =
      jobName === 'reboot'
        ? 'Yeniden Başlatma'
        : jobName === 'poweroff'
        ? 'Kapatma'
        : 'İşlem';
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.title = jobNameTR;
    modalRef.componentInstance.message = `"${this.client.name}" isimli cihazda ${jobNameTR} işlemini gerçekleştirmek istediğinize emin misiniz?`;
    modalRef.result.then((res) => {
      if (res) {
        this.clientService.sendDefinedJob(jobName, this.client.id).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  openLogsModal() {
    const modalRef = this.modalService.open(LogsClientComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.id = this.client.id;
  }
}
