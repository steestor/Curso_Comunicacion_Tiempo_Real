import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import notify from 'devextreme/ui/notify';
import {
  DxButtonModule,
  DxTextBoxComponent,
  DxTextBoxModule,
} from 'devextreme-angular';
import { firstValueFrom } from 'rxjs';
import { avatares } from './data/avatar';

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
  @ViewChild('messageBox') messageBox!: DxTextBoxComponent;

  messages: any[] = [];
  newMessage = '';
  avatarSrc = '';
  user = '';
  urlBaseBack = 'http://localhost:3000/';

  ngOnInit() {
    this.pollForMessages();
    this.prepareVariables();
  }

  pollForMessages() {
    firstValueFrom(
      this.http.get<any>(this.urlBaseBack + 'messages', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Access-Control-Allow-Headers': '*',
        },
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
          this.toast('Se ha producido un error', 'error');
          this.pollForMessages();
        }
      });
  }

  private prepareVariables() {
    this.avatarSrc = avatares[Math.floor(Math.random() * avatares.length)];
    this.user = 'User_' + Math.floor(Math.random() * 1000);
  }

  sendMessage(e: any, messageBox: any) {
    if (this.newMessage) {
      this.http
        .post(this.urlBaseBack + 'sendMessage', {
          message: {
            avatar: this.avatarSrc,
            message: this.newMessage,
            date: new Date(),
            user: this.user,
          },
        })
        .subscribe((res) => {});
      this.messageBox.instance.reset();
    }
  }

  private toast(
    message: string,
    type: string,
    position: string = 'bottom center'
  ) {
    notify({
      message: message,
      type,
      displayTime: 5000,
      position,
      width: 'auto',
    });
  }
}
