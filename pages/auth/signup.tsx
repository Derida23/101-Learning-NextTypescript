import React from "react";
import AuthSignup from "../../components/Auth/AuthSignup";
import Layout from "../../components/Layout";

const Signup: React.FunctionComponent = ({ props }: any) => {
  return (
    <>
      <Layout title="Signup Page | Test Vascomm">
        <AuthSignup />
      </Layout>
    </>
  );
};

export default Signup;
