import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-report.html',
  styleUrl: './admin-report.css',
})
export class AdminReport implements OnInit {
  selectedRole: any = 'farmer';
  reportData: any;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.fetchReportData();
  }

  chartInstances: any[] = [];

destroyCharts() {
  this.chartInstances.forEach(c => c.destroy());
  this.chartInstances = [];
}

  fetchReportData() {
    this.http.get('http://localhost:3000/admin/report-data').subscribe((res: any) => {
      this.reportData = res;
      this.loadFarmerCharts();
    });
  }

  changeRole(event: any) {
    this.selectedRole = event.target.value;

    setTimeout(() => {
      if (this.selectedRole == 'farmer') {
        this.loadFarmerCharts();
      }

      if (this.selectedRole == 'consumer') {
        this.loadConsumerCharts();
      }

      if (this.selectedRole == 'admin') {
        this.loadAdminCharts();
      }
    }, 100);
  }

  /* FARMER */

  loadFarmerCharts() {

this.destroyCharts();

// ✅ Line Chart (Registration Trend)
const farmerLine = new Chart("farmerRegisterChart", {
  type: 'line',
  data: {
    labels: this.reportData.labels,
    datasets: [{
      label: 'Farmer Registrations',
      data: this.reportData.farmerRegistrations,
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46,125,50,0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    animation: { duration: 1200 },
    plugins: { legend: { display: true } }
  }
});

// ✅ Doughnut Chart (Sales Distribution)
const farmerDoughnut = new Chart("farmerSalesChart", {
  type: 'doughnut',
  data: {
    labels: this.reportData.labels,
    datasets: [{
      data: this.reportData.farmerSales,
      backgroundColor: ['#4caf50','#66bb6a','#81c784','#a5d6a7']
    }]
  },
  options: {
    animation: { animateScale: true },
    cutout: '60%'
  }
});

this.chartInstances.push(farmerLine, farmerDoughnut);
}

  /* CONSUMER */

  loadConsumerCharts() {

this.destroyCharts();

// ✅ Line Chart (Orders)
const orderLine = new Chart("orderChart", {
  type: 'line',
  data: {
    labels: this.reportData.labels,
    datasets: [{
      label: 'Orders',
      data: this.reportData.consumerOrders,
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25,118,210,0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    animation: { duration: 1200 }
  }
});

// ✅ Pie Chart (Consumers Growth)
const consumerPie = new Chart("consumerChart", {
  type: 'pie',
  data: {
    labels: this.reportData.labels,
    datasets: [{
      data: this.reportData.consumerRegistrations,
      backgroundColor: ['#42a5f5','#64b5f6','#90caf9','#bbdefb']
    }]
  },
  options: {
    animation: { animateRotate: true }
  }
});

this.chartInstances.push(orderLine, consumerPie);
}

  /* ADMIN */

 loadAdminCharts() {

this.destroyCharts();

// ✅ Doughnut (Platform Distribution)
const growthDoughnut = new Chart("growthChart", {
  type: 'doughnut',
  data: {
    labels: ['Farmers','Consumers','Orders','Users'],
    datasets: [{
      data: this.reportData.platformGrowth,
      backgroundColor: ['#4caf50','#2196f3','#ff9800','#9c27b0']
    }]
  },
  options: {
    cutout: '65%',
    animation: { animateScale: true }
  }
});

// ✅ Line Chart (Revenue)
const revenueLine = new Chart("revenueChart", {
  type: 'line',
  data: {
    labels: this.reportData.labels,
    datasets: [{
      label: 'Revenue',
      data: this.reportData.revenue,
      borderColor: '#ff5722',
      backgroundColor: 'rgba(255,87,34,0.1)',
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    animation: { duration: 1500 }
  }
});

this.chartInstances.push(growthDoughnut, revenueLine);
}
}
