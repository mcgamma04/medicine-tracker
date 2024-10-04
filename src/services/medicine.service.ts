import { Medicine } from "@prisma/client";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";
import { MedicineResponseDTO, SearchDTO } from "../dtos/medicineSearch.dto";
import { UpdateMedicineDTO } from "../dtos/updateMedicine.dto";

export interface medicineService {
  //add medicine
  addMedicine(data: CreateMedicineDTO): Promise<Medicine>;
  //get all medicines
  getAllMedicines(): Promise<Medicine[]>;
  //get medicine by id
  getMedicineById(id: number): Promise<Medicine | null>;
  //get by verification code
  getMedicineByCode(data: SearchDTO): Promise<MedicineResponseDTO | null>;
  //get all medicine created by certain manufacturer
  medicineByManufacturer(user_id:number):Promise<Medicine[] | null>;
  //delete medicine
  deleteMedicine(id: number, user_id:number): Promise<void>;
  updateMedicine(id: number, dto: UpdateMedicineDTO, userId: number): Promise<void>;
}
