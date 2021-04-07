import axios from "axios";
import jwt from "jsonwebtoken";
// import Cookies from "js-cookie";
import { NextApiRequest } from "next";
import Router from "next/router";

const SECRET_KEY =
  "/1~R&E[$wQf:Kh&}ZXb=b{,G/E(-dxy:L%t.tD'f%QeJ)LLmD+gX8@cQd.?FG]D";

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */

export function verifyToken(jwtToken: any) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (error) {
    // console.log(error);
    return null;
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */

// export function getAppCookies(req: NextApiRequest) {
//   const parsedItems: any = { token: null };
//   if (req && req.headers) {
//     if (req.headers.cookie) {
//       const cookiesItems = req.headers.cookie.split("; ");
//       cookiesItems.forEach((cookies) => {
//         const parsedItem = cookies.split("=");
//         parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
//       });
//     }
//   } else {
//     Object.fromEntries(
//       document.cookie.split(/; */).map((c) => {
//         const [key, v] = c.split("=", 2);
//         return [key, decodeURIComponent(v)];
//       })
//     );
//   }

//   // add new
//   const token = parsedItems.token;
//   const profile = verifyToken(token ? parsedItems.token.split(" ")[1] : "");

//   return { token, profile };
// }

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */

export function absoluteUrl(req: NextApiRequest, setLocalhost: any) {
  var protocol = "https:";
  var host: any = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
    url: req,
  };
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */

export async function setLogout() {
  const resp = await axios.post("localhost/api/account/logout");
  if (resp.data.success) {
    Router.reload();
  }
}
