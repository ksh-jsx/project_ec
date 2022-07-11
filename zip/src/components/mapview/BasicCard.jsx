import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function BasicCard({data}) {
  
  useEffect(() => {
    console.log(data)
    console.log('hello')
  }, []);

  return(
    <Card sx={{ minWidth: 275 }}>
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
  );
}
export default BasicCard;