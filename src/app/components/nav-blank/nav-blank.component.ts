import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {

  constructor(private _AuthService:AuthService , private _CartService:CartService, private _wishlistService:WishlistService){

  }

   cartCount:number=0;
   wishCount:number=0;

   ngOnInit(): void {

     this._CartService.cartNumber.subscribe({
      next:(data)=>{
      this.cartCount=data;},
         });

         this._CartService.getUserCart().subscribe({
          next:(Response)=>{
            this._CartService.cartNumber.next(Response.numOfCartItems)
          }
         })

         //wishList

        
         this._wishlistService.wishNumber.subscribe({
          next:(data)=>{
            this.wishCount=data;
          }
         });

         this._wishlistService.getWishList().subscribe({
          next:(Response)=>{
            this._wishlistService.wishNumber.next(Response.count)
          }
         })
      
   }

  logOutUser():void{

    this._AuthService.logOutUser();
    
  }
}
