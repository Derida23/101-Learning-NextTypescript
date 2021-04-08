import React from "react";
import { Form, Input, Button, Radio, DatePicker, Select } from "antd";
import Link from "next/link";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 12 },
};

const AuthSignup: React.FunctionComponent = ({ props }: any) => {
  const {
    handleChange,
    handleGender,
    handleDate,
    handleSelect,
    handleSave,
    loadingSelect,
    province,
    city,
    loading,
    dataSignUp,
    dataError,
  } = props;
  return (
    <>
      <Form {...layout} name="basic" initialValues={{ remember: true }}>
        <Form.Item label="First Name" name="firstname">
          <Input name="firstname" onChange={handleChange} />
          {dataError
            ? dataError.length > 0
              ? dataError
                  .filter((it: any) => it.type === "firstname")
                  .map((error: any, index: number) => (
                    <div key={index} style={{ color: "red" }}>
                      {error.message}
                    </div>
                  ))
              : null
            : null}
        </Form.Item>

        <Form.Item label="Last Name" name="lastname">
          <Input name="lastname" onChange={handleChange} />
          {dataError
            ? dataError.length > 0
              ? dataError
                  .filter((it: any) => it.type === "lastname")
                  .map((error: any, index: number) => (
                    <div key={index} style={{ color: "red" }}>
                      {error.message}
                    </div>
                  ))
              : null
            : null}
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input name="email" type="email" onChange={handleChange} />
          {dataError
            ? dataError.length > 0
              ? dataError
                  .filter((it: any) => it.type === "email")
                  .map((error: any, index: number) => (
                    <div key={index} style={{ color: "red" }}>
                      {error.message}
                    </div>
                  ))
              : null
            : null}
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password name="password" onChange={handleChange} />
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

        <Form.Item name="gender" label="Gender">
          <Radio.Group onChange={handleGender}>
            <Radio value="man">Laki-laki</Radio>
            <Radio value="woman">Perempuan</Radio>
            <Radio value="other">Lain-lain</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Birthday" name="date_of_birth">
          <DatePicker onChange={handleDate} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Province" name="addr_province_code">
          <Select
            placeholder="Pilih provinsi..."
            value={dataSignUp.addr_province_code}
            onChange={(value) => handleSelect(value, "addr_province_code")}
            loading={loadingSelect}
            optionFilterProp="children"
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {province.map((it: any, idx: number) => (
              <Select.Option key={idx} value={parseInt(it.id)}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="City" name="addr_city_code">
          <Select
            placeholder="Pilih kota..."
            value={
              dataSignUp.addr_city_code === 0 ? null : dataSignUp.addr_city_code
            }
            onChange={(value) => handleSelect(value, "addr_city_code")}
            loading={loadingSelect}
            disabled={dataSignUp.addr_province_code === 0 || loadingSelect}
            optionFilterProp="children"
            showSearch
            filterOption={(input: any, option: any) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {city.map((it: any, idx: number) => (
              <Select.Option key={idx} value={parseInt(it.id)}>
                {it.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            disabled={loading}
            onClick={handleSave}
            type="primary"
            htmlType="submit"
          >
            {loading ? "Loading" : "Signup"}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ width: "100%", textAlign: "center" }}>
        Sudah memiliki akun ?{" "}
        <Link href="/auth/login">
          <b style={{ cursor: "pointer" }}>Login</b>
        </Link>
      </div>
    </>
  );
};

export default AuthSignup;
