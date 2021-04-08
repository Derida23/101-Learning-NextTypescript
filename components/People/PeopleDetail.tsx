import React from "react";
import { Row, Col } from "antd";

const PeopleDetail: React.FunctionComponent = ({ props }: any) => {
  const { dataProfile } = props;
  console.log(dataProfile);
  return (
    <div className="container">
      <div className="ppl-container">
        <Row>
          <Col span={8}>
            <div className="ppl-img-wrapper">
              <img src="/assets/avatar.jpg" alt="profile-photo" />
            </div>
            <p className="ppl-info-r">
              <b>
                {dataProfile === "man"
                  ? "Laki-laki"
                  : dataProfile === "woman"
                  ? "Perempuan"
                  : "Lain-lain"}
              </b>
            </p>
            <p className="ppl-info-r">
              <b>{dataProfile?.date_of_birth ?? "Belum ada tanggal lahir"}</b>
            </p>
          </Col>
          <Col span={16} className="ppl-info-wrapper">
            <p>
              Nama: <b>{dataProfile.firstname + " " + dataProfile.lastname}</b>
            </p>
            <p>
              Provinsi:{" "}
              <b>
                {dataProfile.addr_province_code
                  ? dataProfile.address_province.name
                  : "Belum ada provinsi"}
              </b>
            </p>
            <p>
              Kota:{" "}
              <b>
                {dataProfile.addr_city_code
                  ? dataProfile.address_city.name
                  : "Belum ada kota"}
              </b>
            </p>
            <p>
              Kecamatan:{" "}
              <b>
                {dataProfile.addr_district_code
                  ? dataProfile.address_district.name
                  : "Belum ada kecamatan"}
              </b>
            </p>
            <p>
              Email: <b>{dataProfile?.email ?? "Belum ada email"}</b>{" "}
              <b
                style={
                  !dataProfile.verified_at
                    ? { color: "red" }
                    : { color: "green" }
                }
              >
                {!dataProfile.verified_at ? "(unverified)" : "(verified)"}
              </b>
            </p>
            <p>
              Telepon: <b>{dataProfile?.phone ?? "Belum ada telepon"}</b>
            </p>
            <p>
              Status:{" "}
              <b
                style={
                  dataProfile.status === 1
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {dataProfile.status === 1 ? "Aktif" : "Tidak Aktif"}
              </b>
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PeopleDetail;
