import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/productService';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router){
  }
  productForm!: FormGroup;


  ngOnInit(){
   this.productForm = this.formBuilder.group({
    descrizione: ['', [Validators.required]],
    quantita: [1, [Validators.required, Validators.min(1)]],
    prezzo: [null, [Validators.required, Validators.min(0.01)]]
   })
  }

  onSubmit(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
    }
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
