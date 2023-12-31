import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/primsa.ts";
import bcrypt from "bcrypt";

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY!
    );
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(new Date().getTime() + 60 * 60000),
      })
      .status(200)
      .json({ user });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
