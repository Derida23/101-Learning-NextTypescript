import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "../middleware/error";

interface AuthError {
  type: string;
  message: string;
}

export async function ValidateLogin(req: NextApiRequest, res: NextApiResponse) {
  const errors: AuthError[] = [];

  if (!req.body.password) {
    errors.push({ type: "password", message: "password can't empty" });
  }

  if (!req.body.user) {
    errors.push({ type: "user", message: "username or email can't empty" });
  }

  //Throw All Error//Throw All Error
  if (errors.length > 0) {
    throw new ValidationError(JSON.stringify(errors), res);
  }
}
