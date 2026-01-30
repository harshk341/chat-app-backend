import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
