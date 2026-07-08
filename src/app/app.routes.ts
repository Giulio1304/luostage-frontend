import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductForm } from './pages/product-form/product-form';
import { ProductUpdate } from './pages/product-update/product-update';

export const routes: Routes = [
    {path:'', component: ProductList},
    {path: 'product/update/:id', component: ProductUpdate},
    {path:'product-new', component: ProductForm}
];
  