import { NextApiResponse } from "next";

type ResData = {
  type: string;
  message: string;
};

export const handleRes = (
  code: number,
  message: ResData[],
  data: any,
  res: NextApiResponse
) => {
  res.status(code).json({
    status: code !== 200 ? "error" : "success",
    message,
    data,
  });
  res.end;
};
