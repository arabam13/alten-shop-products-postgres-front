import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "app/environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Product } from "../model/product.model";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  private _products$ = new BehaviorSubject<Product[]>([]);
  get products$(): Observable<Product[]> {
    return this._products$.asObservable();
  }

  getProductsFromServer() {
    this.http
      .get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        // delay(1000),
        tap((products) => {
          //   this.lastCandidatesLoad = Date.now();
          this._products$.next(products);
        })
      )
      .subscribe();
  }
}
