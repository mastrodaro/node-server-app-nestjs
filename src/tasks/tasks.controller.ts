import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto) {
    if (Object.keys(getTasksFilterDto).length) {
      return this.taskService.findTasks(getTasksFilterDto);
    } else {
      return this.taskService.getTasks();
    }
  }

  @Get(":id")
  getTask(@Param("id") id: string) {
    return this.taskService.getTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string) {
    this.taskService.deleteTask(id);
  }
}
