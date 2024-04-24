import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/db.js";
import noteRouter from "./routes/roleRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`//${req.method} ${req.path} `);
  next();
});

await connect(process.env.DB_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/note", noteRouter);
