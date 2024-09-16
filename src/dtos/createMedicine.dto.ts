import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RecordIsInDb } from "../utils/decorators/record_in_db.decorator";

export class CreateMedicineDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  verificationCode: string;
  @IsNotEmpty()
  @IsNumber()
  @RecordIsInDb("user.id")
  user_id: number;

  constructor(
    name: string,
    description: string,
    verificationCode: string,
    user_id: number
  ) {
    this.name = name;
    this.description = description;
    this.verificationCode = verificationCode;
    this.user_id = user_id;
  }
}
