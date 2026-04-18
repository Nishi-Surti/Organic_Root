import { Component } from '@angular/core';
import { CartPage } from '../services/cart-page';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, QRCodeComponent],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  constructor(
    private cart: CartPage,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  products: any[] = [];
  orderForm!: FormGroup;

  showDetails: boolean = false;
  isEditable = false;

  showSuccessPopup = false;
  orderId: any;

  timeLeft: number = 60;
  timerInterval: any;

  showPaymentSuccess = false;
  showUPIPopup = false;

  upiLink: string = "";

  ngOnInit() {

    // ✅ GET MULTIPLE PRODUCTS
    const data = this.cart.getBuyProduct();

if (Array.isArray(data)) {
  this.products = data;
} else if (data) {
  this.products = [data]; // 🔥 single object → array
} else {
  this.products = [];
}

    this.orderForm = this.fb.group({
      cname: [{ value: '', disabled: true }, Validators.required],
      mobile: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      address: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      pincode: [{ value: '', disabled: true }, Validators.required],
      paymentMethod: ['cod']
    });

    const c_id = localStorage.getItem("consumerId");

    this.http.get(`http://localhost:3000/api/consumer/${c_id}`)
      .subscribe((res: any) => {

        this.orderForm.patchValue({
          cname: res.name,
          mobile: res.mobile,
          address: res.address,
          city: res.city,
          pincode: res.pincode
        });

      });
  }

  // ✅ TOTAL CALCULATION
getTotal() {
  if (!Array.isArray(this.products)) return 0;

  return this.products.reduce((total, item) => {
    return total + (item.price * item.qty);
    // console.log("BUY PRODUCT:", this.cart.getBuyProduct());
  }, 0);
}

  // ✅ ORDER SUBMIT (MULTIPLE PRODUCTS)
  onSubmit() {
if (this.orderForm.invalid) {
  this.orderForm.markAllAsTouched();
  return;
}

    const formValue = this.orderForm.getRawValue();

    const orderItems = this.products.map(item => ({
      product_id: item.product_id,
      pimg: item.pimg,
      pname: item.pname,
      price: item.price,
      quantity: item.qty,
      totalPrice: item.price * item.qty,
      farmerId: item.f_id,
      farmerName: item.farmerName,
      farmerVillage: item.farmerVillage
    }));

    const orderData = {
      c_id: localStorage.getItem("consumerId"),

      cname: formValue.cname,
      mobile: formValue.mobile,
      address: formValue.address,
      city: formValue.city,
      pincode: formValue.pincode,

      items: orderItems,                // ✅ MULTIPLE PRODUCTS
      totalAmount: this.getTotal(),     // ✅ TOTAL

      paymentMethod: this.orderForm.value.paymentMethod
    };

    this.http.post("http://localhost:3000/api/place-order", orderData)
      .subscribe((res: any) => {

        this.orderId = res.order_id;
        // localStorage.setItem("city", res.place_order.city);/
        if(res.place_order){
  localStorage.setItem("city", res.place_order.city);
}
        this.showSuccessPopup = true;
        console.log("API RESPONSE:", res);
        this.cd.detectChanges();

      });
  }

  enableEdit() {
    this.isEditable = true;
    this.orderForm.enable();
  }

  disableEdit() {
    this.isEditable = false;
    this.orderForm.disable();
  }

  // ✅ QUANTITY CONTROL (PER PRODUCT)
  increase(item: any) {
    if (item.qty < item.quantity) {
      item.qty += 1;
      item.showLimitedStockError = false;
    } else {
      item.showLimitedStockError = true;
    }
  }

  decrease(item: any) {
    if (item.qty > 1) {
      item.qty -= 1;
      item.showLimitedStockError = false;
    }
  }

  goDashboard() {
    this.showSuccessPopup = false;
    this.router.navigate(['/consumer/consumer-dashboard']);
  }

  goOrders() {
    this.showSuccessPopup = false;
    this.router.navigate(['/consumer/consumer-order']);
  }

  // ✅ UPI PAYMENT (TOTAL BASED)
  openUPI() {
    if (this.orderForm.value.paymentMethod === 'online') {

      const amount = this.getTotal();

      this.upiLink = `upi://pay?pa=surtiutsavi@oksbi&pn=OrganicRoot&am=${amount}&cu=INR`;

      this.showUPIPopup = true;
      this.startTimer();
    }
  }

 startTimer() 
 {
  this.timeLeft = 60;

  this.timerInterval = setInterval(() => {
    this.timeLeft--;

    this.cd.detectChanges();

    // ✅ SUCCESS CONDITION
    if (this.timeLeft <= 50) {
      this.paymentSuccess();
    }

  }, 1000);
}
  get formattedTime() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  paymentSuccess() 
  {
    clearInterval(this.timerInterval);

    this.showUPIPopup = false;
    this.showPaymentSuccess = true;

    this.cd.detectChanges();

    setTimeout(() => {
      this.showPaymentSuccess = false;
      this.onSubmit();
    }, 4000);
    
  }

  closeUPI() {
    this.showUPIPopup = false;
  }

  confirmPayment() {
    this.showUPIPopup = false;
    this.onSubmit();
  }

}