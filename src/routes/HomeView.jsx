import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import Title from "../components/homeview/Title";
import Nav from "../components/homeview/Nav";
import Article from "../components/homeview/Article";
import CustomData from "../components/homeview/CustomData";
import { getAPTLttotPblancDetail } from "../lib/api/openapi";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";
import { SET_DATA } from "../stores/mapSlice";

const TEMP_PROGRESS = 80;

const HomeView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getCustomDate = async () => {
    const ary = await getAPTLttotPblancDetail(); //청약 데이터 가져오기
    dispatch(SET_DATA(ary));
    setLoading(true);
  };

  useEffect(() => {
    getCustomDate();
    dispatch(SET_STATE({ mode: "INIT_HOME", page: "HOME" }));
  }, []);

  return (
    <>
      {loading ? (
        <div className="homeViewWrapper">
          <Title sequence="0" progress={TEMP_PROGRESS} />
          <br />
          <Nav sequence="0" type="1" />
          <Article type="calculator" />
          <Article type="fill_recommend" progress={TEMP_PROGRESS} />
          <Title sequence="1" />
          <Nav sequence="1" type="2" />
          <CustomData />

          <Title sequence="2" />
          <Article type="chungyakInfo" />

          <Title sequence="3" />
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
};
export default HomeView;
