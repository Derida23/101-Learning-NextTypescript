import React from "react";
import { setLogout } from "../../libs/middleware/utils";
import { LogoutOutlined } from "@ant-design/icons";

const AuthLogout: React.ReactFragment = ({ props }: any) => {
  const { user } = props;
  return (
    <div
      style={{ marginTop: "30px", cursor: "pointer" }}
      onClick={() => {
        setLogout();
      }}
    >
      Selamat datang {user.firstname + " " + user.lastname}, untuk logout klik
      {"    "}
      <LogoutOutlined className="icon" /> Keluar{" "}
    </div>
  );
};

export default AuthLogout;
