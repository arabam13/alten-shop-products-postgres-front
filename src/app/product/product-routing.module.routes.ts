import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "products",
    loadComponent: () =>
      import("./products/products.component").then((m) => m.ProductsComponent),
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./products-admin/products-admin.component").then(
        (m) => m.ProductsAdminComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
