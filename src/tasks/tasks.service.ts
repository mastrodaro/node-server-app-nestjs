import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  getTask(id: string) {
    const task = this.tasks.find((t) => t.id === id);
    if (task === undefined) {
      throw new NotFoundException(`Task with id=${id} was not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { name, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      name,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTask(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string) {
    const task = this.getTask(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
  }

  findTasks(getTasksFilterDto: GetTasksFilterDto) {
    const { search, status } = getTasksFilterDto;

    let tasks = this.getTasks();

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
