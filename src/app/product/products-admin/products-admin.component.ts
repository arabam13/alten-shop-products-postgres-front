import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Observable } from "rxjs";
import { Product } from "../model/product.model";
import { ProductService } from "../service/product.service";

@Component({
  selector: "app-products-admin",
  templateUrl: "./products-admin.component.html",
  styleUrls: ["./products-admin.component.scss"],
  providers: [ConfirmationService],
})
export class ProductsAdminComponent implements OnInit {
  products$: Observable<Product[]>;
  totalProducts$: Observable<number>;
  productsPerPage$: Observable<number>;

  pageSizeOptions = [10, 20, 30];

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.productService.getProductsFromServer();
  }

  private initObservables() {
    this.products$ = this.productService.products$;
    this.totalProducts$ = this.productService.totalProducts$;
  }

  handlePageSizeChange(event: { page: number; rows: number }) {
    // console.log({ event });
    this.productService.getProductsFromServer(event.page + 1, event.rows);
  }
}
