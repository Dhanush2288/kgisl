import { Component, OnInit,TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {
  selectedDate:any
  today:any;
  datafoun:any;
  datafoun1:any;
  logindetail:any;
  now:any;
  eveningarr:any;
  modalRef?: BsModalRef;

  constructor(private _backendservice: BackendService,private modalService: BsModalService,    private fb: FormBuilder
    ) { }

  addEventForm = this.fb.group({
    StartTime: ['', [Validators.required]],
    EndTime: ['', [Validators.required]],
    date:'',
    DoctorsID: '',
  });
  ngOnInit(): void {
    this.logindetail = this._backendservice.getUserInfo();
    console.log(this.logindetail[0]._id);

    var y = new Date();
    console.log(y.getDate());
    this.selectedDate = y.toISOString();
    console.log(this.logindetail[0]._id);

    console.log(this.selectedDate, 'this is got too');
    this.reload()

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  convertTime12to24(time12h: any) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }
  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event.toISOString();
    console.log(this.selectedDate, 'this is event too');
    var momentDate = moment(new Date(this.selectedDate));
    this.now = momentDate.toDate();
    ;
    this._backendservice.slotgo(this.logindetail[0]._id, this.selectedDate,"Morning").subscribe(
      (result) => {
        if (result.success === false) {
          console.log(result['message']);
          this.datafoun = 'No Data found';
          this.today = [];
        }
        if (result.success === true) {
          console.log(result.data);
          this.today = result.data;
          console.log(this.today);
          this.datafoun = '';
        } else {
          console.log(result.message);
        }
      },
      (error) => {
        console.log(error);
        alert('internal error occured');
      }
    );
    this._backendservice.slotgo(this.logindetail[0]._id, this.selectedDate,"Evening").subscribe(
      (result) => {
        if (result.success === false) {
          console.log(result['message']);
          this.datafoun1 = 'No Data found';
          this.eveningarr = [];
        }
        if (result.success === true) {
          console.log(result.data);
          this.eveningarr = result.data;
          console.log(this.today);
          this.datafoun1 = '';
        } else {
          console.log(result.message);
        }
      },
      (error) => {
        console.log(error);
        alert('internal error occured');
      }
    );
  }
  showForm() {

    ($('#exampleModalLong')as any).modal('show');
  }
  hideForm() {
    ($('#exampleModalLong')as any).modal('hide');
    console.log(1);
  }
  onSubmit() {
    this.addEventForm.value.date=this.selectedDate;
    this.addEventForm.value.DoctorsID=this.logindetail[0]._id
    this.addEventForm.value.StartTime = this.convertTime12to24(
      this.addEventForm.value.StartTime
    );
    this.addEventForm.value.EndTime = this.convertTime12to24(
      this.addEventForm.value.EndTime
    );
    this._backendservice
    .teleslot(this.addEventForm.value)
    .subscribe((result: { success: boolean; data: any }) => {
      if (result.success == false) {
        console.log(result);
      } else {
        console.log(this.addEventForm.value);
        this.addEventForm.reset();
        this.modalRef?.hide();
        setTimeout(()=>{
          this.reload()
        }, 3000);

        }
    });
  }
  reload(){
    this._backendservice.slotgo(this.logindetail[0]._id, this.selectedDate,"Morning").subscribe(
      (result) => {
        if (result.success === false) {
          console.log(result['message']);
          this.datafoun = 'No Data found';
          this.today = [];
        }
        if (result.success === true) {
          console.log(result.data);
          this.today = result.data;
          console.log(this.today);
          this.datafoun = '';
        } else {
          console.log(result.message);
        }
      },
      (error) => {
        console.log(error);
        alert('internal error occured');
      }
    );

    this._backendservice.slotgo(this.logindetail[0]._id, this.selectedDate,"Evening").subscribe(
      (result) => {
        if (result.success === false) {
          console.log(result['message']);
          this.datafoun1 = 'No Data found';
          this.eveningarr = [];
        }
        if (result.success === true) {
          console.log(result.data);
          this.eveningarr = result.data;
          console.log(this.today);
          this.datafoun1 = '';
        } else {
          console.log(result.message);
        }
      },
      (error) => {
        console.log(error);
        alert('internal error occured');
      }
    );
  }
  deleteslot(){

  }
}
