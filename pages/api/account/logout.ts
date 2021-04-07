import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            secure: "development".toString().indexOf("development") == -1,
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
          })
        );
        res.statusCode = 200;
        res.json({ success: true });
        break;
      case "PUT":
        break;
      case "PATCH":
        break;
    }
  } catch (error) {
    res.status(400).json(error);
    res.end();
  }
};

export default Logout;
