/*global kakao*/
import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import useStore from '../../useStore';
import { useObserver } from "mobx-react";
import Divider from '@mui/material/Divider';

function BasicCard({data,i,}) {
  
  const { counter } = useStore();
  
  useEffect(() => {
    
  }, []);

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
              
            </div>
          </div>
        </div>
        <div className="cardRight">
          <div>
            {data.HOUSE_SECD_NM}&nbsp;|&nbsp;
            {data.HSSPLY_ADRES.split(' ')[0].substr(0,2)} {data.HSSPLY_ADRES.split(' ')[1]}
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