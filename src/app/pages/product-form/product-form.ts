import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/productService';

@Component({
  selector: 'app-product-form',
  imports:  [ReactiveFormsModule, ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router){
  }
  productForm!: FormGroup;


  ngOnInit(){
   this.productForm = this.formBuilder.group({
    descrizione: [''],
    quantita: [0],
    prezzo: [null]
   })
  }

  onSubmit(){
   this.productService.insertProduct(this.productForm.value).subscribe({
    next:(response)=> {
      console.log(response);
      this.router.navigate(['/']);
    },
    
    error: (err) => {
      console.log(err);
    }

   })
  }
 
}
