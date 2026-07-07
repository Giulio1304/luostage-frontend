import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductForm } from './pages/product-form/product-form';

export const routes: Routes = [
    {path:'', component: ProductList},
    {path:'product-new', component: ProductForm}
];
  