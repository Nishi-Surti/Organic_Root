import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-farmer-earning',
  imports: [FormsModule,CommonModule],
  templateUrl: './farmer-earning.html',
  styleUrl: './farmer-earning.css',
})
export class FarmerEarning implements OnInit {

  available: number = 0;
  pending: number = 0;
  monthly: number = 0;
  total: number = 0;
  week: number = 0;

  filter = "weekly";

  chartData: any[] = [];

  allOrders: any[] = [];


 constructor(private http: HttpClient, private crd: ChangeDetectorRef) {}

ngOnInit() {
  const farmerId = localStorage.getItem("farmerId");

  this.http.get(`http://localhost:3000/api/farmer-earnings/${farmerId}`)
    .subscribe((res: any) => {

      console.log("EARNING API:", res);

      this.available = res.available;
      this.pending = res.pending;
      this.monthly = res.monthly;
      this.total = res.total;
      this.week = res.week;

      this.allOrders = res.orders;
      this.prepareWeeklyChart(this.allOrders); // default load
      this.crd.detectChanges();
    });
    
}

prepareWeeklyChart(orders: any[]) {

  const days = ["S","M","T","W","T","F","S"];
  const today = new Date();

  const data = [0,0,0,0,0,0,0];

  orders.forEach(o => {
    const d = new Date(o.orderDate);
    const diff = (today.getTime() - d.getTime()) / (1000*60*60*24);

    if (diff <= 7) {
      const dayIndex = d.getDay();
      data[dayIndex] += o.totalPrice;
    }
  });

  this.chartData = days.map((day, i) => ({
    day,
    value: data[i]
  }));
}


prepareMonthlyChart(orders: any[]) {

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data = new Array(12).fill(0);

  orders.forEach(o => {
    const d = new Date(o.orderDate);
    const monthIndex = d.getMonth();
    data[monthIndex] += o.totalPrice;
  });

  const max = Math.max(...data);

  this.chartData = months.map((m, i) => ({
    day: m,
    value: max === 0 ? 0 : (data[i] / max) * 100
  }));
}

onFilterChange() {
  if (this.filter === "Weekly") {
    this.prepareWeeklyChart(this.allOrders);
  } else {
    this.prepareMonthlyChart(this.allOrders);
  }
}

setFilter(type: string) {
  this.filter = type;

  if (type === "Weekly") {
    this.prepareWeeklyChart(this.allOrders);
  } else {
    this.prepareMonthlyChart(this.allOrders);
  }
}

}
