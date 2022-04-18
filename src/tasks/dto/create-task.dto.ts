import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @MaxLength(40)
  description: string;
}
