import { Routes } from '@angular/router';
import { ProductList } from './pages/product-list/product-list';
import { ProductUpdate } from './pages/product-update/product-update';

export const routes: Routes = [
    {path:'', component: ProductList},
    {path: 'product/update/:id', component: ProductUpdate}
];
