import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { query } from '@angular/animations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseurl ="http://localhost:9999"

  logindetails:any =[ {
    Name : "Dhanush",
    DoctorsID: "123456"
  }

  ]
  constructor(private http: HttpClient) { }
  Logindetails(){
    return  this.logindetails
  }
  getUserInfo(){
    if (!localStorage.getItem('UserInfo'))
      return false;
    else
      return JSON.parse(localStorage.getItem('UserInfo')|| '{}')
  }
  adduser(Userform:any) {
    return this.http.post<any>(this.baseurl + '/i/doctorsignup', Userform)
  }

  doctorPhoneNumber(user:any) {
    return this.http.get<any>(this.baseurl + '/doctorlogin?phonenumber='+user.PhoneNumber+"&channel=sms")
  }

  doctorsverfiy(phone:any,code:any){
    return this.http.post<any>(this.baseurl + '/doctorverify?phonenumber='+phone.PhoneNumber+"&code="+code.code,phone)
  }
  doctorappointment(name:any,Date:any,bookingtype:any){
    return  this.http.get<any>(this.baseurl+"/r/typeofappointment?DoctorID="+name+"&Date="+Date+"&bookingtype="+bookingtype)
   }
  // doctorappointment(){
  //   return this.http.get<any>(this.baseurl+"/r/typeofappointment")
  // }
  slotgo(name:any,Date:any,Daytime:any){
    return  this.http.get<any>(this.baseurl+"/r/appointment?DoctorID="+name+"&Date="+Date+"&Daytime="+Daytime)
   }
   teleslot(slot:any){
    return this.http.post<any>(this.baseurl + "/slotcreation",slot)
   }
}
