import { NextApiResponse } from "next";

export class ValidationError extends Error {
  constructor(message: any, res: NextApiResponse) {
    super(message);
    this.name = "error";
    this.message = message;
    res.status(400);
  }
  toJSON() {
    return {
      status: this.name,
      message: JSON.parse(this.message),
      data: null,
    };
  }
}
export class PermissionError extends Error {
  constructor(message: any, res: NextApiResponse) {
    super(message);
    this.name = "AuthError";
    this.message = message;
    res.status(401);
  }
  toJSON() {
    return {
      status: this.name,
      message: JSON.parse(this.message),
      data: null,
    };
  }
}
export class DatabaseError extends Error {
  constructor(message: any) {
    super(message);
    this.name = "DatabaseError";
    this.message = message;
  }
}
module.exports = {
  ValidationError,
  PermissionError,
  DatabaseError,
};
