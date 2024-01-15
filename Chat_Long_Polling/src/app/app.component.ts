import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DxButtonModule,
    DxTextBoxModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);

  messages: string[] = [];
  newMessage = '';
  uniqueId = '';
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });

  ngOnInit() {
    this.pollForMessages();
    this.uniqueId = Math.random().toString(36).substr(2, 9);
  }

  pollForMessages() {
    firstValueFrom(
      this.http.get<any>('http://localhost:3000/messages', {
        headers: this.headers,
      })
    )
      .then((res) => {
        this.messages = this.messages.concat(res.messages);
        this.pollForMessages();
      })
      .catch((err) => {
        // Cuando ocurre un timeout
        if (err.status == 502) {
          this.pollForMessages();
        } else {
          alert('Se ha producido un error');
          this.pollForMessages();
        }
      });
  }

  sendMessage() {
    if (this.newMessage) {
      this.http
        .post('http://localhost:3000/sendMessage', {
          message: this.newMessage,
        })
        .subscribe((res) => {});
    }
  }
}
