import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumer-offers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-offers.html',
  styleUrl: './consumer-offers.css',
})
export class ConsumerOffers implements OnInit{

  constructor(private http: HttpClient, private cd: ChangeDetectorRef){}

  offers:any[] = [];

ngOnInit(){
  this.http.get("http://localhost:3000/api/offers")
    .subscribe((res:any)=>{
      console.log("OFFERS DATA:", res); // 🔥 DEBUG
      this.offers = res;
      this.cd.detectChanges();
    });
}
}
