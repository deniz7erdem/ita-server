import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LogService } from '../../_services/log.service';

@Component({
  selector: 'app-logs-client',
  templateUrl: './logs-client.component.html',
  styleUrl: './logs-client.component.scss',
})
export class LogsClientComponent {
  @Input() id: number;
  constructor(
    public activeModal: NgbActiveModal,
    private logService: LogService
  ) {}
  logs: any[] = [];
  ngOnInit() {
    this.logService.findOneByClientId(this.id).subscribe((data) => {
      this.logs = data;
    });
  }
}
