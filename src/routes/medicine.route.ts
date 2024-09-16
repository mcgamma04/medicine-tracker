import express from "express";
import { UserAuthController } from "../controllers/userAuth.comtroller";
import { MedicineController } from "../controllers/medicine.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
const medicineRouter = express.Router();

const medicineController = new MedicineController();

medicineRouter.post("/",authenticateUser, medicineController.createMedicine);

export default medicineRouter;