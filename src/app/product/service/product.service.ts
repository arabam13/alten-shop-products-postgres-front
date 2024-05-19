import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "app/environments/environment";
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
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

  updateProductFromServer(productARG: Pick<Product, "name" | "code">): void {
    this.products$
      .pipe(
        take(1),
        map((products) =>
          products.map((product) =>
            product.code === productARG.code
              ? { ...product, code: productARG.code, name: productARG.name }
              : product
          )
        ),
        tap((updatedProducts) => this._products$.next(updatedProducts)),
        switchMap((updatedProducts) =>
          this.http.patch(
            `${environment.apiUrl}/products/${
              updatedProducts.find(
                (product) => product.code === productARG.code
              ).id
            }`,
            productARG
          )
        )
      )
      .subscribe();
  }
}
