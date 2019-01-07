import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
  public message = "";

  add (message: string) {
    if (message && message.length == 0) this.clear();
    else this.message = message;
  }

  clear() {
    this.message = "";
  }
}
