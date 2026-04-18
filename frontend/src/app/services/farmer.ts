import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Farmer {
  constructor(private http: HttpClient){}

 getPendingFarmers() {
  return this.http.get('http://localhost:3000/api/pending-farmers');
}

approveFarmer(f_id:any) {
  return this.http.put(`http://localhost:3000/api/approve-farmer/${f_id}`, {});
}

rejectFarmer(f_id:any) {
  return this.http.put(`http://localhost:3000/api/reject-farmer/${f_id}`, {});
}

}
