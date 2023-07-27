import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "./prisma/primsa.ts";
interface Payload extends JwtPayload {
  id: number;
  email: string;
}

export const getUser = async (req: Request) => {
  const token = req.cookies.access_token;

  const { id } = (await jwt.verify(token, process.env.SECRET_KEY!)) as Payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return user;
};
