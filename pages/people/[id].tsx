import React from "react";
import Layout from "../../components/Layout";
import AuthLogout from "../../components/Auth/AuthLogout";

import PeopleDetail from "../../components/People/PeopleDetail";
const People: React.FunctionComponent = (props: any) => {
  const { user } = props;
  return (
    <Layout title="People Detail | Test Vascomm">
      <div>
        <PeopleDetail />
        <AuthLogout props={{ user }} />
      </div>
    </Layout>
  );
};

export default People;
