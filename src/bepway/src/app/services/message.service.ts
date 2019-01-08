import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message = "";
  public classes = "";

  public add(message: string, classes?: string) {
    if (message && message.length === 0) this.clear();
    else {
      this.message = message;
      if (classes && classes.length !== 0) {
        this.classes = classes;
      } else this.classes = "";
    }
  }

  public clear() {
    this.message = "";
    this.classes = "";
  }
}
