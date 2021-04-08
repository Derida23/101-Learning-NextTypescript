import React, { useState, useEffect } from "react";
import AuthSignup from "../../components/Auth/AuthSignup";
import Layout from "../../components/Layout";
import axios from "axios";
import Router from "next/router";

const intialData: any = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  gender: "",
  date_of_birth: "0000-00-00",
  addr_province_code: 0,
  addr_city_code: 0,
};

const Signup: React.FunctionComponent = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSignUp, setDataSignUp] = useState<any>(intialData);
  const [loadingSelect, setLoadingSelect] = useState<boolean>(false);
  const [province, setProvince] = useState<any>([
    { id: 0, name: "Pilih provinsi" },
  ]);
  const [city, setCity] = useState<any>([{ id: 0, name: "Pilih kota" }]);
  const [dataError, setDataError] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/api/address/province`
        );

        setProvince(resp.data.data);
      } catch (e) {
        setProvince([{ id: 0, name: "Pilih provinsi" }]);
      }
    })();
  }, []);

  const handleChange = (e: any) => {
    setDataError([]);
    const { name, value } = e.target;
    setDataSignUp({ ...dataSignUp, [name]: value });
  };

  const handleGender = (e: any) => {
    setDataError([]);
    setDataSignUp({ ...dataSignUp, gender: e.target.value });
  };

  const handleDate = (date: any, dateString: string) => {
    setDataError([]);
    if (dateString) {
      setDataSignUp({ ...dataSignUp, date_of_birth: dateString });
    } else {
      setDataSignUp({ ...dataSignUp, date_of_birth: null });
    }
  };

  const handleSelect = async (value: any, type: string) => {
    setLoadingSelect(true);
    setDataError([]);

    if (type === "addr_province_code") {
      setDataSignUp({
        ...dataSignUp,
        addr_province_code: value,
        addr_city_code: 0,
      });

      try {
        const resp = await axios.get(
          `http://localhost:3000/api/address/city?province_id=${value}`
        );

        setCity(resp.data.data);
        setLoadingSelect(false);
      } catch (e) {
        setCity([{ id: 0, name: "Pilih kota" }]);
        setLoadingSelect(false);
      }
    } else if (type === "addr_city_code") {
      setDataSignUp({ ...dataSignUp, addr_city_code: value });
      setLoadingSelect(false);
    }
  };

  const handleReset = () => {
    setProvince([{ id: 0, name: "Pilih provinsi" }]);
    setCity([{ id: 0, name: "Pilih kota" }]);
    setDataError([]);
    setDataSignUp(intialData);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const resp = await axios.post(
        `http://localhost:3000/api/people`,
        dataSignUp
      );

      if (resp.status === 200) {
        Router.push("/auth/login");
        setLoading(false);
        handleReset();
      }
    } catch (e) {
      setLoading(false);
      setDataError(e.response.data.message);
    }
  };

  return (
    <>
      <Layout title="Signup Page | Test Vascomm">
        <AuthSignup
          props={{
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
          }}
        />
      </Layout>
    </>
  );
};

export default Signup;
