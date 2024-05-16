import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ProductSearchType } from "../enums/product-search-type.enum";
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
  options!: {
    value: ProductSearchType;
    label: string;
  }[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.options = [
      { value: ProductSearchType.NAME, label: "Name" },
      { value: ProductSearchType.CATEGORY, label: "Category" },
    ];
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

  onSortChange(sort: string) {
    // this.productService.sortProducts(sort);
  }
}
