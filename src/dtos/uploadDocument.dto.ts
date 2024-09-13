import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from "class-validator";
import { RecordIsInDb } from "../utils/decorators/record_in_db.decorator";

export class uploadDocumentDTO {
  @Validate(RecordIsInDb, ["user.id"])
  user_id!: number;
  @IsEnum(DocumentType)
  @IsNotEmpty()
  type!: DocumentType;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  images!: string[];
}
