/*global kakao*/
import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import useStore from '../../useStore';
import { useObserver } from "mobx-react";

function BasicCard({data,i,}) {
  
  const { counter } = useStore();
  
  useEffect(() => {
    
  }, []);
  
  function sleep(ms) { //sleep 함수
    return new Promise(resolve=>setTimeout(resolve, ms));
  }

  const select = (i) => {
    counter.handleClick(i)

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(counter.newData[i].HSSPLY_ADRES, function(result, status) {
      if (status === kakao.maps.services.Status.OK){   
        const coords = new kakao.maps.LatLng((result[0].y-0.001), result[0].x);        
        
        counter.map.setLevel(3)
        setTimeout(() => counter.map.panTo(coords), 100)
        
      }
    })
  };

  useEffect(() => {    
    
  }, []);

  return useObserver (()=>(
    <Card sx={{ minWidth: 275 }} onClick={()=>(select(i))} className={counter.isListclicked[i] ? 'active' : 'inactive'}>
      <div className="cardInner">
        
        <div className="cardLeft">
          <div>
            <div>
              {data.HSSPLY_ADRES.split(' ')[0]} <br/>
              {data.HSSPLY_ADRES.split(' ')[1]}
            </div>
          </div>
        </div>
        <div className="cardRight">
          <div>
            {data.HOUSE_SECD_NM}
          </div>
          <div>
            {data.HOUSE_NM}
          </div>
        </div>
      </div>
    </Card>
  ));
}
export default BasicCard;