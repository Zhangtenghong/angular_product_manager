import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct: any;
  constructor(private _httpService: HttpService, private _router: Router){
    this.newProduct={title:"", price:"", image:""}
  }

 ngOnInit() {
 }

 createProduct(){
    let observable_1=this._httpService.addProduct(this.newProduct);     observable_1.subscribe(data =>{
      console.log("Got data from post back", data);
      // this.newProduct={title:"", price:"", image:""}
      this._router.navigate(['/products']);
    })
  }
}
