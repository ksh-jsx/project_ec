/*global kakao*/
import React, { useState, useEffect } from "react";
import SearchBar from "../components/mapview/SearchBar";
import KakaoMap from "../components/mapview/KakaoMap";
import Drawer from "../components/mapview/BottomDrawer";
import { getAPTLttotPblancDetail } from '../lib/api/openapi'
import { getAPTLttotPblancMdl } from '../lib/api/openapi'
import useStore from '../useStore';
import { useObserver } from "mobx-react";

const MapView = ({  }) => {
  
  const { counter } = useStore();
  const [loading, setLoading] = useState(false); 
  const [searchData, setSearchData] = useState({
    startmonth: '202005',
    endmonth: '202203'
  });   

  useEffect(() => {
    getHouseDate()
    
  }, []);
  
  const getHouseDate = async() => {
    setLoading(false)    
    const ary = await getAPTLttotPblancDetail(searchData)  //청약 데이터 가져오기
    counter.setData(ary)
    setLoading(true)
  }
  
  return useObserver(() => (
    <div className="mapViewWrapper full">
      {loading ? ( 
        <div className="mapviewContainer">
          <div className="searchContainer">
            <SearchBar /> 
          </div>
          <div className="mapContainer">
            <KakaoMap /> 
          </div>
          <div className="drawerContainer">
            <Drawer/>
          </div>
        </div> 
      ):(
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </div>
  ));
};
export default MapView;