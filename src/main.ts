import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const logger: Logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = configService.get("APP_PORT");
  await app.listen(port);
  logger.log(`Application started on port ${port}`);
}
bootstrap();
