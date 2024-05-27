import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../_services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss',
})
export class CreateClientComponent {
  clientForm: FormGroup;
  createdClient: any;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private clientService: ClientService
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get name() {
    return this.clientForm.get('name');
  }

  send() {
    if (!this.clientForm.valid) {
      alert('Please fill in the form correctly');
      return;
    }
    this.clientService
      .create(this.clientForm.value)
      .subscribe((res: Client) => {
        this.createdClient = res;
      });
    console.log(this.clientForm.valid);
  }
}
