import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
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
  product$: Observable<Product>;

  pageSizeOptions = [10, 20, 30];
  productDialog: boolean = false;
  products!: Product[];
  product: Pick<Product, "name" | "code"> = { name: "", code: "" };
  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.productService.getProductsFromServer();
  }

  private initObservables() {
    this.products$ = this.productService.products$;
    this.totalProducts$ = this.productService.totalProducts$;
    this.productsPerPage$ = this.productService.productsPerPage$;
  }

  handlePageSizeChange(event: { page: number; rows: number }) {
    // console.log({ event });
    this.productService.getProductsFromServer(event.page + 1, event.rows);
  }

  openNew() {
    this.product = { name: "", code: "" };
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct(product: Pick<Product, "name" | "code">) {
    // console.log({ product });
    this.submitted = true;

    if (product.name?.trim() && product.code?.trim()) {
      // this.products[this.findIndexById(this.product.id)] = this.product;
      this.productService.updateProductFromServer(product);
      this.messageService.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Updated",
        life: 3000,
      });
    } else {
      // this.product.id = this.createId();
      // this.product.image = "product-placeholder.svg";
      // this.products.push(this.product);
      this.messageService.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Created",
        life: 3000,
      });
    }

    // this.products = [...this.products];
    this.productDialog = false;
    // this.product = { name: "", code: "" };
  }
  editProduct(product: Product) {
    // console.log({ product });
    this.product = { name: product.name, code: product.code };

    this.productDialog = true;
  }
}
