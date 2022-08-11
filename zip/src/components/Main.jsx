import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Main = ({}) => {
  
  useEffect(() => {
    console.log('main')
  }, []);
  
  return (
    <div style={{textAlign:'center',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
      <div>메인임</div>
      <br/>
      <Link to="/view" className="btn_goToMapView">지도 보기</Link>
      <br/>
      <br/>
      <Link to="/login  " className="btn_goToMapView">로그인뷰</Link>
    </div>
  );
};

export default Main;