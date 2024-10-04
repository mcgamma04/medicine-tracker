import express from "express";
import { MedicineController } from "../controllers/medicine.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import isAdmin from "../middlewares/isAdmin.middleware";
import { validationMiddleware } from "../middlewares/validationMiddleware.middleware";
import { CreateMedicineDTO } from "../dtos/createMedicine.dto";
import { SearchDTO } from "../dtos/medicineSearch.dto";
const medicineRouter = express.Router();

const medicineController = new MedicineController();

medicineRouter.post(
  "/",
  validationMiddleware(CreateMedicineDTO),
  authenticateUser,
  medicineController.createMedicine
);
medicineRouter.get("/", authenticateUser, isAdmin, medicineController.list);

medicineRouter.get(
  "/:id",
  authenticateUser,
  medicineController.getMedicineById
);
medicineRouter.post(
  "/verification-code",
  validationMiddleware(SearchDTO),
  medicineController.getMedicineByCode
);
medicineRouter.get(
  "/drugs/manufacturer",
  authenticateUser,
  medicineController.getMedicineByCreatedByUser
);
medicineRouter.delete(
  "/drugs/:id",
  authenticateUser,
  medicineController.deleteMedicine
);
export default medicineRouter;
