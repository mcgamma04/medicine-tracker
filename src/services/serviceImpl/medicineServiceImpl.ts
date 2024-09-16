import { Medicine } from "@prisma/client";
import { CreateMedicineDTO } from "../../dtos/createMedicine.dto";
import { medicineService } from "../medicine.service";
import { db } from "../../config/db";

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
      throw new Error("User with " + data.user_id + " not found");
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
      throw new Error(`medicine with id ${id} not found`);
    }
    return medicine;
  }

  getMedicineByCode(code: string): Promise<Medicine | null> {
    const 
    throw new Error("Method not implemented.");
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
