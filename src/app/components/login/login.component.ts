import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private _AuthService:AuthService, private  _Router:Router , private _FormBuilder:FormBuilder){

  }

  msgError:string='';
  isLoading:boolean=false;

/*
  loginForm:FormGroup= new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
   
  });
  */

  loginForm:FormGroup=this._FormBuilder.group({

    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)]]
  })

  

  handleForm():void{

    if(this.loginForm.valid){
      this.isLoading=true;
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          
          if(response.message=='success'){
            this.isLoading=false;

            localStorage.setItem('eToken',response.token);
            this._AuthService.saveUserData();

             this._Router.navigate(['/home'])
          }
        },
        error:(err)=>{
          this.isLoading=false;

          
          this.msgError =err.error.message;
        }
      })
    }

   

}
}


