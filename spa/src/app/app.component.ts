import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chat';
  public enterName = true;
  public userName;
  public message = '';
  public arrayMessages: any = [];
  public showEmojiPicker = false;
  public set = 'apple';
  @ViewChild('chatWindow') window: ElementRef;

  constructor(private socket: Socket) {}

  ngOnInit() {
    this.getMessages();
    if ('Notification' in window) {
      Notification.requestPermission().then((result) => {
        console.log(result);
      });
    }
  }

  confirmUserName() {
    if (this.userName) {
      this.enterName = false;
    }
    this.socket.emit('clientConnect', this.userName);
  }

  getMessages() {
    this.socket.fromEvent('chat').subscribe((message) => {
      this.arrayMessages.push(message);
      this.scrollChatWindow();
      this.notifyNewMessage(message);
    });
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event) {
    let string = this.message;
    let text = `${string} ${event.emoji.native}`;
    this.message = text;
  }

  sendMessage() {
    this.socket.emit('chat', this.message);
    this.message = '';
    this.showEmojiPicker = false;
  }

  scrollChatWindow() {
    this.window.nativeElement.scroll(0, this.window.nativeElement.scrollHeight);
  }

  notifyNewMessage(message) {
    if ('Notification' in window && message.name != this.userName) {
      let notification = new Notification('Tienes un nuevo mensaje');
    }
  }
}
