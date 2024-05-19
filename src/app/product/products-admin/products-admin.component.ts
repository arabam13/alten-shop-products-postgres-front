import { Component, OnInit } from "@angular/core";
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

  pageSizeOptions = [10, 20, 30];
  productDialog: boolean = false;
  products!: Product[];
  product: Pick<Product, "name" | "code"> = { name: "", code: "" };
  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.code) {
        // this.products[this.findIndexById(this.product.id)] = this.product;
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

      this.products = [...this.products];
      this.productDialog = false;
      this.product = { name: "", code: "" };
    }
  }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = "";
  //   var chars =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }
}
