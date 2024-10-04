import { NextFunction, Request, Response } from "express";
import { MedicineServiceImpl } from "../services/serviceImpl/medicineServiceImpl";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";
import { SearchDTO } from "../dtos/medicineSearch.dto";
import { CustomRequest } from "../middlewares/auth.middleware";
import { CustomError } from "../exceptions/customError.error";

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
      const resultOut = await this.medicineService.medicineByManufacturer(
        Number(user_id)
      );
      res.status(200).json(resultOut);
    } catch (error) {
      next(error);
    }
  };

  //delete 
  public deleteMedicine = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction):Promise<void> => {
      try {
        const { id } = req.params;
        const user_id = req.userAuth;
        await this.medicineService.deleteMedicine(Number(id), Number(user_id));
        res.status(204).json({ message: "Medicine deleted successfully." });
      } catch (error) {
        next(error);
      }
    };
    }

