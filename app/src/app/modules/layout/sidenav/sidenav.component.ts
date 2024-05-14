import { Component } from '@angular/core';
import { SidebarItems } from '../../../config/sidebar.config';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor() {}

  sidebarMenu = SidebarItems;

  ngOnInit() {
    console.log(this.sidebarMenu);
  }
}
