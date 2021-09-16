import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import {FormBuilder } from '@angular/forms';
import { BackendService} from 'src/app/services/backend.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  b:any;
  loginform = this.fb.group({
    PhoneNumber: ""

  })
  otpform = this.fb.group({
    code:""
  })

  constructor( private fb: FormBuilder, private service :BackendService,  private router: Router) { }
  ngOnInit(): void {
  }
  login(){
    console.log( this.loginform);
    console.log(this.loginform.value);
    this.service.doctorPhoneNumber(this.loginform.value).subscribe(
      result =>{
        if(result.success===false){
          alert(result['message'])
        }
          if(result.success === true){
            console.log(result.data);
              console.log(1);
              $(".phone").addClass("phonenumber1")
              $(".otp").removeClass("phonenumber1")
          }
          else{
            alert(result.message);
          }
        },
        error=>{
          console.log(error);
          alert('internal error occured')
        })
  }
  verify(){
    this.service.doctorsverfiy(this.loginform.value,this.otpform.value).subscribe(
      result =>{
        if(result.success===false){
          alert(result['message'])
        }
          else if(result.success === true){
            if(result.data.length ==0){
              alert("No User Found Please Sign In")
              this.router.navigate(['signup'])
            }
            else{
            localStorage.setItem('UserInfo',JSON.stringify(result.data));
            console.log(result.data+"2");
            console.log(localStorage.getItem("Userinfo"));
            this.router.navigate(['dashboard']);
            }
          }
          else{
            alert(result.message);
          }
        },
        error=>{
          console.log(error);
          alert('internal error occured')
        })
  }
}
