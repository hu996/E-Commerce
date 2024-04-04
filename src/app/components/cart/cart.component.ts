import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService:CartService){
  }

  cartDetails:any={};

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(Response)=>{
        console.log(Response.data);
        this.cartDetails=Response.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
   
  }

  
  removeCartItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next:(Response)=>{
        this._CartService.cartNumber.next(Response.numOfCartItems);
        this.cartDetails=Response.data;
        
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
  }

changeCount(id:string, count:number):void{

  if(count>0){
    this._CartService.updateCartProduct(id,count).subscribe({
      next:(response)=>{
      this.cartDetails=response.data;
    
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
  }
  
}

clearCart():void{
  this._CartService.clearCart().subscribe({
    next:(Response)=>{
      this.cartDetails=Response.data;
      
    },
    error:(err)=>{
      console.log(err)
      
    }
  })
}
  
}
