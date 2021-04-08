import React from "react";
import { Row, Col } from "antd";

const PeopleDetail: React.FunctionComponent = ({ props }: any) => {
  return (
    <div className="container">
      <div className="ppl-container">
        <Row>
          <Col span={8}>
            <div className="ppl-img-wrapper">
              <img src="/assets/avatar.jpg" alt="profile-photo" />
            </div>
            <p className="ppl-info-r">Laki-laki</p>
            <p className="ppl-info-r">28 September 1996</p>
          </Col>
          <Col span={16} className="ppl-info-wrapper">
            <p>Nama: Admin Vascomm</p>
            <p>Provinsi: Jawa Barat</p>
            <p>Kota: Bogor</p>
            <p>Kecamatan: Ciawi</p>
            <p>
              Email: admin@vascomm.com{" "}
              <b style={{ color: "red" }}>(unverified)</b>
            </p>
            <p>Telepon: 085725638278</p>
            <p>
              Status: <b style={{ color: "green" }}>Aktif</b>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PeopleDetail;
