


// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CartService } from 'src/app/cart.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-checkout-form',
//   templateUrl: './checkout-form.component.html',
//   styleUrls: ['./checkout-form.component.css']
// })
// export class CheckoutFormComponent {
//   order: any = {};
//   private subscription: Subscription = new Subscription();

//   constructor(private cartService: CartService, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.subscription.add(
//       this.cartService.getItemsCodes().subscribe(codes => {
//         this.order.itemsCode = codes;
//       })
//     );
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe(); // Prevent memory leaks
//   }

//   onSubmit(checkoutForm: any): void {
//     if (checkoutForm.valid) {
//       this.http.post('https://future-vision.asia:4000/submit_order', this.order).subscribe(
//         (response: any) => {
//           console.log('Success:', response);
//           alert('Order submitted successfully');
//         },
//         (error: any) => {
//           console.error('Error:', error);
//           alert('An error occurred while submitting the order.');
//         }
//       );
//     } else {
//       alert('Please fill in all required fields.');
//     }
//   }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {
  order: any = {};
  private subscription: Subscription = new Subscription();

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getItems().subscribe(items => {
        this.order.itemsCode = items.map(item => item.productID).join(', ');
        this.order.images = items.map(item => item.imageLink);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Prevent memory leaks
  }

  onSubmit(checkoutForm: any): void {
    if (checkoutForm.valid) {
      this.http.post('https://future-vision.asia:4000/submit_order', this.order).subscribe(
        (response: any) => {
          console.log('Success:', response);
          alert('Order submitted successfully');
        },
        (error: any) => {
          console.error('Error:', error);
          alert('An error occurred while submitting the order.');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}