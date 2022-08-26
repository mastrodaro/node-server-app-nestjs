import { User } from "../auth/model/user.model";
import { Exclude } from "class-transformer";

export class Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;

  // for ClassSerializerInterceptor that modifies class (@Exclude, @Expose, @Transform)
  // need to create class instance (with `new`), not plain object
  @Exclude({ toPlainOnly: true })
  owner: User;

  constructor({ id, name, description, status, owner }: Task) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.owner = owner;
  }
}

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}
