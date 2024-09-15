import { NextFunction,Request,Response } from "express";
import { MedicineServiceImpl } from "../services/serviceImpl/medicineServiceImpl";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";

export class MedicineController {
    private medicineService!: MedicineServiceImpl;
  
  
    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
            const createMedicine:CreateMedicineDTO = req.body;
            const result = await this.medicineService.addMedicine(createMedicine);
            res.status(201).json(result);

        }catch(error){
       next(error)
        }  
  
}
}
