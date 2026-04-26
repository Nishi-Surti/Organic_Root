import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-queries',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-queries.html',
  styleUrl: './admin-queries.css'
})
export class AdminQueriesComponent implements OnInit {
  queries: any[] = [];
  toastMessage: string | null = null;
  toastType: 'success' | 'error' = 'success';
  replyText: { [key: string]: string } = {};

  constructor(private http: HttpClient, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchQueries();
  }

  fetchQueries(): void {
    this.http.get('http://localhost:3000/api/queries').subscribe({
      next: (res: any) => {
        this.queries = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch queries', err);
        this.showToast('Failed to fetch queries', 'error');
      }
    });
  }

  sendReply(queryId: string, mobileStr: string | null): void {
    const reply = this.replyText[queryId];
    if (!reply || reply.trim() === '') {
      this.showToast('Please enter a reply message', 'error');
      return;
    }

    this.http.put(`http://localhost:3000/api/queries/reply/${queryId}`, { reply }).subscribe({
      next: (res: any) => {
        this.showToast('Reply submitted successfully!', 'success');
        this.fetchQueries();
        this.replyText[queryId] = '';
        
        // Simulating sending SMS to the mobile number (not implemented for real in this demo)
        console.log(`Sending SMS to ${mobileStr}: ${reply}`);
      },
      error: (err) => {
        console.error('Failed to send reply', err);
        this.showToast('Failed to send reply', 'error');
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
