import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProductRoutingModule } from "./product-routing.module.routes";
import { ProductsAdminComponent } from "./products-admin/products-admin.component";
import { ProductsComponent } from "./products/products.component";

@NgModule({
  declarations: [ProductsAdminComponent, ProductsComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
