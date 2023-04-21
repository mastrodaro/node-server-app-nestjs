import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { MotdService } from "./motd.service";
import { MotdDto } from "./dto/motd.dto";

@Controller("motd")
export class MotdController {
  constructor(private motdService: MotdService) {}

  @Get()
  getMotd() {
    return this.motdService.getMessage();
  }

  @Post()
  createMotd(@Body() motdDto: MotdDto) {
    return this.motdService.createMessage(motdDto);
  }

  @Patch()
  updateMotd(@Body() motdDto: MotdDto) {
    return this.motdService.updateMessage(motdDto);
  }

  @Delete()
  deleteMotd() {
    this.motdService.deleteMessage();
  }
}
