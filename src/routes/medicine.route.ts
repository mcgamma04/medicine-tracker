import express from "express";
import { MedicineController } from "../controllers/medicine.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
const medicineRouter = express.Router();

const medicineController = new MedicineController();

medicineRouter.post("/", authenticateUser, medicineController.createMedicine);
medicineRouter.get("/", medicineController.list);
medicineRouter.get(
  "/:id",
  authenticateUser,
  medicineController.getMedicineById
);
medicineRouter.post("/verification-code", medicineController.getMedicineByCode);

export default medicineRouter;
