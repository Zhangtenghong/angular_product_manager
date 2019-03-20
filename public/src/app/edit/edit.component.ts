import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct:any;
  productId:any;
  editedProduct: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
    ) {
    this.editProduct = {title:"", price:"", image:""}
  }

  ngOnInit() {
    this._route.params.subscribe((params:Params) =>{
      this.productId = params['id'];
      this.getProduct(this.productId);
    })
  }

  getProduct(id) {
    let dataFromService_1=this._httpService.findProduct(id);
    console.log("Get the data");
    dataFromService_1.subscribe((data) =>{
      this.editProduct=data;
      console.log(this.editProduct)
    })
  }

  updateProduct(){
    console.log("TESTING")
    let observable2=this._httpService.editProduct(this.editProduct);
    observable2.subscribe((data)=>{
      this.editedProduct={title:"", price:"", image:""}
      this._router.navigate(['/products']);
    })
    return false;
  }
  
  deleteProductFromService(id){
    let dataFromService_3=this._httpService.deleteProduct(id);
    console.log("Delete the data",id);
    dataFromService_3.subscribe();
    this._router.navigate(['/products']);
  }
}
