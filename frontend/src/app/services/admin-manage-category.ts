import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminManagecategory {
  
  constructor(private http: HttpClient){}

  manageCategory(cat_id: any)
  {
    return this.http.post("http://localhost:3000/api/manage-category",cat_id);
  }

  getCategory()
{
return this.http.get("http://localhost:3000/api/adminManageCategory/get-category");
}

deleteCategory(id:any)
{
return this.http.delete("http://localhost:3000/api/adminManageCategory/delete-category/"+id);
}

updateCategory(id:any,data:any)
{
return this.http.put("http://localhost:3000/api/adminManageCategory/update-category/"+id,data);
}
}
