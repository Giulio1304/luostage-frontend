import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/productService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit{
   products = signal <Product[]>([]);
   error: string  | null=null;

  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.productService.getAllProds()
    .subscribe({
      next:(response) => {
        this.products.set(response);
      }, 
      error: (err) => {
        console.log(err);
        this.error='errore nel caricamento dei prodotti!';

      }
    });
    

  }


  deleteById(id : number) {
    this.productService.deleteById(id)
    .subscribe({
      next: () => {
        this.products.update(products => products.filter(product => product.id != id));
      },
      error: (err) => {
        console.log(err);
        this.error = 'errore nel caricamento dei prodotti!';
      }
    })
  }

}
