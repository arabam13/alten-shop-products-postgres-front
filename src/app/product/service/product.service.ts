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
  private _totalProducts$ = new BehaviorSubject<number>(0);
  get totalProducts$(): Observable<number> {
    return this._totalProducts$.asObservable();
  }
  private _productsPerPage$ = new BehaviorSubject<number>(10);
  get productsPerPage$(): Observable<number> {
    return this._productsPerPage$.asObservable();
  }

  getProductsFromServer(pageIndex?: number, pageSize?: number) {
    this.http
      .get<Product[]>(`${environment.apiUrl}/products`, {
        params: {
          _page: pageIndex?.toString(),
          _limit: pageSize?.toString(),
        },
      })
      .pipe(
        // delay(1000),
        tap((dataApi) => {
          this._products$.next(dataApi["products"]);
          this._totalProducts$.next(dataApi["totolProducts"]);
          this._productsPerPage$.next(dataApi["pageSize"]);
        })
      )
      .subscribe();
  }
}
