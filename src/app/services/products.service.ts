import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../interfaces/products.interface";
import {rejects} from "assert";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products: Product[] = [];
  productsFilter: Product[] = [];
  constructor(private http: HttpClient) {
     this.loadProducts();
  }

  private loadProducts(){

    return new Promise( (resolve,reject)=>{
      this.http.get('https://astratemplate.firebaseio.com/productos_idx.json')
        .subscribe((response: Product[]) =>{
          // console.log(response);
          this.products = response;
          this.loading = false;
          resolve()
        });
    } );

  }

  getProduct(id: string){
    return this.http.get(`https://astratemplate.firebaseio.com/productos/${id}.json`);
  }

  searchProduct(word: string){

    if(this.products.length == 0){
      //load products
      this.loadProducts().then( () => {
        //execute after we get the products
        //apply filters
        this.filterProducts(word);
      })
    }else {
      // apply filters
      this.filterProducts(word);

    }
  }
  private filterProducts( word: string){

    this.productsFilter =[];

    word = word.toLocaleLowerCase();

    this.products.forEach( prod =>{
      const tittleLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf( word ) >= 0 || tittleLower.indexOf(word) >=0 ){
        this.productsFilter.push(prod);
      }
    });
  }
}
