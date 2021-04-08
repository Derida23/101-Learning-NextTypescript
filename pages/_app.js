import "../styles/antd.less";
import "../styles/global.scss";

import Router from "next/router";

import Cookies from "js-cookie";
import axios from "axios";
import Cookie from "cookie";
import { verifyToken } from "../libs/middleware/utils";

function MyApp({ Component, pageProps, user }) {
  return <Component {...pageProps} user={user} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let userdata = null;

  if (ctx.req) {
    try {
      const cookies = Cookie.parse(ctx.req.headers?.cookie ?? "");
      const tokenData = verifyToken(
        (cookies.token ?? "").replace("Bearer ", "")
      );
      userdata = tokenData;
    } catch (error) {}
  } else {
    const cookies = Cookies.get();
    axios.interceptors.request.use(
      (config) => {
        if (config) config.headers.token = cookies.token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    try {
      // Setup url with env
      const resp = await axios.get("http://localhost:3000/api/account/check", {
        headers: {
          token: cookies.token,
        },
      });
      if (resp.status === 200) {
        userdata = resp.data;
      } else {
        userdata = null;
      }
    } catch (error) {
      if (error.response && error.response.status == 403) {
        /** Redirect to login */
      }
    }
  }

  let checkUrl = ctx.pathname.split("/");
  const redirectToHome = () =>
    typeof ctx.req === "undefined"
      ? Router.push("/")
      : ctx.res.writeHead(302, { Location: "/" }).end();

  if (checkUrl[1] === "people" && !userdata) {
    redirectToHome();
  }

  if (checkUrl[1] === "auth" && userdata) {
    redirectToHome();
  }

  return { pageProps, user: userdata };
};

export default MyApp;
