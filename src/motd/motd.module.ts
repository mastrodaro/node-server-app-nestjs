import { Module } from "@nestjs/common";
import { MotdService } from "./motd.service";
import { MotdController } from "./motd.controller";

@Module({
  controllers: [MotdController],
  providers: [MotdService],
})
export class MotdModule {}
