import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logs-client',
  templateUrl: './logs-client.component.html',
  styleUrl: './logs-client.component.scss',
})
export class LogsClientComponent {
  @Input() id: number;
  constructor(public activeModal: NgbActiveModal) {}
  logs: string[] = [
    '[2021-01-01 12:00:00] Client connected',
    '[2021-01-01 12:00:01] Client disconnected',
    '[2021-01-01 12:00:02] Client connected',
    '[2021-01-01 12:00:03] Client disconnected',
  ];
}
