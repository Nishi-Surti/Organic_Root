import { CommonModule } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-report.html',
  styleUrl: './admin-report.css',
})
export class AdminReport implements OnInit {
  selectedRole:any = "farmer";

ngOnInit(){

this.loadFarmerCharts();

}

changeRole(event:any){

this.selectedRole = event.target.value;

setTimeout(()=>{

if(this.selectedRole == "farmer"){
this.loadFarmerCharts();
}

if(this.selectedRole == "consumer"){
this.loadConsumerCharts();
}

if(this.selectedRole == "admin"){
this.loadAdminCharts();
}

},100)

}


/* FARMER */

loadFarmerCharts(){

new Chart("farmerRegisterChart",{

type:'bar',

data:{
labels:['Jan','Feb','Mar','Apr'],
datasets:[{
label:'Farmers',
data:[10,15,8,20],
backgroundColor:'#2e7d32'
}]
}

})



new Chart("farmerSalesChart",{

type:'line',

data:{
labels:['Jan','Feb','Mar','Apr'],
datasets:[{
label:'Sales',
data:[2000,3500,2500,4000],
borderColor:'#ff9800',
fill:false
}]
}

})

}



/* CONSUMER */

loadConsumerCharts(){

new Chart("consumerChart",{

type:'bar',

data:{
labels:['Jan','Feb','Mar','Apr'],
datasets:[{
label:'Consumers',
data:[20,25,30,35],
backgroundColor:'#1976d2'
}]
}

})



new Chart("orderChart",{

type:'line',

data:{
labels:['Jan','Feb','Mar','Apr'],
datasets:[{
label:'Orders',
data:[120,140,180,200],
borderColor:'#e91e63',
fill:false
}]
}

})

}



/* ADMIN */

loadAdminCharts(){

new Chart("growthChart",{

type:'bar',

data:{
labels:['Users','Farmers','Products','Orders'],
datasets:[{
data:[200,40,120,350],
backgroundColor:['#4caf50','#2196f3','#ff9800','#9c27b0']
}]
}

})



new Chart("revenueChart",{

type:'line',

data:{
labels:['Jan','Feb','Mar','Apr'],
datasets:[{
label:'Revenue',
data:[10000,15000,12000,20000],
borderColor:'#2e7d32',
fill:false
}]
}

})

}
}
