import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
  { path: '', component: ProductPageComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProductDetailComponent },
];
