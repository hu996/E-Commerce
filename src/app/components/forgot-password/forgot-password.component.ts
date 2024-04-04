import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/shared/service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private _forgotPasswordService:ForgotPasswordService , private _ReactiveFormsModule:ReactiveFormsModule , private _Router:Router){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string='';
  userMsg:string='';


  forgotForm:FormGroup= new FormGroup({
    email:new FormControl(null, [Validators.required, Validators.email])
  })


  
  resetCodeForm:FormGroup= new FormGroup({
    resetCode:new FormControl('')
  })

  resetPassword:FormGroup= new FormGroup({
    newPassword:new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)])
  })

  forgotPassword():void{
    let userEmail=this.forgotForm.value;
    this.email=userEmail.email
   this._forgotPasswordService.forgotPassword(userEmail).subscribe({
    next:(Response)=>{
    
      this.userMsg=Response.message;
      this.step1=false;
      this.step2=true;
    }, 
    error:(err)=>{
      this.userMsg=err.error.message;
    }
    
   });

  }

  resetCode():void{
    let resetCode=this.resetCodeForm.value;
    this._forgotPasswordService.resetCode(resetCode).subscribe({
      next:(Response)=>{
        this.userMsg=Response.status;
      this.step2=false;
      this.step3=true;
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }
    })
    
  }

  newPassword():void{
    let resetForm=this.resetPassword.value;
    resetForm.email=this.email;
    this._forgotPasswordService.resetPassword(resetForm).subscribe({
      next:(Response)=>{
        if(Response.token){
          localStorage.setItem('_token', Response.token)
          this._Router.navigate(['/home'])
        }
    
      },
      error:(err)=>{
        this.userMsg=err.error.message;
      }
     
    })
}
}
