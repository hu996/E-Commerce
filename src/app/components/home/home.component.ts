import { Component, OnInit } from '@angular/core';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private _EcomdataService:EcomdataService, private _CartService:CartService ,
     private _ToastrService:ToastrService, private _WishListService:WishlistService) {}

 addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(Response)=>{
      this._CartService.cartNumber.next(Response.numOfCartItems);    
      this._ToastrService.success(Response.message , 'Fresh Cart')
    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    items:1,
    nav: false
  }





  Products:any[]=[];
  Categories:any[]=[];
  searchTerm:string='';
  wishListData:string[]=[];

  ngOnInit(): void {

    //get all products

    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        this.Products=response.data;
      }
    })

    //get categories

    this._EcomdataService.getCategories().subscribe({
      next:(response)=>{
        this.Categories=response.data; 
      }
    })

    //wishList
  
    this._WishListService.getWishList().subscribe({
      next:(response)=>{
        const newData=response.data.map((item:any)=>item._id);
        this.wishListData=newData;
      }

    })
  }

  

  addWish(productId:string):void{

    this._WishListService.addToWishList(productId).subscribe({
      next:(response)=>{
       
        this._WishListService.wishNumber.next(response.count)
        this._ToastrService.success(response.message)
        this.wishListData=response.data;
      }
    })
  }

  removeWishItem(id:string):void{
    this._WishListService.removeItem(id).subscribe({
      next:(Response)=>{
        this._WishListService.wishNumber.next(Response.count)
        this._ToastrService.success(Response.message);
        this.wishListData=Response.data;
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
  }

   
}
