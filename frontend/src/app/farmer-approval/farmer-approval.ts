import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Farmer } from '../services/farmer';
import { Router } from '@angular/router';


@Component({
  selector: 'app-farmer-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer-approval.html',
  styleUrl: './farmer-approval.css',
})
export class FarmerApproval implements OnInit {
pendingFarmers:any[] = [];
isLoading = true;

constructor(private farmer : Farmer, private router: Router, private cdr: ChangeDetectorRef){}

ngOnInit() {
  this.loadPendingFarmers();

   this.router.events.subscribe(() => {
    this.loadPendingFarmers();
  });
}

loadPendingFarmers(){
  this.farmer.getPendingFarmers().subscribe((res:any)=>{
    this.pendingFarmers = res;
    this.isLoading = false;
    this.cdr.detectChanges();
  });
}

approve(f_id:any){
  this.farmer.approveFarmer(f_id).subscribe(()=>{
    alert("Farmer Approved");
    this.loadPendingFarmers(); // refresh list
  });
}

reject(f_id:any){
  this.farmer.rejectFarmer(f_id).subscribe(()=>{
    alert("Farmer Rejected");
    this.loadPendingFarmers();
  });
}
}
