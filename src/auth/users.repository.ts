import { Injectable } from "@nestjs/common";
import { User } from "./model/user.model";

@Injectable()
export class UsersRepository {
  private users: User[] = [new User({ username: "admin", password: "admin" })];

  findByName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  findByNameAndPassword(username: string, password: string) {
    return this.users.find(
      (user) => user.username == username && user.password === password,
    );
  }
}
