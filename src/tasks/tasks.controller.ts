import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/getUser.decorator";
import { User } from "../auth/model/user.model";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger: Logger = new Logger(TasksController.name);

  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query() getTasksFilterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    if (Object.keys(getTasksFilterDto).length) {
      return this.taskService.findTasks(getTasksFilterDto, user);
    } else {
      return this.taskService.getTasks(user);
    }
  }

  @Get(":id")
  getTask(@Param("id") id: string, @GetUser() user: User) {
    return this.taskService.getTask(id, user);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    this.logger.debug(`User ${user.username} creating task.`);
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ) {
    const { status } = updateTaskStatusDto;
    this.logger.debug(`User ${user.username} updating task.`);
    return this.taskService.updateTaskStatus(id, status, user);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string, @GetUser() user: User) {
    this.logger.debug(`User ${user.username} deleting task.`);
    this.taskService.deleteTask(id, user);
  }
}
