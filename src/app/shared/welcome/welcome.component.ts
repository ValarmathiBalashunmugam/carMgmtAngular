import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/Model/Login';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';
import { LoginService } from '../services/loginService/login.service';
import { User } from 'src/app/Model/User';
import { UserServiceService } from '../services/userService/user-service.service';
import { Admin } from 'src/app/Model/Admin';
import { ServiceCenterService } from '../services/serviceCenter/service-center.service';
import { AdminService } from '../services/adminService/admin.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  displayUser: boolean;
  displayAdmin: boolean;
  passwordValid: boolean;
  showId: boolean;
  showRepass: boolean;
  showPass: boolean;

  @ViewChild('rePassword') rePassword: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('passwordMatch') passwordMatch: ElementRef;
  @ViewChild('errorDiv') errorDiv: ElementRef;
  @ViewChild('error') error: ElementRef;

  user: User;
  admin: Admin;
  newLogin: Login;

  // UserForm Group
  userForm = new FormGroup({
    id: new FormControl(''),
    customerName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]{10}')
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pincode: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl('')
  });

  // AdminForm Group
  adminForm = new FormGroup({
    id: new FormControl(''),
    dealerName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$')
    ]),
    serviceCenterName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]*$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[1-9]{10}')
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pincode: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    address: new FormControl('', [Validators.required])
  });

  // Login FormGroup
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(
    public router: Router,
    private loginService: LoginService,
    private authSerive: AuthService,
    private userService: UserServiceService,
    private serviceCenterService: ServiceCenterService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.displayUser = true;
    this.showId = false;
    this.showRepass = true;
    this.showPass = true;

    // if (localStorage.getItem('userId')) {
    //   const id = localStorage.getItem('userId');
    //   debugger
    //   this.displayUser = true;
    //   this.displayAdmin = false;
    //   this.showId = true;
    //   this.showRepass = false;
    //   this.showPass = false;
    //   this.userService.getUser(id).subscribe(
    //     response => {
    //       this.user = response;
    //       this.setUserDetailsInForm();
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // } else if (localStorage.getItem('adminId')) {
    //   debugger
    //   const id = localStorage.getItem('adminId');
    //   this.displayUser = false;
    //   this.displayAdmin = true;
    //   this.showId = true;
    //   this.showRepass = false;
    //   this.showPass = false;
    //   this.adminService.getAdminById(id).subscribe(
    //     response => {
    //       this.admin = response;
    //       this.setAdminDetailsInForm();
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    // }

  }

  onSubmit({ value, valid }: { value: Login, valid: boolean }): void {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }
    console.log(valid);
    if (valid) {
      console.log('onSubmit');
      const login = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        role: this.form.controls.role.value
      };
      this.loginService.getLogin(login).subscribe(
        response => {
          console.log(response);
          const length = response.length;
          console.log(length);

          //  Having no account
          if (length === 0) {
            console.log('UserName or Password Incorrect');
            this.error.nativeElement.innerHTML = 'UserName or Password Incorrect';
          }

          // Having one account
          if (length === 1) {
            this.newLogin = response[0];
            console.log(this.newLogin);
            if (this.newLogin.role === login.role) {
              this.authSerive.sendToken(login.role, login.email);
              this.router.navigate(['/dashboard']);
            } else {
              this.error.nativeElement.innerHTML = 'Access Denied for the role';
            }
          }
          // Having two account
          if (length === 2) {
            const login1 = response[0];
            const login2 = response[1];
            if (login1.role === login.role) {
              this.authSerive.sendToken(login.email, login.role);
              this.router.navigate(['/dashboard']);
            } else if (login2.role === login.role) {
              this.authSerive.sendToken(login.email, login.role);
              this.router.navigate(['/dashboard']);
            } else {
              this.error.nativeElement.innerHTML = 'Access Denied for the role';
            }
          }
        },
        error => {
          console.log(error);
        });
    }
  }


  // OnSubmit Of User Form
  onUserSubmit({ value, valid }: { value: User; valid: boolean }): void {
    // tslint:disable-next-line: forin
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsTouched();
    }

    // if (localStorage.getItem('userId')) {
    //   const user = {
    //     id: this.userForm.controls.id.value,
    //     customerName: this.userForm.controls.customerName.value,
    //     password: this.userForm.controls.password.value,
    //     rePassword: this.userForm.controls.rePassword.value,
    //     mobile: this.userForm.controls.mobile.value,
    //     email: this.userForm.controls.email.value,
    //     pincode: this.userForm.controls.pincode.value,
    //     city: this.userForm.controls.city.value,
    //     state: this.userForm.controls.state.value,
    //     address: this.userForm.controls.address.value
    //   };
    //   this.userService
    //     .updateUser(localStorage.getItem('userId'), user)
    //     .subscribe(
    //       response => {
    //         console.log(response);
    //         localStorage.removeItem('userId');
    //         this.router.navigate(['/user/myAccount']);
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    // } else {
    if (valid && this.passwordValid) {
      const login = {
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        role: 'User'
      };
      const user = {
        id: this.userForm.controls.id.value,
        customerName: this.userForm.controls.customerName.value,
        password: this.userForm.controls.password.value,
        rePassword: this.userForm.controls.rePassword.value,
        mobile: this.userForm.controls.mobile.value,
        email: this.userForm.controls.email.value,
        pincode: this.userForm.controls.pincode.value,
        city: this.userForm.controls.city.value,
        state: this.userForm.controls.state.value,
        address: this.userForm.controls.address.value
      };

      this.userService.createUser(user).subscribe(
        response => {
          console.log(response);
          // debugger
          this.loginService.createLogin(login).subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/login']);
              this.userForm.reset();
            },
            e => {
              console.log(e);
            }
          );
        },
        errors => {
          console.log(errors);
          if (errors.error === 'Email Id Already Exist') {
            console.log(errors.error);
            this.errorDiv.nativeElement.innerHTML = 'Email Id Already Exist';
          }
        }
      );
    }
  }

  // OnSubmit Of Admin Form
  onAdminSubmit({ value, valid }: { value: Admin; valid: boolean }): void {

    debugger
    // tslint:disable-next-line: forin
    for (const i in this.adminForm.controls) {
      this.adminForm.controls[i].markAsTouched();
    }
    if (valid && this.passwordValid) {
      const login = {
        email: this.adminForm.controls.email.value,
        password: this.adminForm.controls.password.value,
        role: 'Admin'
      };
      const admin = {
        id: this.adminForm.controls.id.value,
        dealerName: this.adminForm.controls.dealerName.value,
        serviceCenterName: this.adminForm.controls.serviceCenterName.value,
        password: this.adminForm.controls.password.value,
        mobile: this.adminForm.controls.mobile.value,
        email: this.adminForm.controls.email.value,
        pincode: this.adminForm.controls.pincode.value,
        city: this.adminForm.controls.city.value,
        state: this.adminForm.controls.state.value,
        address: this.adminForm.controls.address.value
      };
      const serviceCenter = {
        id: this.adminForm.controls.id.value,
        dealerName: this.adminForm.controls.dealerName.value,
        serviceCenterName: this.adminForm.controls.serviceCenterName.value,
        mobile: this.adminForm.controls.mobile.value,
        email: this.adminForm.controls.email.value,
        pincode: this.adminForm.controls.pincode.value,
        city: this.adminForm.controls.city.value,
        state: this.adminForm.controls.state.value,
        address: this.adminForm.controls.address.value
      };
      // if (localStorage.getItem('adminId')) {
      //   const newAdmin = {
      //     id: this.adminForm.controls.id.value,
      //     dealerName: this.adminForm.controls.dealerName.value,
      //     serviceCenterName: this.adminForm.controls.serviceCenterName.value,
      //     password: this.adminForm.controls.password.value,
      //     mobile: this.adminForm.controls.mobile.value,
      //     email: this.adminForm.controls.email.value,
      //     pincode: this.adminForm.controls.pincode.value,
      //     city: this.adminForm.controls.city.value,
      //     state: this.adminForm.controls.state.value,
      //     address: this.adminForm.controls.address.value
      //   };
      //   this.adminService
      //     .updateAdmin(localStorage.getItem('adminId'), newAdmin)
      //     .subscribe(
      //       response => {
      //         console.log(response);
      //         localStorage.removeItem('adminId');
      //         this.router.navigate(['/myAccount']);
      //       },
      //       error => {
      //         console.log(error);
      //       }
      //     );
      // } else {
      this.adminService.createAdmin(admin).subscribe(
        response => {
          console.log(response);
          // debugger
          this.loginService.createLogin(login).subscribe(
            res => {
              console.log(res);
              this.serviceCenterService
                .createServiceCenter(serviceCenter)
                .subscribe(
                  res2 => {
                    console.log(res2);
                    this.router.navigate(['/login']);
                    this.adminForm.reset();
                  },
                  error => {
                    debugger;
                    console.log(error);
                  }
                );
            },
            e => {
              console.log(e);
            }
          );
        },
        error => {
          console.log(error);
          if (error.error === 'Email Id Already Exist') {
            console.log(error.error);
            debugger;
            this.errorDiv.nativeElement.innerHTML = 'Email Id Already Exist';
          }
        }
      );
    }

  }

  // For User Register Form
  userRegister(): void {
    this.displayAdmin = false;
    this.displayUser = true;
  }

  // For Admin Register Form
  adminRegister(): void {
    this.displayAdmin = true;
    this.displayUser = false;
  }

  // Validate Password
  validatePassword(): void {
    if (
      this.rePassword.nativeElement.value !== this.password.nativeElement.value
    ) {
      this.passwordMatch.nativeElement.innerHTML = 'Password MisMatch';
      this.passwordValid = false;
    } else {
      this.passwordMatch.nativeElement.innerHTML = '';
      this.passwordValid = true;
    }
  }
  // setUserDetailsInForm() {
  //   this.userForm.setValue({
  //     id: this.user.id,
  //     customerName: this.user.customerName,
  //     password: this.user.password,
  //     rePassword: this.admin.password,
  //     mobile: this.user.mobile,
  //     email: this.user.email,
  //     pincode: this.user.pincode,
  //     city: this.user.city,
  //     state: this.user.state,
  //     address: this.user.address
  //   });
  // }
  // setAdminDetailsInForm() {
  //   this.adminForm.setValue({
  //     id: this.admin.id,
  //     password: this.admin.password,
  //     rePassword: this.admin.password,
  //     dealerName: this.admin.dealerName,
  //     serviceCenterName: this.admin.serviceCenterName,
  //     mobile: this.admin.mobile,
  //     email: this.admin.email,
  //     pincode: this.admin.pincode,
  //     city: this.admin.city,
  //     state: this.admin.state,
  //     address: this.admin.address
  //   });
  // }
}
