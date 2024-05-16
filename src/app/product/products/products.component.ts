import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
import { ProductService } from "../service/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  // products: Product[] = [];
  products$: Observable<Product[]>;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.initObservables();
    this.productService.getProductsFromServer();
    // this.products$.subscribe((products) => {
    //   console.log({ products });
    //   this.products = products;
    // });
  }

  private initObservables() {
    this.products$ = this.productService.products$;
  }
}
