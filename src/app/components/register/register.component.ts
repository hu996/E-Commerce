import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor( private _AuthService:AuthService, private  _Router:Router){

  }

  msgError:string='';
  isLoading:boolean=false;

  registerForm:FormGroup= new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, {validators:[this.confirmRepassword]} as FormControlOptions);


  // matching password and repassword

 confirmRepassword(group:FormGroup):void{

  let password=group.get('password');
  let rePassword=group.get('rePassword');

  if(rePassword?.value==null){
    rePassword?.setErrors({required:true})
  }else if( password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch:true})
 }
 }
  
 
  handleForm():void{

    if(this.registerForm.valid){
      this.isLoading=true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          
          if(response.message=='success'){
            this.isLoading=false;

             this._Router.navigate(['/login'])
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
