import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { BillComponent } from './carservice-mgmt/bill/bill.component';
import { ServiceCenterComponent } from './carservice-mgmt/service-center/service-center.component';
import { PickUpRequestComponent } from './carservice-mgmt/pick-up-request/pick-up-request.component';
import { DashboardComponent } from './carservice-mgmt/dashboard/dashboard.component';
import { MyAccountComponent } from './carservice-mgmt/my-account/my-account.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthAdminGuard } from './guard/auth-admin.guard';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'aboutUs', component: WelcomeComponent },
  { path: 'service', component: WelcomeComponent },
  { path: 'register', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'myAccount', component: MyAccountComponent },
  {
    path: 'bill',
    children: [
      { path: 'billReport', component: BillComponent, canActivate: [AuthAdminGuard] },
      { path: 'generateBill', component: BillComponent , canActivate: [AuthAdminGuard]},
      { path: 'myBill', component: BillComponent , canActivate: [AuthGuard]}
    ],
  },
  {
    path: 'pickUp',
    children: [
      { path: 'pickUpForm', component: PickUpRequestComponent , canActivate: [AuthGuard]},
      { path: 'editOrder', component: PickUpRequestComponent, canActivate: [AuthGuard]},
      { path: 'myOrder', component: PickUpRequestComponent, canActivate: [AuthGuard]},
      { path: 'customerReport', component: PickUpRequestComponent, canActivate: [AuthAdminGuard]}
    ],
  },
  {
    path: 'serviceCenter',
    children: [
      { path: 'centerReport', component: ServiceCenterComponent },
      { path: 'centerList', component: ServiceCenterComponent },
    ]

  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
