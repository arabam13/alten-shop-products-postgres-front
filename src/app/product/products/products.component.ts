import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { combineLatest, map, Observable, startWith } from "rxjs";
import { ProductSearchType } from "../enums/product-search-type.enum";
import { Product } from "../model/product.model";
import { ProductService } from "../service/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  totalProducts$!: Observable<number>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: ProductSearchType;
    label: string;
  }[];

  currentPage = 1;
  productsPerPage = 10;
  pageSizeOptions = [10, 20, 30];
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.productService.getProductsFromServer(
      this.currentPage,
      this.productsPerPage
    );
    // this.products$.subscribe((products) => {
    //   console.log({ products });
    // });
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control("");
    this.searchTypeCtrl = this.formBuilder.control(ProductSearchType.NAME);
    this.searchTypeOptions = [
      { value: ProductSearchType.NAME, label: "Name" },
      { value: ProductSearchType.CATEGORY, label: "Category" },
      { value: ProductSearchType.INVENTORYSTATUS, label: "Inventory Status" },
    ];
  }

  private initObservables() {
    // this.products$ = this.productService.products$;
    const search$: Observable<string> = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );
    const searchType$: Observable<ProductSearchType> =
      this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
      );
    this.products$ = combineLatest([
      search$,
      searchType$,
      this.productService.products$,
    ]).pipe(
      map(([search, searchType, products]) =>
        products.filter((product) =>
          product[searchType].toLowerCase().includes(search)
        )
      )
    );
    this.totalProducts$ = this.productService.totalProducts$;
  }

  handlePageSizeChange(event: {
    page: number;
    first: number;
    rows: number;
    pageCount: number;
  }) {
    // console.log({ event });
    this.productsPerPage = event.rows;
    this.currentPage = event.page + 1;
    this.productService.getProductsFromServer(
      this.currentPage,
      this.productsPerPage
    );
  }
}
