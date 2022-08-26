export class User {
  username: string;
  password: string;

  constructor({ username, password }: User) {
    this.username = username;
    this.password = password;
  }
}
