import { NextApiRequest, NextApiResponse } from "next";
import { handleRes } from "../../../libs/middleware/response";
const db = require("../../../libs/db/models");

const Province = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const province = await db.provinces.findAll({
          attributes: ["id", "name"],
        });

        const message = [
          { type: "success", message: "Success get data province" },
        ];

        handleRes(200, message, province, res);
      } catch (error) {
        res.status(400).json(error);
        res.end();
      }
      break;
    default:
      break;
  }
};

module.exports = Province;
