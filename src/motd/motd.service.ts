import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { MotdDto } from "./dto/motd.dto";
import { Motd } from "./motd.model";

@Injectable()
export class MotdService {
  private logger: Logger = new Logger(MotdService.name);
  private motd = new Motd("");

  getMessage() {
    return this.motd;
  }

  createMessage(motdDto: MotdDto) {
    if (!this.motd.isEmpty()) {
      throw new BadRequestException("Message already exists!");
    }
    const { message } = motdDto;
    this.motd.message = message;
    this.logger.debug("Message created.");

    return this.motd;
  }

  updateMessage(motdDto: MotdDto) {
    if (this.motd.isEmpty()) {
      throw new BadRequestException(
        "Message doesn't exists. Create one first!",
      );
    }
    const { message } = motdDto;
    this.motd.message = message;
    this.logger.debug("Message updated.");

    return this.motd;
  }

  deleteMessage() {
    if (this.motd.isEmpty()) {
      throw new BadRequestException(
        "Message doesn't exists. Create one first!",
      );
    }
    this.motd.message = "";
    this.logger.debug("Message deleted.");
  }
}
