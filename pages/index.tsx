import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Spin,
  Table,
  Row,
  Col,
  Input,
  Radio,
  Tooltip,
  Button,
  Badge,
  Pagination,
} from "antd";
import { UndoOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Router from "next/router";
import AuthLogout from "../components/Auth/AuthLogout";
import axios from "axios";
import Link from "next/link";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Name",
    dataIndex: "firstname",
    key: "firstname",
    render: (text: any, record: any, index: any) => (
      <div>{record.firstname + " " + record.lastname}</div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: any) => (
      <div>
        {text ? (
          <Badge status="processing" text="Aktif" />
        ) : (
          <Badge status="error" text="Tidak Aktif" />
        )}
      </div>
    ),
  },
  {
    title: "View",
    dataIndex: "id",
    key: "id",
    render: (text: any) => (
      <Link href={`/people/` + text}>
        <Button shape="circle" icon={<EyeOutlined />} />
      </Link>
    ),
  },
];

const options = [
  { label: "Aktif", value: 1 },
  { label: "Tidak Aktif", value: 0 },
];

const Index = (props: any) => {
  const { user, data, total } = props;
  const [dataTable, setDataTable] = useState<any>([]);
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<any>("");
  const [page, setPage] = useState<any>({ page: 1, limit: 5 });

  useEffect(() => {
    if (data) {
      setDataTable(data);
    }
  }, [data]);

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

  const handleSearch = () => {
    Router.push({
      pathname: "/",
      query: {
        email: email,
        active: status,
      },
    });
  };

  const handleReset = () => {
    setEmail("");
    setStatus(null);
    setPage({ limit: 5, page: 1 });
    Router.push("/");
  };

  const handlePage = (page: any, pageSize: number) => {
    setPage({ limit: pageSize, page });
    Router.push({
      pathname: "/",
      query: {
        email: email,
        active: status,
        page: page,
        limit: pageSize,
      },
    });
  };

  return (
    <Layout title="Fullstack Developer | Test Vascomm">
      {user ? (
        user.role === "admin" ? (
          <>
            <Row className="in-search">
              <Col span={12} className="in-action-f">
                <div>Email</div>
                <Input
                  placeholder="Cari menggunakan email..."
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
                />
              </Col>
              <Col span={12} className="in-action-l in-col-2">
                <div>
                  <div>Status</div>
                  <Radio.Group
                    options={options}
                    onChange={(e: any) => setStatus(e.target.value)}
                    value={status}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <Tooltip title="Search">
                    <Button
                      onClick={handleSearch}
                      style={{ marginRight: "10px", marginTop: "10px" }}
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                  <Tooltip title="Reset">
                    <Button
                      onClick={handleReset}
                      style={{ marginTop: "10px" }}
                      type="dashed"
                      shape="circle"
                      icon={<UndoOutlined />}
                    />
                  </Tooltip>
                </div>
              </Col>
            </Row>
            <Table
              dataSource={dataTable}
              columns={columns}
              pagination={false}
            />
            <Pagination
              style={{ marginTop: "20px", marginBottom: "20px" }}
              total={total ? total : 0}
              showTotal={(total: number) => `Total ${total} items`}
              defaultPageSize={data.length}
              defaultCurrent={1}
              onChange={(pageSize: any, page: any) =>
                handlePage(pageSize, page)
              }
            />
            <AuthLogout props={{ user }} />
          </>
        ) : (
          <>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "30px" }}
            >
              Anda Bukan Admin, Silahkan login menggunakan admin untuk melihat
              daftar pengguna
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

Index.getInitialProps = async (ctx: any) => {
  const { query } = ctx;
  const { email, active, page, limit }: any = query;

  const resp = await axios.get(
    `http://localhost:3000/api/people/?email=${email ? email : ""}&active=${
      active ? active : ""
    }&page=${page ? page : 1}&limit=${limit ? limit : 5}`
  );

  return {
    data: resp?.data?.data?.rows ?? [],
    total: resp?.data?.data?.count ?? 0,
  };
};

export default Index;
