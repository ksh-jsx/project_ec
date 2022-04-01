/*global kakao*/
import React, { useState, useEffect } from "react";

const KakaoMap = ({}) => {
  
  useEffect(() => {
    generateMap()
  }, []);
  
  const generateMap = () => {
    const container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
  }

  return (
    <>
      <div id="map"></div> 
    </>
  );
};
export default KakaoMap;