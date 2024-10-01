import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authRouter from "./routes/auth.route";
import medicineRouter from "./routes/medicine.route";
import { errorHandler } from "./utils/errorHandler.util";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger";

dotenv.config();

const portEnv = process.env.PORT;
if (!portEnv) {
  console.error("Error: PORT is not defined in .env file");
  process.exit(1);
}

const PORT: number = parseInt(portEnv, 10);
if (isNaN(PORT)) {
  console.error("Error: PORT is not a number in .env file");
  process.exit(1);
}

const app = express();
const corsOptions = {
  origin: "*", /*! TODO Allow requests from all origins (adjust for production) */
  credentials: true, 
  allowedHeaders: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
};
app.use(cors(corsOptions));

app.use(express.json());
// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/medicine", medicineRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Swagger docs available at http://localhost:3010/api-docs");
});
