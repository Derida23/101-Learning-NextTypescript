import React from "react";
import Layout from "../../components/Layout";
// import "../../components/People/People.module.scss";

import PeopleDetail from "../../components/People/PeopleDetail";
const People: React.FunctionComponent = ({ props }: any) => {
  return (
    <Layout title="Fullstack Developer | Test Vascomm">
      <div>
        <PeopleDetail />
      </div>
    </Layout>
  );
};

export default People;
