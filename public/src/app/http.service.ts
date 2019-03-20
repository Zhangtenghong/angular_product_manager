import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { 
  }
  getProducts(){
    return this._http.get('/api/products');
  }
  findProduct(id){
    return this._http.get('/api/products/'+id);
  }
  addProduct(newProduct){
    return this._http.post('/api/products', newProduct);
  }
  editProduct(editedProduct){
    return this._http.put('/api/products/'+ editedProduct._id, editedProduct);
  }
  deleteProduct(id){
    return this._http.delete('/api/products/'+id);
  }
}