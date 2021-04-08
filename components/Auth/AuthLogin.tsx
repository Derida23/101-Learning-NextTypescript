import React from "react";
import { Form, Input, Button, Alert } from "antd";
import Link from "next/link";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

const AuthLogin: React.FunctionComponent = ({ props }: any) => {
  const { handleChange, handleSave, loading, dataError } = props;

  return (
    <>
      {dataError
        ? dataError.length > 0
          ? dataError
              .filter((it: any) => it.type === "account")
              .map((error: any, index: number) => (
                <Alert key={index} message={error.message} type="error" />
              ))
          : null
        : null}

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        style={{ marginTop: "10px" }}
      >
        <Form.Item label="Email" name="user">
          <Input onChange={handleChange} name="user" />
          {dataError
            ? dataError.length > 0
              ? dataError
                  .filter((it: any) => it.type === "user")
                  .map((error: any, index: number) => (
                    <div key={index} style={{ color: "red" }}>
                      {error.message}
                    </div>
                  ))
              : null
            : null}
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password onChange={handleChange} name="password" />
          {dataError
            ? dataError.length > 0
              ? dataError
                  .filter((it: any) => it.type === "password")
                  .map((error: any, index: number) => (
                    <div key={index} style={{ color: "red" }}>
                      {error.message}
                    </div>
                  ))
              : null
            : null}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? "Loading" : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ width: "100%", textAlign: "center" }}>
        Belum memiliki akun ?{" "}
        <Link href="/auth/signup">
          <b style={{ cursor: "pointer" }}>Register</b>
        </Link>
      </div>
    </>
  );
};

export default AuthLogin;
