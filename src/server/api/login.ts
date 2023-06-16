import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/primsa";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const loginRouter = Router();

loginRouter.post("/login", async (req, res, next) => {
  const { email } = req.body;
  try {
    const getUser: object | PrismaClientKnownRequestError =
      await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

    // use exp eventually to expire token
    const token = jwt.sign({ email }, process.env.SECRET_KEY!);

    res.send({ token });
  } catch (error) {
    next(error);
  }
});
