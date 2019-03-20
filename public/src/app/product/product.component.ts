import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  allProducts: any;
  constructor(private _httpService : HttpService) {
    this.allProducts = []
  }

  ngOnInit() {
    this.getProductsFromService();
  }

  getProductsFromService(){
    let dataFromService_1=this._httpService.getProducts();
    console.log("Get the data");
    dataFromService_1.subscribe((data) =>{
      this.allProducts=data;
      console.log(this.allProducts)
    })
  }

  deleteProductFromService(id){
    let dataFromService_3=this._httpService.deleteProduct(id);
    console.log("Delete the data",id);
    dataFromService_3.subscribe();
    this.getProductsFromService();
  }
}
