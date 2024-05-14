import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  sbSidenavToggled: any;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    if (localStorage.getItem('sidebarToggled')) {
      this.sbSidenavToggled = localStorage.getItem('sidebarToggled');
    } else {
      localStorage.setItem('sidebarToggled', 'false');
      this.sbSidenavToggled = localStorage.getItem('sidebarToggled');
    }
    console.log(this.sbSidenavToggled);
  }

  changeSidebarToggled() {
    this.sbSidenavToggled = localStorage.getItem('sidebarToggled');
    if (this.sbSidenavToggled === 'true') {
      localStorage.setItem('sidebarToggled', 'false');
    } else {
      localStorage.setItem('sidebarToggled', 'true');
    }
    this.sbSidenavToggled = localStorage.getItem('sidebarToggled');
  }
}
