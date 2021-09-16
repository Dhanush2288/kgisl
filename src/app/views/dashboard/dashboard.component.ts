import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faCoffee = faCoffee;
  o: any;
  io: any;
  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  public Paitents: any;
  displayedColumns: string[] = [
    'space',
    'Number',
    'image',
    'Patient',
    'Contact',
    'Appointment',
    'Waited',
    'Vitals',
    'menu',
  ];


  dataSource: any;
  tabid: any;
  isDataLoaded!: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort | undefined;
  @ViewChild('sortCol3') sortCol3: MatSort | undefined;

  Dated = this.fb.group({
    SelectedDate: '',
  });
  selectedDate: any;
  myChart: any = [];
  logindetail = this.backend.Logindetails();
  bookingtype: any;
  queucount: any =0;
  earliercount: any =0;
waitcount:any =0;
noshowcount:any =0 ;
  ngOnInit(): void {
    this.logindetail = this.backend.getUserInfo();
    console.log(this.logindetail[0]._id);

    this.Dated.patchValue({
      SelectedDate: new Date(),
    });
    var y = this.Dated.value.SelectedDate;
    y.setHours(0, 0, 0, 0);
    this.selectedDate = y.toISOString();
    this.bookingtype ='Queu'
    console.log(y, this.selectedDate);
    this.onSelect();
    this.tabid = 'Queu';

  }
  tabChange(a:any) {
    console.log(a);
    this.tabid = a;
    this.bookingtype = a;
    this.onSelect();
  }
   diff(start:any, end:any) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}

  onSelect() {
    var y = this.Dated.value.SelectedDate;
    console.log(this.Dated.value.SelectedDate);
    this.selectedDate = y.toISOString();
    console.log(y, this.selectedDate);
    this.backend
      .doctorappointment(
        this.logindetail[0]._id,
        this.selectedDate,
        this.bookingtype
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.success === false) {
            console.log(result['message']);
          }
          if (result.success === true) {
            console.log(result);
            this.dataSource = new MatTableDataSource(result.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sortCol3;
            this.isDataLoaded = true;
          } else {
            console.log(result.message);
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sortCol3;
            this.isDataLoaded = true;
          }
        },
        (error) => {
          console.log(error);
          alert('internal error occured');
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortCol3;
          this.isDataLoaded = true;
        }
      );
      this.backend
      .doctorappointment(
        this.logindetail[0]._id,
        this.selectedDate,
        'Queu'
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.success === false) {
            console.log(result['message']);
          }
          if (result.success === true) {
            console.log(result);
            this.queucount = result.data.length

          }
        },
        (error) => {
          console.log(error);
          alert('internal error occured');
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortCol3;
          this.isDataLoaded = true;
        }
      );
      this.backend
      .doctorappointment(
        this.logindetail[0]._id,
        this.selectedDate,
        'Earlier'
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.success === false) {
            console.log(result['message']);
          }
          if (result.success === true) {
            console.log(result);
            this.earliercount =result.data.length

          }
        },
        (error) => {
          console.log(error);
          alert('internal error occured');
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortCol3;
          this.isDataLoaded = true;
        }
      );
      this.backend
      .doctorappointment(
        this.logindetail[0]._id,
        this.selectedDate,
         'Wait'
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.success === false) {
            console.log(result['message']);
          }
          if (result.success === true) {
            console.log(result);
            this.waitcount =result.data.length

          }
        },
        (error) => {
          console.log(error);
          alert('internal error occured');
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortCol3;
          this.isDataLoaded = true;
        }
      );
      this.backend
      .doctorappointment(
        this.logindetail[0]._id,
        this.selectedDate,
        "Noshow"
      )
      .subscribe(
        (result) => {
          console.log(result);

          if (result.success === false) {
            console.log(result['message']);
          }
          if (result.success === true) {
            console.log(result);
            this.noshowcount =result.data.length

          }
        },
        (error) => {
          console.log(error);
          alert('internal error occured');
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sortCol3;
          this.isDataLoaded = true;
        }
      );

  }
  but(){
    console.log("logout");
    localStorage.removeItem("UserInfo")
    this.router.navigate(['login']);
  }
}
