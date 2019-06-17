import { AppConstants } from './../app-constants';
import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/Model/Bill';
import { Router } from '@angular/router';
import { BillService } from 'src/app/shared/services/billService/bill.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PickUpService } from 'src/app/shared/services/pickupService/pick-up.service';
import { PickUpRequest } from 'src/app/Model/PickUpRequest';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.less']
})
export class BillComponent implements OnInit {
  billList: Bill[] = [];
  emailUser: string;
  tempPickUpREport: PickUpRequest[] = [];
  tempBillReport: PickUpRequest[] = [];
  billOptions: PickUpRequest[] = [];
  myBill: Bill[] = [];

  generateBill: FormGroup;

  constructor(
    public router: Router,
    public billService: BillService,
    private pickUpService: PickUpService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.generateBillForm();
    if (this.router.url === AppConstants.BillReport) {
      const email = localStorage.getItem('email');
      this.billService.getBillByDealerEmail(email).subscribe(
        response => {
          console.log(response);
          if (response) {
            this.billList = response;
          }

        },
        error => { }
      );
    }

    if (this.router.url === '/bill/generateBill') {
      const email = localStorage.getItem('email');
      this.pickUpService.getRequestByDealerEmail(email).subscribe(
        response => {
          this.billOptions = response;
          console.log(response);
          debugger

          // this.tempPickUpREport = response;
          // console.log(this.tempPickUpREport);
          // this.billService.getBillByDealerEmail(email).subscribe(
          //   res=>{
          //     debugger
          //     this.tempBillReport=res;
          //     console.log(this.tempBillReport);
          //     this.checkTheUniquesValue();
          //   },error=>{}
          // );
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.router.url === '/bill/myBill') {
      const email = this.authService.getEmail();
      this.billService.getBillByUserEmail(email).subscribe(
        response => {
          this.myBill = response;
          debugger
          console.log(response);
        },
        error => { console.log(error); }
      );
    }
  }

  generateBillForm() {
    this.generateBill = new FormGroup({
      id: new FormControl(),
      dealerEmail: new FormControl('', [Validators.required]),
      pickUpId: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      billAmount: new FormControl('', [Validators.required]),
      billDescription: new FormControl('', [Validators.required])
    });
  }
  checkTheUniquesValue() {
    debugger
    this.billOptions = this.tempPickUpREport.filter((obj) => { return this.tempBillReport.indexOf(obj) == -1; });
    console.log(this.billOptions);
  }


  onAddBillSubmit(): void {
    // tslint:disable-next-line: forin
    for (const i in this.generateBill.controls) {
      this.generateBill.controls[i].markAsTouched();
    }
    console.log(this.generateBill.value);

    for (const pickUpRequest of this.billOptions) {
      debugger
      if (pickUpRequest.id === this.generateBill.controls.pickUpId.value) {
        debugger
        this.emailUser = pickUpRequest.email;
        console.log(pickUpRequest.email);
        console.log(this.emailUser);
      }
    }
    const bill = {
      id: this.generateBill.controls.id.value,
      dealerEmail: localStorage.getItem('email'),
      pickUpId: this.generateBill.controls.pickUpId.value,
      emailUser: this.emailUser,
      date: this.generateBill.controls.date.value,
      billAmount: this.generateBill.controls.billAmount.value,
      billDescription: this.generateBill.controls.billDescription.value
    };
    console.log(bill);

    this.billService.createBill(bill).subscribe(
      response => {
        console.log(response);
        // alert('bill Generated');
        this.router.navigate(['/bill/billReport']);
      },
      error => { console.log(error); }
    );

  }

}
