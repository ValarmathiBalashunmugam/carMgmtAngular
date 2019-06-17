import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill/bill.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { PickUpRequestComponent } from './pick-up-request/pick-up-request.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../shared/services/userService/user-service.service';
import { AdminService } from '../shared/services/adminService/admin.service';
import { PickUpService } from '../shared/services/pickupService/pick-up.service';
import { BillService } from '../shared/services/billService/bill.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BillComponent, ServiceCenterComponent, PickUpRequestComponent, DashboardComponent, MyAccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AdminService, UserServiceService, PickUpService, BillService]
})
export class CarserviceMgmtModule { }
