import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { QueryParams } from '../models/query-params.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products/`;

  constructor(private http: HttpClient) {}

  getProducts(
    queryParams: QueryParams
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (queryParams.searchText) {
        params = params.set('name', queryParams.searchText);
      }
      if (queryParams.sortBy) {
        params = params.set('sortBy', queryParams.sortBy);
      }
      if (queryParams.sortDirection) {
        params = params.set('sortDirection', queryParams.sortDirection);
      }
      if (queryParams.page) {
        params = params.set('page', queryParams.page.toString());
      }
      if (queryParams.perPage) {
        params = params.set('perPage', queryParams.perPage.toString());
      }
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }
}
