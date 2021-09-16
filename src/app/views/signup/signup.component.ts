import { Component, OnInit } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { BackendService} from 'src/app/services/backend.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  selectedFile!: File;
  selectedFiles?: FileList;
  fileimage: any;
  randomNumber!: number|string | Blob;
  constructor(private fb: FormBuilder , private service :BackendService , private router: Router,) { }
  signupform = this.fb.group({
    Name:["", [Validators.required]],
    phonenumber:["", [Validators.required]],
    Emailaddress: [""],
    ClinicName:["", [Validators.required]]
  })

  ngOnInit(): void {

  }

  signUp(){
    this.service.adduser(this.signupform.value).subscribe( result => {
      console.log(result)
    if(result.success===false){
      alert(result['message'])
    }
      if(result.success){
        alert("Account sucessfuly created")
        this.router.navigate(['login']);
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
