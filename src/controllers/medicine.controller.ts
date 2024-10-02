import { NextFunction, Request, Response } from "express";
import { MedicineServiceImpl } from "../services/serviceImpl/medicineServiceImpl";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";
import { SearchDTO } from "../dtos/medicineSearch.dto";
import { CustomRequest } from "../middlewares/auth.middleware";

export class MedicineController {
  private medicineService: MedicineServiceImpl;
  constructor() {
    this.medicineService = new MedicineServiceImpl();
  }

  public createMedicine = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createMedicine: CreateMedicineDTO = req.body;
      const result = await this.medicineService.addMedicine(createMedicine);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await this.medicineService.getAllMedicines();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMedicineById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.medicineService.getMedicineById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMedicineByCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const code: SearchDTO = req.body;
      const result = await this.medicineService.getMedicineByCode(code);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getMedicineByCreatedByUser = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user_id = req.userAuth;
      const result = await this.medicineService.getMedicineById(Number(user_id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
