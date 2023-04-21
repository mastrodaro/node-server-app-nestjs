import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configSchema } from "../config.schema";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { MotdModule } from "./motd/motd.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.STAGE}`],
      validationSchema: configSchema,
    }),
    AuthModule,
    MotdModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
