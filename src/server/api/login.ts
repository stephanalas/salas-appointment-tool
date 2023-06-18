import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/primsa";
import bcrypt from "bcrypt";
const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    console.log(req);
    const { email, password } = req.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect email & password combination");
    }
    // use exp eventually to expire token
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      })
      .status(200)
      .json({ user, token });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
