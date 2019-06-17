import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PickUpRequest } from 'src/app/Model/PickUpRequest';
import { PickUpService } from 'src/app/shared/services/pickupService/pick-up.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PickUpStatus } from 'src/app/enums/pickup-status.enum';

@Component({
  selector: 'app-pick-up-request',
  templateUrl: './pick-up-request.component.html',
  styleUrls: ['./pick-up-request.component.less']
})
export class PickUpRequestComponent implements OnInit {
  @ViewChild('msg') msg: ElementRef;
  @ViewChild('statusRef') statusRef: ElementRef;
  @ViewChild('res') res: ElementRef;
  @ViewChild('idRef') idRef: ElementRef;

  displayId: boolean;
  request: PickUpRequest;
  pickUpList: PickUpRequest[] = [];
  myOrderList: PickUpRequest[] = [];


  pickUpForm = new FormGroup({
    status: new FormControl(''),
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('[1-9]{10}')]),
    address: new FormControl('', [Validators.required]),
    timeSlot: new FormControl('', [Validators.required]),
    dealerEmail: new FormControl('', [Validators.required])
  });


  constructor(public router: Router, private pickUpService: PickUpService) { }

  ngOnInit() {

    if (this.router.url === '/pickUp/pickUpForm') {
      const email = localStorage.getItem('email');
      this.pickUpForm.controls['email'].setValue(email);
    }
    if (this.router.url === '/pickUp/myOrder') {
      const email = localStorage.getItem('email');
      this.pickUpService.getPickUpRequest(email).subscribe(
        response => {
          this.myOrderList = response;
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.router.url === '/pickUp/editOrder') {
      this.displayId = true;
      const id = localStorage.getItem('id');
      this.pickUpService.getPickUpRequestById(id).subscribe(
        response => {
          this.request = response;
          console.log(this.request.status);
          this.setForm();
        },
        error => {
          console.log(error);
        }
      );
    }
    if (this.router.url === '/pickUp/customerReport') {
      debugger
      const email = localStorage.getItem('email');
      this.pickUpService.getRequestByDealerEmail(email).subscribe(
        response => {
          this.pickUpList = response;
          console.log(this.pickUpList);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  editOrder(id: LongRange) {
    localStorage.setItem('id', id.toString());
    this.router.navigate(['/pickUp/editOrder']);
  }
  onUserSubmit({ value, valid }: { value: PickUpRequest, valid: boolean }): void {
    console.log(value);

    // tslint:disable-next-line: forin
    for (const i in this.pickUpForm.controls) {
      this.pickUpForm.controls[i].markAsTouched();
    }
    const id = localStorage.getItem('id');
    if (!id) {
      value.status = 'registered';
      value.dealerEmail = localStorage.getItem('dealerEmail');
      console.log(value);
      this.pickUpService.createPickUpRequest(value).subscribe(
        response => {
          this.msg.nativeElement.innerHTML = 'Request Sent';
          this.pickUpForm.reset();
          localStorage.removeItem('dealerEmail');
          this.router.navigate(['/pickUp/myOrder']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log();
      value.status = 'renewed';
      console.log(value);
      this.pickUpService.updatePickUpRequest(id, value).subscribe(
        response => {
          this.router.navigate(['/pickUp/myOrder']);
          localStorage.removeItem('id');
          localStorage.removeItem('dealerEmail');
        },
        error => { console.log(error); }
      );
    }
  }
  setForm() {
    this.pickUpForm.setValue({
      status: this.request.status,
      timeSlot: this.request.timeSlot,
      id: this.request.id,
      name: this.request.name,
      email: this.request.email,
      mobile: this.request.mobile,
      address: this.request.address,
      dealerEmail: this.request.dealerEmail
    });
  }
  accept(id: string) {
    console.log(id);
    debugger
    this.submitStatus(id, 'accepted');
  }

  reject(id: string) {
    console.log(id);
    debugger
    this.submitStatus(id, 'rejected');
  }


  submitStatus(id: string, status: string) {
    this.pickUpService.updateStatus(id, status).subscribe(
      response => {
        const email = localStorage.getItem('email');
        this.pickUpService.getRequestByDealerEmail(email).subscribe(
          res => {
            this.pickUpList = res;
            this.res.nativeElement.innerHTML = 'Updated';
          },
          error => {
            console.log(error);
          }
        );
      },
      error => { console.log(error); }
    );
  }

  pickUpStatus(status: string) {
    if (status === PickUpStatus.Registered || status === 'renewed') {
      return true;
    }
    return false;
  }
  checkStatus(status: string) {
    if (status === 'accepted' || status === 'finished') {
      return false;
    }
    return true;
  }

}
