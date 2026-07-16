import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/productService';
import { Product } from '../../core/models/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './product-update.html',
  styleUrl: './product-update.scss',
})
export class ProductUpdate implements OnInit{

  private route = inject(ActivatedRoute); // rotta attiva per leggere l'id dall'url
  private service = inject(ProductService);
  private router = inject (Router);
  private formBuilder = inject (FormBuilder); 

  productForm!: FormGroup
  product = signal <Product | null>(null); // null perchè può esserci come no
  error : string | null = null;


  


  ngOnInit(): void { // lifecycle hook
    this.productForm = this.formBuilder.nonNullable.group({
    descrizione: ["", [Validators.required]],
    quantita: [1, [Validators.required,Validators.min(1)]],
    prezzo : [0, [Validators.required,Validators.min(0.01)]]  
  })
    const id = Number(this.route.snapshot.paramMap.get("id")); //snapshot dei parametri fino a quel momento, paramap per i parametri presenti nell'URL (id)

    this.service.getById(id).subscribe({ // il service prende l'id e "aspetta" che i dati del product arrivino
      next: (response) => { 
        this.product.set(response) // in caso positivo mostri la response (e quindi il prodotto)
        this.productForm.patchValue({
          descrizione : response.descrizione,
          quantita : response.quantita,
          prezzo : response.prezzo

        })
      },
      error: (err) => {
        console.log(err) // in caso negativo mostri l'errore 
        this.error='errore nel caricamento dei prodotti!';
      }
    });

    
   
  }
  // reactive forms 


  
  // metodo collegato all'html
  onSubmit(){
    if (this.productForm.invalid){
      this.productForm.markAllAsTouched();
    }
    const id = Number(this.route.snapshot.paramMap.get("id")); // prendo id dall'url  (come fatto in ngOnInit)
    const productToUpdate : Product = { 
    id: id,                     // si prende l'id dato che non l'ho messo nel form group sennò l'utente è in grado di modificare anche l'id
    ...this.productForm.getRawValue()  // spread operator (prende tutti i campi dell'oggetto vecchio: desc, qty, price e li mette nel nuovo oggetto)
    // non ho usato il .value perchè quello restituisce un Partial<> cioè un tipo di dato che valuta che tutti i campi possono essere null o no (quindi product)
    // questo non è compatibile con Product che vuole i dati sempre presenti e con i loro rispettivi tipi di dato
  };

    this.service.updateProduct(productToUpdate,id).subscribe({
      next : (response) => {
        this.product.set(response);
        this.router.navigate(["/"])
      },
      error: (err) => {
        console.log(err) 
        this.error='errore nell\ aggiornamento dei prodotti!';
      }
    })

  }
}
