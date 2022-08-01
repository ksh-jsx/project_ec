/*global kakao*/
import React, { useState,useEffect } from "react";
import useStore from '../../useStore';
import { useObserver } from "mobx-react";
import Toast from "./Toast";

function BasicCard({data,i,}) {
  
  const { counter } = useStore();
  const [likeStatus, setLikeStatus] = useState(data.like);
  const [ToastStatus, setToastStatus] = useState(false);
  
  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => setToastStatus(false), 500);
    }
    
  }, [ToastStatus]);

  const select = (i) => {
    counter.handleClick('List',i)

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(counter.newData[i].HSSPLY_ADRES, function(result, status) {
      if (status === kakao.maps.services.Status.OK){   
        const coords = new kakao.maps.LatLng((result[0].y-0.001), result[0].x);        
        
        counter.map.setLevel(3)
        setTimeout(() => counter.map.panTo(coords), 100) 
      }
      else{
        setToastStatus(true);
      }
    })
  };
  
  const onClickLike = () =>{    
    
  }

  useEffect(() => {    
    
  }, []);

  return useObserver (()=>(
    <div onClick={()=>(select(i))} className={counter.isListclicked[i] ? "active" : "inactive"}>
      {ToastStatus && <Toast msg="등록된 위치 없음" />}
      <div className="cardInner">
        <div className="cardLeft">
          <div className="apt_place">
              {data.HOUSE_SECD_NM}&nbsp;|&nbsp;
              {data.HSSPLY_ADRES.split(' ')[0].substr(0,2)} {data.HSSPLY_ADRES.split(' ')[1]}
          </div>
          <div className="apt_name">
            {data.HOUSE_NM}
          </div>
          <div className="apt_period">
            
            <div>청약 기간&nbsp;&nbsp;|&nbsp;&nbsp;{data.RCEPT_BGNDE.replace(/-/g,'.').substr(2)} ~ {data.RCEPT_ENDDE.replace(/-/g,'.').substr(2)}</div>
            <div>청약 발표&nbsp;&nbsp;|&nbsp;&nbsp;{data.PRZWNER_PRESNATN_DE.replace(/-/g,'.').substr(2)}</div>
          </div>
        </div>
        <div className="cardRight">
          <div className={likeStatus ? "like on" : "like off"} onClick={(e)=>{e.stopPropagation();setLikeStatus((prev)=>!prev);}}/>
          <div className="apt_img"/>
        </div>
      </div>
    </div>
  ));
}
export default BasicCard;