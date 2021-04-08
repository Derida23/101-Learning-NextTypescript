import React from "react";
import Layout from "../../components/Layout";

import PeopleDetail from "../../components/People/PeopleDetail";
const People: React.FunctionComponent = ({ props }: any) => {
  return (
    <Layout title="People Detail | Test Vascomm">
      <div>
        <PeopleDetail />
      </div>
    </Layout>
  );
};

export default People;
