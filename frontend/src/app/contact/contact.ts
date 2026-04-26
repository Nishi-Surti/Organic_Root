import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactForm: any;
  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: [''],
      mobile: [''],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.showToast('Please fill all fields', 'error');
      return;
    }

    this.http.post('http://localhost:3000/api/contact', this.contactForm.value).subscribe({
      next: (res: any) => {
        this.showToast('Message sent successfully! 🚀', 'success');
        this.contactForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Failed to send message', 'error');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3000);
  }
}
