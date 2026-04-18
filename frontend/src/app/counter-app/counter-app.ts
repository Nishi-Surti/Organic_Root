import { Component } from '@angular/core';

@Component({
  selector: 'app-counter-app',
  imports: [],
  templateUrl: './counter-app.html',
  styleUrl: './counter-app.css',
})
export class CounterApp {
  count=0

  handleIncrement(){
    this.count=this.count+1
  }

  handleDecrement(){
    this.count=this.count-1
  }

  handleReset(){
    this.count=0
  }
}
