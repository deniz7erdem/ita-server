import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  @Output() onHide = new EventEmitter<boolean>();

  sidebarToggle() {
    this.onHide.emit(true);
  }
}
