import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Register } from '../services/register';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './farmer.html',
  styleUrl: './farmer.css',
})
export class Farmer implements OnInit {

  farmers: any[] = [];
  products:any[]=[];
  loading = true;

  constructor(private regService: Register, private cd: ChangeDetectorRef,
              private route:ActivatedRoute, private http:HttpClient
  ) {}

  ngOnInit(): void {
    this.loadFarmers();
  }

 loadFarmers() {
  this.regService.getFarmers().subscribe((data: any) => {
    this.farmers = data.filter((f: any) => f.status === 'Approved');
    this.loading = false;
    this.cd.detectChanges();
  });
}
}