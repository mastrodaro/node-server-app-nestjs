import { IsNotEmpty, MaxLength } from "class-validator";

export class MotdDto {
  @IsNotEmpty()
  @MaxLength(40)
  message: string;
}
