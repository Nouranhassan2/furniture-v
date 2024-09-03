// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApiResponse } from 'src/app/api-response';
// import { Product } from 'src/app/product';
// import { ProductsSService } from 'src/app/products-s.service';
// import { NgZone } from '@angular/core';

// declare var bootstrap: any;

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent {

// products: Product[] = [];
// filteredProducts: any[] = [];
// selectedCategory: string = '';
// filterVisible = false;  // Controls the visibility of the filter select
// selectedProduct?: Product;
//  modalVisible = false;


// constructor(private productService: ProductsSService) {}


// selectCategory(category: string): void {

//   this.selectedCategory = category;
//   this.filterVisible = true;
//   this.productService.getProductsByCategory(category).subscribe({
//     next: (response: ApiResponse) => {
//       this.products = response.products;  // Correctly accessing the products array
//       console.log(response.products);
      
//       this.filteredProducts = [];  // Clearing filtered products
//     },
//     error: (error) => console.error('Error fetching data: ', error)
//   });
// }

// applyFilter(filter: string): void {
//   if (this.selectedCategory && filter) {
//     this.productService.getFilteredProducts(this.selectedCategory, filter).subscribe({
//       next: (response: ApiResponse) => {
//         this.filteredProducts = response.products;  // Correctly accessing the filtered products
//       },
//       error: (error) => console.error('Error fetching filtered data: ', error)
//     });
//   }
// }
// showProductModal(product: Product): void {
//   this.selectedProduct = product;
//   this.modalVisible = true;
// }
// handleModalClose(): void {
//   this.modalVisible = false;  // Reset the modal visibility
//   this.selectedProduct = undefined;  // Optional: Clear the selected product
// }
// }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/api-response';
import { Product } from 'src/app/product';
import { ProductsSService } from 'src/app/products-s.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  filterVisible = false;  // Controls the visibility of the filter select
  selectedProduct?: Product;
  modalVisible = false;
  categories: string[] = [];

  constructor(private productService: ProductsSService) {}
  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        // Check if the response contains the 'categories' property
        if (response && response.categories && Array.isArray(response.categories) && response.categories.length > 0) {
          // Assign the array of categories from the response to the component's categories property
          this.categories = response.categories;
          
          // Log the categories to the console for debugging or verification
          console.log(this.categories);
  
          // Select the first category by default
          this.selectCategory(this.categories[2]); // Select the first category
        } else {
          console.error('Invalid response format or no categories found: ', response);
        }
      },
      error: (error) => console.error('Error fetching categories: ', error)
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterVisible = true;
    this.productService.getProductsByCategory(category).subscribe({
      next: (response: ApiResponse) => {
        this.products = response.products;
        this.filteredProducts = [];  // Clearing filtered products
      },
      error: (error) => console.error('Error fetching data: ', error)
    });
  }

  applyFilter(filter: string): void {
    if (this.selectedCategory && filter) {
      this.productService.getFilteredProducts(this.selectedCategory, filter).subscribe({
        next: (response: ApiResponse) => {
          this.filteredProducts = response.products;
        },
        error: (error) => console.error('Error fetching filtered data: ', error)
      });
    }
  }

  showProductModal(product: Product): void {
    this.selectedProduct = product;
    this.modalVisible = true;
  }

  handleModalClose(): void {
    this.modalVisible = false;  // Reset the modal visibility
    this.selectedProduct = undefined;  // Optional: Clear the selected product
  }
}