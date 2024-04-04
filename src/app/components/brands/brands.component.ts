import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService){
  }

  Brands:any[]=[];


 ngOnInit(): void {

  this._EcomdataService.getBrands().subscribe({
    next:(response)=>{
      this.Brands=response.data; 
      console.log(response.data)
    }
    
  })

}
}
