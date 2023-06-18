import dotenv from "dotenv";
dotenv.config();
import "vite/modulepreload-polyfill";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import api from "./api";
import errorHandler from "./middleware/errorHandler";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.VITE) {
  const frontendFiles = process.cwd() + "/dist";
  console.log(frontendFiles);
  app.use(express.static("dist"));
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}
app.use(express.static(path.join(__dirname, "..", "dist", "assets")));

app.use("/api", api);

app.use(errorHandler);
