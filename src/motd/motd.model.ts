export class Motd {
  message: string;

  constructor(message: string) {
    this.message = message;
  }

  isEmpty() {
    return this.message.length === 0;
  }
}
