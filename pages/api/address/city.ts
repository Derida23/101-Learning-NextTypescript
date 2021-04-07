import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import { handleRes } from "../../../libs/middleware/response";
const db = require("../../../libs/db/models");

const City = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const province_id: number = +req.query.province_id;

  switch (method) {
    case "GET":
      try {
        const city = await db.regencies.findAll({
          where: {
            province_id: province_id ? province_id : { [Op.like]: "%%" },
          },
        });

        const message = [{ type: "success", message: "Success get data city" }];

        handleRes(200, message, city, res);
      } catch (error) {
        res.status(400).json(error);
        res.end();
      }
      break;
    default:
      break;
  }
};

module.exports = City;
