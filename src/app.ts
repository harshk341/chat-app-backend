import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./services/db";

import authRoutes from "./routes/auth.routes";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send("API Working");
});

connect().then(() => {
  app.listen(PORT || 5000, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
