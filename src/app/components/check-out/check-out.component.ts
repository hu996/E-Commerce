import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute ,private _CartService:CartService){}


  checkOut:FormGroup= this._FormBuilder.group({

    details:[''],
    phone:[''],
    city:['']
  })

  cartId:any='';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartId=params.get('id')
      }
    })
  }

  handleForm():void{

   this._CartService.checkOut(this.cartId, this.checkOut.value).subscribe({
    next:(Response)=>{
      if(Response.status=='success'){
        window.open(Response.session.url, '_self')
      }
    }
   })

  }
}
