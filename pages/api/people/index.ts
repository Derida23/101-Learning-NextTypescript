import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { ValidateUser } from "../../../libs/validator/ValidateUser";
import { ValidationError } from "../../../libs/middleware/error";
import { handleRes } from "../../../libs/middleware/response";

const db = require("../../../libs/db/models");

type ResData = {
  type: string;
  message: string;
};

type Users = {
  id: number;
  username: string;
  password: string;
  firstname: string;
  middlename?: string;
  lastname?: string;
  phone?: string;
  email: string;
  updatedAt?: Date;
  createdAt?: Date;
  addr_province_code: number;
  addr_city_code: number;
  addr_district_code: number;
  address_main?: string;
  profile_photo?: string;
};

const People = async (req: NextApiRequest, res: NextApiResponse) => {
  let { method, body }: any = req;
  const hashSaltRound = 10; //this salt in ENV not show in public

  const { email, active } = req.query;
  const limit: number = +req.query.limit;
  const page: number = +req.query.page;

  switch (method) {
    case "POST":
      let hashPassword: String = bcrypt.hashSync(body.password, hashSaltRound);

      try {
        await ValidateUser(body, false, res);

        const resp = await db.users.findOne({
          where: {
            username: { [Op.like]: `%${body.username ? body.username : ""}%` },
            email: { [Op.like]: `%${body.email ? body.email : ""}%` },
          },
        });

        if (resp) {
          throw new ValidationError(
            JSON.stringify([
              {
                type: "email",
                message: "Email sudah digunakan untuk mendaftar",
              },
            ]),
            res
          );
        }

        const data: Users = {
          ...body,
          username: body.email,
          password: hashPassword,
          addr_province_code: body?.addr_province_code ?? 0,
          addr_city_code: body?.addr_city_code ?? 0,
          addr_district_code: 0,
          role: "user",
        };

        const response: Users = await db.users.create(data);

        const message = [{ type: "success", message: "Success sign up" }];
        handleRes(200, message, response, res);
      } catch (e) {
        res.status(400).json(e);
        res.end();
      }
      break;

    case "GET":
      try {
        const response = await db.users.findAndCountAll({
          distinct: true,
          where: {
            email: { [Op.like]: `%${email ? email : ""}%` },
            status: { [Op.like]: `%${active ? active : ""}%` },
          },

          limit: limit ? 5 : req.query.limit,
          offset: page ? (page - 1) * limit : 0,
        });

        const message: ResData[] = [
          {
            type: "user",
            message: "All users successfully displayed",
          },
        ];

        handleRes(200, message, response, res);
      } catch (error) {
        res.json(error);
        res.end();
      }
      break;
  }

  res.end();
};

export default People;
