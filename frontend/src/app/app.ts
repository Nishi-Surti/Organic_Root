import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';


// @NgModel({
//   imports: [
//     FormsModule
//   ]
// })

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Navbar,Footer,ReactiveFormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public authService: Auth) {}

  
}
