import {
  IsDateString,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
} from "class-validator";

export class UpdateMedicineDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  verificationCode?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsDateString()
  manufactureDate?: string;

  @IsOptional()
  @IsDateString()
  expirationDate?: string;
}
