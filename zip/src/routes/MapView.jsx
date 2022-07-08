/*global kakao*/
import React, { useState, useEffect } from "react";
import KakaoMap from "../components/mapview/KakaoMap";
import Drawer from "../components/mapview/BottomDrawer";
import { getAPTLttotPblancDetail } from '../lib/api/openapi'
import { getAPTLttotPblancMdl } from '../lib/api/openapi'


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
    const ary = await getAPTLttotPblancDetail(searchData)  //청약 데이터 가져오기
    setReturnData(ary)
    
    setLoading(true)
  }
  
  return (
    <div className="mapViewWrapper full">
      {loading ? ( 
        <div className="mapviewContainer">
          <div className="mapContainer">
            <KakaoMap returnData={returnData}/> 
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
  );
};
export default MapView;