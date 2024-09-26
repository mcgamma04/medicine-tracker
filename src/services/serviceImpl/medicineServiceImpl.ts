import { Medicine } from "@prisma/client";
import { CreateMedicineDTO } from "../../dtos/createMedicine.dto";
import { medicineService } from "../medicine.service";
import { db } from "../../config/db";
import { MedicineResponseDTO, SearchDTO } from "../../dtos/medicineSearch.dto";
import { CustomError } from "../../exceptions/customError.error";

export class MedicineServiceImpl implements medicineService {
  async getAllMedicines(): Promise<Medicine[]> {
    //! TODO implement with pagination
    return await db.medicine.findMany();
  }
  async addMedicine(data: CreateMedicineDTO): Promise<Medicine> {
    const user = await db.user.findUnique({
      where: {
        id: data.user_id,
      },
    });
    if (!user) {
      throw new CustomError(404, "User with " + data.user_id + " not found");
    }

    const medicine = await db.medicine.create({
      data: {
        name: data.name,
        description: data.description,
        verificationCode: generateVerificationCode(),
        manufactureDate: data.manufactureDate,
        expirationDate: data.expirationDate,
        user: {
          connect: {
            id: data.user_id,
          },
        },
      },
    });
    return medicine;
  }
  async getMedicineById(id: number): Promise<Medicine | null> {
    const medicine = await db.medicine.findUnique({
      where: {
        id,
      },
    });
    if (!medicine) {
      throw new CustomError(
        404,
        "medicine with id " + id + " not found"
      );
    }
    return medicine;
  }

  async getMedicineByCode(
    data: SearchDTO
  ): Promise<MedicineResponseDTO | null> {
    const medicine = await db.medicine.findUnique({
      where: {
        verificationCode: data.code,
      },
    });
    if (!medicine) {
      throw new CustomError(
        404,
        "sorry, the verification code is wrong and cannot be verified"
      );
    }
    const manufactureName = await db.user.findFirst({
      where: {
        id: medicine.userId,
      },
    });

    if (!manufactureName) {
      throw new CustomError(404, "We cannot find a manufacturer for the medicine");
    }
    // return response that match dto
    return {
      name: medicine.name,
      description: medicine.description,
      manufactureName: manufactureName.name,
      verificationCode: medicine.verificationCode,
      manufactureDate: medicine.manufactureDate,
      expirationDate: medicine.expirationDate,
    };
  }
}

function generateVerificationCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  // Generate a 6-character random alphanumeric code
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  // Optionally, append a timestamp for further uniqueness (e.g., last 4 digits of the current time in milliseconds)
  const timestamp = Date.now().toString().slice(-4);

  // Combine the random code with the timestamp
  return `${code}-${timestamp}`;
}
