import React, { useState, useEffect } from "react";
import "../assets/css/mapview.css";
import SearchBar from "../components/mapview/SearchBar";
import KakaoMap from "../components/mapview/KakaoMap";
import Drawer from "../components/mapview/BottomDrawer";
import { getAPTLttotPblancDetail } from "../lib/api/openapi";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";
import { SET_DATA } from "../stores/mapSlice";
import { NaverMap, RenderAfterNavermapsLoaded } from "react-naver-maps";

const MapView = () => {
  const dispatch = useDispatch();

  const mySubModule = ["geocoder"];
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    startmonth: "202005",
    endmonth: "202203",
  });

  useEffect(() => {
    getHouseDate();
    dispatch(SET_STATE({ mode: "INIT_MAP", page: "MAP" }));
  }, []);

  const getHouseDate = async () => {
    const ary = await getAPTLttotPblancDetail(); //청약 데이터 가져오기

    dispatch(SET_DATA(ary));

    setLoading(true);
  };

  return (
    <div className="mapViewWrapper">
      {loading ? (
        <div>
          <div className="searchContainer">
            <SearchBar />
          </div>
          <div className="mapContainer">
            <RenderAfterNavermapsLoaded
              ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT_ID}
              submodules={mySubModule}
            >
              <KakaoMap />
            </RenderAfterNavermapsLoaded>
          </div>
          <div className="drawerContainer">
            <Drawer />
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
};

export default MapView;
