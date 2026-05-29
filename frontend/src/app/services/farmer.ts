import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Farmer {
  constructor(private http: HttpClient){}

 getPendingFarmers() {
  return this.http.get('https://organic-root-api.onrender.com/api/pending-farmers');
}

approveFarmer(f_id:any) {
  return this.http.put(`https://organic-root-api.onrender.com/api/approve-farmer/${f_id}`, {});
}

rejectFarmer(f_id:any) {
  return this.http.put(`https://organic-root-api.onrender.com/api/reject-farmer/${f_id}`, {});
}

}
