import { ValidationError } from "./../../../libs/middleware/error";
import { NextApiRequest, NextApiResponse } from "next";
import { handleRes } from "../../../libs/middleware/response";

const db = require("../../../libs/db/models");

const PeopleID = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;
  const userid: number = +id;

  switch (method) {
    case "GET":
      try {
        const response = await db.users.findByPk(userid, {
          include: [
            {
              model: db.provinces,
              association: "address_province",
              attributes: ["id", "name"],
            },
            {
              model: db.regencies,
              association: "address_city",
              attributes: ["id", "name"],
            },
            {
              model: db.districts,
              association: "address_district",
              attributes: ["id", "name"],
            },
          ],
        });

        const message = [
          { type: "success", message: "Success get data user id" },
        ];

        if (response) {
          handleRes(200, message, response, res);
        } else {
          throw new ValidationError(
            JSON.stringify([
              {
                type: "user",
                message: "User not exist",
              },
            ]),
            res
          );
        }
      } catch (e) {
        res.status(400).json(e);
        res.end();
      }
      break;

    default:
      break;
  }
};

export default PeopleID;
