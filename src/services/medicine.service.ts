import { CreateMedicineDTO } from "../dtos/createMedicine.dto";

export interface medicineService{
    //add medicine
    addMedicine(data:CreateMedicineDTO):Promise<CreateMedicineDTO>

}