import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/AuthService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  toggleNav(event: any): void {
    debugger
    this.navbarToggler.nativeElement.click();
  }

  ngOnInit() {}
  logout() {
    this.authService.logout();
  }

}
