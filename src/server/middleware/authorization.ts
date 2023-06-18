import { RequestHandler } from "express";
// import jwt from "jsonwebtoken";

export const authorization: RequestHandler = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    // const data = await jwt.verify(token, process.env.SECRET_KEY!);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
