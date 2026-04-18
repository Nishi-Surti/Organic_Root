import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consumer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './consumer-dashboard.html',
  styleUrl: './consumer-dashboard.css',
})
export class ConsumerDashboard implements OnInit{

    consumerName : any;
  ngOnInit() 
  {
    this.consumerName = localStorage.getItem("consumerName");
  }
}
