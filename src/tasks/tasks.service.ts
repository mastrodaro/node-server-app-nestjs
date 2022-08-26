import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "../auth/model/user.model";

@Injectable()
export class TasksService {
  private logger: Logger = new Logger(TasksService.name);
  private tasks: Task[] = [];

  getTasks(user: User) {
    return this.tasks.filter((t) => t.owner === user);
  }

  getTask(id: string, user: User) {
    const task = this.tasks.find((t) => t.id === id && t.owner === user);
    if (task === undefined) {
      throw new NotFoundException(`Task with id=${id} was not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User) {
    const { name, description } = createTaskDto;
    const task: Task = new Task({
      id: uuid(),
      name,
      description,
      status: TaskStatus.OPEN,
      owner: user,
    });
    this.tasks.push(task);
    this.logger.debug(`Task ${task.id} created.`);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus, user: User) {
    const task = this.getTask(id, user);
    task.status = status;
    this.logger.debug(`Task ${task.id} updated to status ${status}.`);
    return task;
  }

  deleteTask(id: string, user: User) {
    const task = this.getTask(id, user);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    this.logger.debug(`Task ${task.id} deleted.`);
  }

  findTasks(getTasksFilterDto: GetTasksFilterDto, user: User) {
    const { search, status } = getTasksFilterDto;

    let tasks = this.getTasks(user);

    if (search !== undefined) {
      tasks = tasks.filter(
        (task) =>
          task.name.includes(search) || task.description.includes(search),
      );
    }

    if (status !== undefined) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }
}
