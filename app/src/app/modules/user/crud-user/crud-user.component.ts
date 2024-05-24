import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.scss',
})
export class CrudUserComponent {
  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService
  ) {}
  userForm: FormGroup = new FormGroup({});

  @Input() user: any;

  ngOnInit() {
    console.log(this.user);
    this.userForm = this.fb.group({
      name: [
        this.user?.name || '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        this.user?.email || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [''],
    });
  }
  save() {
    console.log(this.userForm.value);
    if (this.user) {
      this.userService.update(this.userForm.value).subscribe((data) => {
        console.log(data);
        this.activeModal.close('updated');
      });
    } else {
      this.userService.create(this.userForm.value).subscribe((data) => {
        console.log(data);
        this.activeModal.close('created');
      });
    }
  }
  close() {}
}
