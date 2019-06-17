import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/adminService/admin.service';
import { Admin } from 'src/app/Model/Admin';
import { ServiceCenterService } from 'src/app/shared/services/serviceCenter/service-center.service';
import { ServiceCenter } from 'src/app/Model/ServiceCenter';

@Component({
  selector: 'app-service-center',
  templateUrl: './service-center.component.html',
  styleUrls: ['./service-center.component.less']
})
export class ServiceCenterComponent implements OnInit {

  serviceCenter: ServiceCenter[] = [];
  center: ServiceCenter;
  showCenterReport: boolean;
  showCenterList: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(public router: Router, private adminService: AdminService, private serviceCenterService: ServiceCenterService, public authService: AuthService) { }

  ngOnInit() {
    this.showCenterReport = false;
    this.showCenterList = true;
    if (this.router.url === '/serviceCenter/centerList') {
      this.serviceCenterService.getServiceCenterList().subscribe(
        response => {
          Object.keys(response).forEach(index => {
            this.serviceCenter.push(response[index]);
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  displayServiceCenter(email: string): void {

  //  this.center = this.serviceCenter.filter((center) => {
  //     return email === center.email;
  //   })[0];

    for (const center of this.serviceCenter) {
      // filter
      if (email === center.email) {
        console.log(center);
        this.center = center;
        this.showCenterReport = true;
        this.showCenterList = false;
      }
    }
  }
  showPickUpForm(email: string): void {
    localStorage.setItem('dealerEmail', email);
    this.router.navigate(['/pickUp/pickUpForm']);
  }
  // page(n:number){

  // }
}
