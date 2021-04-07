import { ValidationError } from "../middleware/error";
import { NextApiResponse } from "next";

type AuthError = {
  type: string;
  message: string;
};

export const ValidateUser = async (
  value: any,
  isUpdate: Boolean,
  res: NextApiResponse
) => {
  const errorsTemp: AuthError[] = [];

  if (isUpdate === false) {
    for (const property in value) {
      if (property === "password" && isUpdate === false) {
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value[property]
          )
        ) {
          errorsTemp.push({
            type: property,
            message:
              "Password harus mengandung huruf besar, kecil, karakter spesial dan minimal 6 karakter",
          });
        }
      }

      if (property === "email" && isUpdate === false) {
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value[property]
          )
        ) {
          errorsTemp.push({
            type: property,
            message: "Format email tidak sesuai dengan standar",
          });
        }
      }
    }

    if (!value.firstname) {
      errorsTemp.push({
        type: "firstname",
        message: "Tidak boleh kosong",
      });
    }

    if (!value.lastname) {
      errorsTemp.push({
        type: "lastname",
        message: "Tidak boleh kosong",
      });
    }
  }

  if (errorsTemp.length > 0)
    throw new ValidationError(JSON.stringify(errorsTemp), res);
};
