import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module.routes";
import { ProductsAdminComponent } from "./products-admin/products-admin.component";
import { ProductsComponent } from "./products/products.component";
import { ProductService } from "./service/product.service";

@NgModule({
  declarations: [ProductsAdminComponent, ProductsComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
  providers: [ProductService],
})
export class ProductModule {}
