import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/service/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService){
  }

  Categories:any[]=[];


 ngOnInit(): void {

  this._EcomdataService.getCategories().subscribe({
    next:(response)=>{
      this.Categories=response.data; 
      console.log(response.data)
    }
    
  })

}

}
