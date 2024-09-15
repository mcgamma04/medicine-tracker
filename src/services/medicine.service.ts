import { Medicine } from "@prisma/client";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";

export interface medicineService{
    //add medicine
    addMedicine(data:CreateMedicineDTO):Promise<Medicine>

}