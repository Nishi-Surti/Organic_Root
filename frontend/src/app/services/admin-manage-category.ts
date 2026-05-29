import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminManagecategory {
  
  constructor(private http: HttpClient){}

  manageCategory(cat_id: any)
  {
    return this.http.post("https://organic-root-api.onrender.com/api/manage-category",cat_id);
  }

  getCategory()
{
return this.http.get("https://organic-root-api.onrender.com/api/adminManageCategory/get-category");
}

deleteCategory(id:any)
{
return this.http.delete("https://organic-root-api.onrender.com/api/adminManageCategory/delete-category/"+id);
}

updateCategory(id:any,data:any)
{
return this.http.put("https://organic-root-api.onrender.com/api/adminManageCategory/update-category/"+id,data);
}
}
