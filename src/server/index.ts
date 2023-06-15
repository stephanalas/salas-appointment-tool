import dotenv from "dotenv";
dotenv.config();
import "vite/modulepreload-polyfill";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
if (!process.env["VITE"]) {
  const frontendFiles = process.cwd() + "/dist";
  console.log(frontendFiles);
  app.use(express.static("public"));
  app.use(express.static(frontendFiles));
  app.get("/*", (_, res) => {
    res.send(frontendFiles + "/index.html");
  });
  app.listen(process.env["PORT"]);
}

app.use(express.static(path.join(__dirname, "..", "public", "assets")));

app.get("/api/test", (_, res) => res.json({ greeting: "Hello" }));

const init = async () => {
  try {
    // await seed();
  } catch (error) {
    console.log(error);
  }
};
init();
