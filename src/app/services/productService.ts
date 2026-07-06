import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../core/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

private url = "http://localhost:8082/luostage/prodapi/product"

private httpClient = inject(HttpClient);

insertProduct (product : Product) {
  return this.httpClient.post<Product>(this.url,product) // glielo do di generics Product perchè sennò darebbe un Observable Object
}

getById (id : number) {
  const urlId = `${this.url}/${id}`; // utilizzo di backtick per fare più in fretta per la concatenazione di stringhe per farlo alt + 96 sul tastierin num
  // è l'equivalente di scrivere const urlId = "http://localhost:8082/luostage/prodapi/product/" + id;
  return this.httpClient.get<Product>(urlId)
}

getAllProds() {
return this.httpClient.get<Product[]>(this.url) // restituisce l'array di prod
}

getAllProdsGTEProds(quantita : number){
  const urlGTE = `${this.url}/${quantita}` // url con backtick per la quantità 
  return this.httpClient.get<Product[]>(urlGTE); // ritorno la lista di product con l'url
}

updateProduct (product : Product, id : number){
  const urlUpdate = `${this.url}/${id}`; // aggiorna all 'id
  return this.httpClient.put<Product>(urlUpdate,product); // effettivamente aggiorna all'url e l'oggetto
}

deleteById (id : number) {
  const urlId = `${this.url}/${id}`;
  return this.httpClient.delete<void>(urlId) // il backend nella risposta restituisce un void 
}


}


