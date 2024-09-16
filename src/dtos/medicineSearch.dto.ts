import { IsNotEmpty, IsString } from "class-validator";

export class MedicineResponseDTO {
  name!: string;
  description!: string;
  verificationCode!: string;
  manufactureDate!: Date;
  expirationDate!: Date;
  manufactureName!: string;
}

export class SearchDTO {
  @IsNotEmpty()
  @IsString()
  code!: string;
}
