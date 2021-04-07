import { NextApiRequest, NextApiResponse } from "next";
const db = require("../../../../../libs/db/models");

const fs = require("fs");
const Formidable = require("formidable-serverless");

export const config = {
  api: {
    bodyParser: false,
  },
};

type typeUsersData = {
  id?: Number;
  username?: String;
};

const UploadProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const { userId } = query;
  let usersData: typeUsersData = {};

  //**  Get User Data */

  try {
    const user = await db.users.findByPk(userId);
    usersData = { id: user.id, username: user.username };
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Foto profil gagal untuk di upload",
    });
  }

  //upload document
  let path = "./public/profile_images";

  // upload document
  const form = new Formidable.IncomingForm();
  form.uploadDir = path;
  form.keepExtensions = true;
  form.parse(req, function (err: any, fields: any, files: any) {
    if (err) {
      throw new Error(err);
    }

    let filename = usersData.username + "-" + new Date().getTime();
    let oldpath = files.profile.path;
    let newpath = path + "/" + filename;

    fs.rename(oldpath, newpath, async function (err: any) {
      if (err) {
        res.status(400).send({
          status: 400,
          message: "Foto Profil gagal untuk di upload",
        });
      }

      // update usersData
      if (!err) {
        try {
          await db.users.update(
            {
              profile_photo: filename,
            },
            {
              where: {
                id: userId,
              },
            }
          );
          res.status(200).send({
            status: 200,
            message: "Berhasil upload foto profil",
          });
        } catch (e) {
          res.status(400).send({
            status: 400,
            message: "Foto profil gagal untuk di upload",
          });
        }

        res.end();
      }
    });
  });
};

export default UploadProfile;
