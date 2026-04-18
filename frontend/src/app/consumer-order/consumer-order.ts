import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ViewOrder } from '../services/view-order';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-consumer-order',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './consumer-order.html',
  styleUrl: './consumer-order.css',
})
export class ConsumerOrder {

  orders:any[] = [];
expandedOrder:any = null;

constructor(private order: ViewOrder,private cd: ChangeDetectorRef ){}

ngOnInit(){

const cid = localStorage.getItem("consumerId");

this.order.getConsumerOrders(cid)
.subscribe((res:any)=>{

console.log("API DATA:", res);
this.orders = res;
this.cd.detectChanges();
});

}

/* toggle details */
toggle(order:any){
this.expandedOrder = this.expandedOrder === order ? null : order;
}

selectedOrderIndex: number | null = null;

toggleOrder(index: number){
  if(this.selectedOrderIndex === index){
    this.selectedOrderIndex = null;
  } else {
    this.selectedOrderIndex = index;
  }
}

// status text
  getStatusText(status:string)
  {

    switch(status){
      case "Confirmed": return "Placed";
      case "Packed": return "Packed";
      case "Shipped": return "Shipped";
      case "Delivered": return "Delivered";
      case "Cancelled": return "Cancelled";
      default: return "Pending";
    }

  }

  getStepNumber(status:string)
  {
      switch (status) 
      {
        case "Confirmed": return 1; // Placed
        case "Packed": return 2;
        case "Shipped": return 3;
        case "Delivered": return 4;
        default: return 0;
      }
  }

  showCancelModal: boolean = false;
  selectedOrderId: number | null = null;

  cancelOrder(orderId: number){

  const confirmCancel = confirm("Are you sure you want to cancel this order?");
  if(!confirmCancel) return;

  this.order.cancelOrder(orderId).subscribe({
    next: (res:any) => {
      alert("Order Cancelled");

      // ✅ UI update instantly
      const order = this.orders.find(o => o.order_id === orderId);
      if(order){
        order.orderStatus = "Cancelled";
      }
    },
    error: (err) => {
      console.log("Cancel Error:", err);
    }
  });

}

openCancelModal(orderId: number){
  this.selectedOrderId = orderId;
  this.showCancelModal = true;
}

closeModal(){
  this.showCancelModal = false;
  this.selectedOrderId = null;
}

isDeleting = false;

confirmCancel(){

  if(this.selectedOrderId === null || this.isDeleting) return;

  this.isDeleting = true;

  this.order.deleteOrder(this.selectedOrderId).subscribe({
    next: () => {

      this.orders = this.orders.filter(
        o => o.order_id !== this.selectedOrderId
      );

      this.closeModal();
      this.isDeleting = false;
    },
    error: () => {
      this.isDeleting = false;
    }
  });

}

showBillModal = false;
selectedOrder: any = null;

openBillModal(order: any) {
  this.selectedOrder = order;
  this.showBillModal = true;
}

closeBillModal() {
  this.showBillModal = false;
}

printBill() 
{
  const content = document.getElementById('billContent')?.innerHTML;

  const printWindow = window.open('', '', 'width=900,height=700');

  if (printWindow) 
  {
    printWindow.document.write(`
<html>
<head>
<title>Invoice</title>

<style>

body {
  font-family: Arial;
  padding: 20px;
}

/* ✅ MAIN FIX */
.invoice-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}

/* logo */
.logo {
  width: 150px;
  height: auto;
}

/* text */
.company-details {
      width: 100%;
  display: flex;
  flex-direction: column;
}

.company-details h2 {
  margin: 0;
  color: #2e7d32;
}

/* hide buttons */
.no-print {
  display: none !important;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th {
  background: #2e7d32;
  color: white;
  padding: 10px;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

</style>

</head>

<body>
  ${content}
</body>
</html>
`);

    printWindow.document.close();
    printWindow.print();
  }
}
}
