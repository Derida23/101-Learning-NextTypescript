import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { Spin, Table, Row, Col, Input, Radio, Tooltip, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import Router from "next/router";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const options = [
  { label: "Aktif", value: 1 },
  { label: "Tidak Aktif", value: 0 },
];

const Index: React.FunctionComponent = (props: any) => {
  const { user } = props;

  useEffect(() => {
    if (!user) {
      setTimeout(function () {
        Router.push("/auth/login");
      }, 3000);
    } else {
      if (user.role !== "admin") {
        setTimeout(function () {
          Router.push(`/people/` + user.id);
        }, 3000);
      }
    }
  }, []);

  return (
    <Layout title="Fullstack Developer | Test Vascomm">
      {user ? (
        user.role === "admin" ? (
          <>
            <Row className="in-search">
              <Col span={12} className="in-action-f">
                <div>Email</div>
                <Input placeholder="Cari menggunakan email..." />
              </Col>
              <Col span={12} className="in-action-l in-col-2">
                <div>
                  <div>Status</div>
                  <Radio.Group
                    options={options}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </div>
                <div>
                  <p></p>
                  <Tooltip title="Reset">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<UndoOutlined />}
                    />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} />
          </>
        ) : (
          <>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "30px" }}
            >
              Anda Bukan Admin, Silahkan untuk login admin untuk melihat list
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              Redirect to User Details .....
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Spin size="large" />
            </div>
          </>
        )
      ) : (
        <>
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "30px" }}
          >
            Anda Belum Login, Silahkan untuk login terlebih dahulu
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            Redirect to Login .....
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Spin size="large" />
          </div>
        </>
      )}
    </Layout>
  );
};
export default Index;
