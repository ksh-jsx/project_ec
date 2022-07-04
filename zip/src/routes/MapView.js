/*global kakao*/
import React, { useState, useEffect } from "react";
import KakaoMap from "../components/mapview/KakaoMap";
import Sidebar from "../components/mapview/Sidebar";
import { getData_apt } from '../lib/api/openapi'
import { getDetailData_apt } from '../lib/api/openapi'

const MapView = ({  }) => {
  
  const [loading, setLoading] = useState(false); 
  const [searchData, setSearchData] = useState({
    startmonth: '202005',
    endmonth: '202203'
  }); 
  const [returnData, setReturnData] = useState({}); 


  useEffect(() => {
    getHouseDate()
    
  }, []);
  
  const getHouseDate = async() => {
    setLoading(false)    
    const ary = await getData_apt(searchData)  //청약 데이터 가져오기
    setReturnData(ary)
  
    setLoading(true)
  }
  
  return (
    <div className="mapViewWrapper full">
      {loading ? ( 
        <div className="mapview_wrapper">
          <div>
            <Sidebar searchData={searchData} setSearchData={setSearchData} getHouseDate={getHouseDate}/>
          </div>
          <div>
            <KakaoMap returnData={returnData}/> 
          </div>
        </div> 
      ):(
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      )}
    </div>
  );
};
export default MapView;