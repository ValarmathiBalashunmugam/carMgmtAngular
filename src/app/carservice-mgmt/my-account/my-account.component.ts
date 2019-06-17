import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Admin } from 'src/app/Model/Admin';
import { AdminService } from 'src/app/shared/services/adminService/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/shared/services/userService/user-service.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit {
  admin: Admin;
  myAccount: User;

  constructor(public router: Router,
              private adminService: AdminService,
              private userService: UserServiceService,
              public authService: AuthService) { }

  ngOnInit() {
    
    if ((this.router.url === '/myAccount') && (this.authService.isAdmin())) {
      const email = localStorage.getItem('email');
      debugger
      this.adminService.getAdmin(email).subscribe(
        response => { this.admin = response; },
        error => { console.log(error); }
      );
    } else if ((this.router.url === '/myAccount') && (this.authService.isUser())) {
      debugger
      const email = localStorage.getItem('email');
      this.userService.getUserByEmail(email).subscribe(
        response => {
          debugger;
          this.myAccount = response;
          console.log(this.myAccount);
          debugger;
        },
        error => { }
      );
    }
  }
  // editAdmin(id) {
  //   debugger
  //   localStorage.setItem('adminId', id);
  //   this.router.navigate(['/register']);
  // }
  // editUser(id: string) {
  //   debugger
  //   localStorage.setItem('userId', id);
  //   this.router.navigate(['/register']);
  // }

}
