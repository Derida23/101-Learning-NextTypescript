import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import { handleRes } from "../../../libs/middleware/response";
const db = require("../../../libs/db/models");

const District = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const regency_id: number = +req.query.regency_id;

  switch (method) {
    case "GET":
      try {
        const district = await db.districts.findAll({
          where: {
            regency_id: regency_id ? regency_id : { [Op.like]: "%%" },
          },
        });

        const message = [
          { type: "success", message: "Success get data district" },
        ];

        handleRes(200, message, district, res);
      } catch (error) {
        res.status(400).json(error);
        res.end();
      }
      break;
    default:
      break;
  }
};

module.exports = District;
