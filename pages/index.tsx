import React from "react";
import Layout from "../components/Layout";
import { Table, Row, Col, Input, Radio, Tooltip, Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";

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

const Index: React.FunctionComponent = () => {
  return (
    <Layout title="Fullstack Developer | Test Vascomm">
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
              <Button type="primary" shape="circle" icon={<UndoOutlined />} />
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} />
    </Layout>
  );
};
export default Index;
