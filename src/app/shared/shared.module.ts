import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/AuthService/auth.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/loginService/login.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/adminService/admin.service';
import { ServiceCenterService } from './services/serviceCenter/service-center.service';
import { UserServiceService } from './services/userService/user-service.service';

@NgModule({
  declarations: [HeaderComponent, WelcomeComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports:[HeaderComponent],
  providers: [AuthService, LoginService, AdminService , ServiceCenterService,UserServiceService]
})
export class SharedModule {}
