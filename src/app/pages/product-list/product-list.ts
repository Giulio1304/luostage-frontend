import { ChangeDetectorRef, Component, OnInit, signal, inject } from '@angular/core';
import { Product } from '../../core/models/product';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/productService';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit{
   products = signal <Product[]>([]);
   error: string  | null=null;
  constructor(private productService: ProductService, protected router: Router, private cdr: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    console.log("NGONINIT");
    this.productService.getAllProds()
      .subscribe({
        next: (response) => {
          this.products.set(response);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this.error = 'errore nel caricamento dei prodotti!'
        }
      });
  }

  goToNewProduct(): void {
    this.router.navigate(["/product-new"]);
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
