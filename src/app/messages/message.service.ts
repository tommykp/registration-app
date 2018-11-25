import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public message: string = "";

  public clear() {
    this.message = "";
  }

  public add(newMessage: string) {
    this.message = newMessage;
  }

  public hasMessage() {
    return this.message !== "";
  }
}
