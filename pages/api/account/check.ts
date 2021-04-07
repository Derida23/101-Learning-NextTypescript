import Cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

import { verifyToken } from "../../../libs/middleware/utils";

export default function Handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      let bearerToken: string;
      if (req.headers.token) {
        bearerToken = req.headers.token.toString();
      } else {
        bearerToken = "";
      }
      const cookies = Cookie.parse(req.headers.cookie ?? "");

      let token = "";

      if (cookies.token) {
        token = cookies.token;
      } else if (bearerToken.indexOf("undefined") == -1) {
        token = bearerToken;
      }

      if (token) {
        const tokenData = verifyToken(token.replace("Bearer ", ""));
        // console.log(tokenData);
        if (!tokenData) {
          res.status(403).end();
          return;
        }
        res.json(tokenData);
      } else {
        res.status(403).end();
      }
    } else {
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
