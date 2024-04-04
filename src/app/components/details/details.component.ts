import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/service/cart.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoot:ActivatedRoute , private _EcomdataService:EcomdataService , private _CartService:CartService){}  //class has all info about current routing


  productDetails:Product ={} as Product;   //interface that i made

  ngOnInit(): void {
    this._ActivatedRoot.paramMap.subscribe({      //property that has the parameter we want to display
    next:(params)=>{
     
      let idProduct:any= params.get('id')

        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next:(Response)=>{
           this.productDetails=Response.data;
          }
        })
    }

    });
   }

   addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(Response)=>{
        console.log(Response);
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
   
   
   detailsSlider: OwlOptions = {
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

}
