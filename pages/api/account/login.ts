import bcrypt from "bcryptjs";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";
import { ValidationError } from "../../../libs/middleware/error";
import { ValidateLogin } from "../../../libs/validator/ValidateLogin";

const db = require("../../../libs/db/models");
const KEY: string =
  "/1~R&E[$wQf:Kh&}ZXb=b{,G/E(-dxy:L%t.tD'f%QeJ)LLmD+gX8@cQd.?FG]D"; // this key must be inner env mode

type AuthError = {
  type: string;
  message: string;
};

type Payload = {
  id: Number;
  username: String;
  login_type: String;
  profile_photo: String;
  firstname: String;
  lastname: String;
  middlename: String;
  email: String;
  phone: String;
  addr_province_code: String;
  addr_province_name: String;
  addr_province_id: String;
  addr_city_code: String;
  addr_city_name: String;
  addr_city_id: String;
  addr_district_code: String;
  addr_district_name: String;
  addr_district_id: String;
  address_main: String;
  date_of_birth: String;
  gender: String;
  seller_id: String;
  verification_status: String;
  role: String;
  status: String;
};

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  // return new Promise( async (resolve: any) => {
  const { method } = req;

  switch (method) {
    case "POST":
      // Get Req Data         ----->
      const { user, password } = req.body;

      try {
        await ValidateLogin(req, res);

        // Check account exist ------>
        const dataUser = await db.users.findOne({
          where: {
            [Op.or]: [{ username: user }, { email: user }],
          },
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

        if (!dataUser) {
          const message: AuthError[] = [
            {
              type: "account",
              message:
                "maaf, kami tidak dapat menemukan akun dengan nama pengguna atau email tersebut.",
            },
          ];
          throw new ValidationError(JSON.stringify(message), res);
        } else {
          // Define Variable ------>
          const userId: Number = dataUser.id,
            userPassword: any = dataUser.password,
            userUsername: String = dataUser.username,
            userLoginType: String = dataUser.login_type,
            userPhoto: String = dataUser.profile_photo,
            userFirstname: String = dataUser.firstname,
            userLastname: String = dataUser.lastname,
            userMiddlename: String = dataUser.middlename,
            userEmail: String = dataUser.email,
            userPhone: String = dataUser.phone,
            userProvince: String = dataUser.addr_province_code,
            userProvinceName: String = dataUser?.address_province?.name ?? "",
            userProvinceId: String = dataUser?.address_province?.id ?? "",
            userCity: String = dataUser.addr_city_code,
            userCityName: String = dataUser?.address_city?.name ?? "",
            userCityId: String = dataUser?.address_city?.id ?? "",
            userDisctrict: String = dataUser.addr_district_code,
            userDisctrictName: String = dataUser?.address_district?.name ?? "",
            userDisctrictId: String = dataUser?.address_district?.id ?? "",
            userAddress: String = dataUser.address_main,
            userBirth: String = dataUser.date_of_birth,
            userGender: String = dataUser.gender,
            userSeller: String = dataUser.seller_id,
            userVerification: String = dataUser.verification_status;
          const userRole: String = dataUser.role;
          const userStatus: String = dataUser.status;

          // Comparing Password --->
          await bcrypt
            .compare(password, userPassword)
            .then((isMatch: Boolean) => {
              if (isMatch) {
                const payload: Payload = {
                  id: userId,
                  username: userUsername,
                  login_type: userLoginType,
                  profile_photo: userPhoto,
                  firstname: userFirstname,
                  lastname: userLastname,
                  middlename: userMiddlename,
                  email: userEmail,
                  phone: userPhone,
                  addr_province_code: userProvince,
                  addr_province_id: userProvinceId,
                  addr_province_name: userProvinceName,
                  addr_city_code: userCity,
                  addr_city_name: userCityName,
                  addr_city_id: userCityId,
                  addr_district_code: userDisctrict,
                  addr_district_name: userDisctrictName,
                  addr_district_id: userDisctrictId,
                  address_main: userAddress,
                  date_of_birth: userBirth,
                  gender: userGender,
                  seller_id: userSeller,
                  verification_status: userVerification,
                  role: userRole,
                  status: userStatus,
                };

                jwt.sign(
                  payload,
                  KEY,
                  {
                    expiresIn: 31556926, // 1 year in seconds
                  },
                  (err: any, token: any) => {
                    const message: AuthError[] = [
                      { type: "account", message: "you're ready to continue" },
                    ];
                    // handleRes(200, message, "Bearer " + token, res)
                    res.setHeader(
                      "Set-Cookie",
                      cookie.serialize("token", "Bearer " + token, {
                        httpOnly: true,
                        secure:
                          "development".toString().indexOf("development") == -1,
                        maxAge: 31557600,
                        sameSite: "strict",
                        path: "/",
                      })
                    );
                    res.statusCode = 200;
                    res.status(200).json({
                      status: "success",
                      message,
                      data: "Bearer " + token,
                    });
                  }
                );
              } else {
                const message: AuthError[] = [
                  {
                    type: "account",
                    message:
                      "maaf, password salah silahkan coba login kembali.",
                  },
                ];

                throw new ValidationError(JSON.stringify(message), res);
              }
            });
        }
      } catch (error) {
        res.status(400).json(error);
        res.end();
      }
      break;
    case "PUT":
      break;
    case "PATCH":
      break;
  }
  // return resolve();
  // })
};

export default Login;
