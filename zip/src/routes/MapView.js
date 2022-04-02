import React, { useState, useEffect } from "react";
import KakaoMap from "../components/mapview/KakaoMap";
import Sidebar from "../components/mapview/Sidebar";
import { getData_apt } from '../lib/api/openapi'
import { getDetailData_apt } from '../lib/api/openapi'

const MapView = ({  }) => {
  
  const [loading, setLoading] = useState(false); 
  const [searchData, setSearchData] = useState({
    startmonth: '202106',
    endmonth: '202204'
  }); 
  const [returnData, setReturnData] = useState({}); 
  const [detailData, setDetailData] = useState({}); 

  useEffect(async() => {

    const ary = await getData_apt(searchData)  //청약 데이터 가져오기
    setReturnData(ary.body.items.item)

    let detailDataArr = [] 
    for(let i=0;i<ary.body.items.item.length;i++){ //각 청약 데이터 상세하게 가져오기
      let ary2 = await getDetailData_apt(ary.body.items.item[i].houseManageNo)  
      detailDataArr = [...detailDataArr,ary2]
    }
    
    setDetailData(detailDataArr)
   
    setLoading(true)
  }, []);
  
  

  return (
    <div className="container full">
      {loading ? ( 
        <div className="mapview_wrapper">
          <div>
            <Sidebar searchData={searchData} returnData={returnData} detailData={detailData}/>
          </div>
          <div>
            <KakaoMap detailData={detailData}/> 
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