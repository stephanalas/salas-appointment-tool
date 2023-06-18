import { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log(`Caught by custom error Handler\n
    Error: ${err.message}`);
  const error = {
    message: err.message,
    status: 400,
  };
  // edit error message based on received error type here

  res.status(error.status).send({ message: err.message, error: true });
};

export default errorHandler;
