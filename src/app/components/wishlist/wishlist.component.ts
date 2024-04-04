import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/service/cart.service';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _wishListService:WishlistService , private _ToastrService:ToastrService ,
   private _CartService:CartService){}

 products:Product[]=[];
 wishListData:any[]=[];

  ngOnInit(): void {
  this._wishListService.getWishList().subscribe({
    next:(Response)=>{
      this.products=Response.data;
      const newData=Response.data.map((item:any)=>item._id);
      this.wishListData=newData;
      this._wishListService.wishNumber.next(Response.count);
    }
  })  
  }


  addWish(productId:string):void{

    this._wishListService.addToWishList(productId).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this.wishListData=response.data;

        this._wishListService.getWishList().subscribe({
          next:(Response)=>{
            this.products=Response.data;
            this._wishListService.wishNumber.next(Response.count);

          }
        })
      },
    })
  }

  removeWishItem(id:string):void{
    this._wishListService.removeItem(id).subscribe({
      next:(Response)=>{
        console.log(Response);
        this._ToastrService.success(Response.message);
        this.wishListData=Response.data;

        //make it remove the items in the ui instantly without need to reload
        this._wishListService.getWishList().subscribe({
          next:(Response)=>{
            this.products=Response.data;
            this._wishListService.wishNumber.next(Response.count);

          }
        })
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
  }


  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems);
      
        this._ToastrService.success(response.message , 'Fresh Cart')
        this.removeWishItem(id);
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
   } 

  

  
}
