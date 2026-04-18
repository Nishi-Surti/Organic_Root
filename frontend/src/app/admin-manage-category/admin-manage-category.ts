import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminManagecategory } from '../services/admin-manage-category';

@Component({
  selector: 'app-admin-manage-category',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-manage-category.html',
  styleUrl: './admin-manage-category.css',
})
export class AdminManageCategory implements OnInit {

  manageCategoryForm!: FormGroup;
  categories:any[]=[];
editId:any=null;



  constructor (private http: HttpClient ,
               private fb: FormBuilder, 
               private cdr: ChangeDetectorRef,
              private amc: AdminManagecategory){}

  ngOnInit()
  {
    this.manageCategoryForm=this.fb.group({
category:['',Validators.required]
})

this.loadCategories();
}

loadCategories()
{
this.amc.getCategory().subscribe((res:any)=>{
this.categories=res;
this.cdr.detectChanges();

})
  }

  onSubmit()
{
  const data = {
    category: this.manageCategoryForm.value.category
  };

  this.http.post(
  "http://localhost:3000/api/adminManageCategory/admin-manage-category",
  data
  ).subscribe(res =>{
    alert('Category Add Successfully');

   
    this.manageCategoryForm.reset();   // input clear
    this.loadCategories();
  })
}



deleteCategory(id:any)
{
if(confirm("Are you sure want to delete category ?"))
{
this.amc.deleteCategory(id).subscribe(()=>{
this.loadCategories();
 
})
}
}

editCategory(cat:any)
{
this.editId=cat._id;
this.manageCategoryForm.patchValue({
category:cat.category
})
}

updateCategory(){

  const data={
    category:this.manageCategoryForm.value.category
  }

  this.amc.updateCategory(this.editId,data)
  .subscribe(()=>{
    alert("Category Updated");
    this.editId=null;
    this.manageCategoryForm.reset();
    this.loadCategories();
  })

}
}
