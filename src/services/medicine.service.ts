import { Medicine } from "@prisma/client";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";
import { MedicineResponseDTO, SearchDTO } from "../dtos/medicineSearch.dto";

export interface medicineService {
  //add medicine
  addMedicine(data: CreateMedicineDTO): Promise<Medicine>;
  //get all medicines
  getAllMedicines(): Promise<Medicine[]>;
  //get medicine by id
  getMedicineById(id: number): Promise<Medicine | null>;
  //get by verification code
  getMedicineByCode(data: SearchDTO): Promise<MedicineResponseDTO | null>;
}
