import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AuthLogout from "../../components/Auth/AuthLogout";
import axios from "axios";
import PeopleDetail from "../../components/People/PeopleDetail";
import Router from "next/router";
import { Spin } from "antd";

const People = (props: any) => {
  const { user, userid } = props;
  const [dataProfile, setDataProfile] = useState<any>(null);

  useEffect(() => {
    if (userid) {
      if (user.id === userid.id) {
        Router.push({ pathname: `/people/${user.id}` });
        setDataProfile(userid);
      } else if (user.role === "admin") {
        Router.push({ pathname: `/people/${userid.id}` });
        setDataProfile(userid);
      } else {
        Router.push({ pathname: "/" });
      }
    } else {
      Router.push({ pathname: "/" });
    }
  }, []);

  console.log(dataProfile);

  return (
    <Layout title="People Detail | Test Vascomm">
      <div>
        {!dataProfile ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <>
            <PeopleDetail props={{ dataProfile }} />
            <AuthLogout props={{ user }} />
          </>
        )}
      </div>
    </Layout>
  );
};

People.getInitialProps = async (ctx: any) => {
  const { query } = ctx;
  const { id } = query;
  const userid: number = +id;

  let user: any;

  try {
    user = await axios.get(`http://localhost:3000/api/people/${userid}`);

    if (user.status === 200) {
      delete user.data.data["password"];
    } else {
      user = null;
    }
  } catch (error) {
    user = null;
  }

  console.log(user);

  return { userid: user?.data?.data ?? null };
};

export default People;
