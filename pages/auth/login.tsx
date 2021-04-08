import React, { useState } from "react";
import AuthLogin from "../../components/Auth/AuthLogin";
import Layout from "../../components/Layout";
import Router from "next/router";
import axios from "axios";
type LoginSubmit = {
  user: string;
  password: string;
};

const initialData: LoginSubmit = {
  user: "",
  password: "",
};

const Login: React.FunctionComponent = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataLogin, setDataLogin] = useState<LoginSubmit>(initialData);
  const [dataError, setDataError] = useState<any>(null);

  const handleChange = (e: any) => {
    setDataError(null);
    const { name, value } = e.currentTarget;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const resp = await axios.post(
        "http://localhost:3000/api/account/login",
        dataLogin
      );

      if (resp.status === 200) Router.push("/");

      handleReset();
    } catch (e) {
      setDataError(e.response.data.message);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLoading(false);
    setDataLogin(initialData);
  };

  return (
    <>
      <Layout title="Login Page | Test Vascomm">
        <AuthLogin props={{ handleChange, handleSave, loading, dataError }} />
      </Layout>
    </>
  );
};

export default Login;
