import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  @Input()
  isSuccess;

  constructor(private messageService: MessageService) { }

  hasMessage() {
    return this.messageService.hasMessage();
  }

  clear() {
    this.messageService.clear();
  }

  get message() {
    return this.messageService.message;
  }
}
