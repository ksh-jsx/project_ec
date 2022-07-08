/*global kakao*/
import React, { useState, useEffect } from "react";

const KakaoMap = ({returnData,returnData2}) => {
  
  const myPosContent = '<div class="myPos"></div>'
  const dataContent = '<div class="myPos"></div>'
  
  useEffect(() => {    
    console.log(returnData)
    generateMap()  
  }, []);
  
  const generateMap = () => {
    const container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(36.2683, 127.6358),
      level: 12
    };
    const map = new kakao.maps.Map(container, options);
 
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 2 // 클러스터 할 최소 지도 레벨 
    });

    createMyLocation(map)

    returnData?.map(function(x,i){       
      createDataLocation(map,clusterer,x)
    })
  }

  const createDataLocation = (map,clusterer,data) =>{
    
    const geocoder = new kakao.maps.services.Geocoder();
    
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(data.HSSPLY_ADRES, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK){   
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });

        clusterer.addMarker(marker)
        
      }
    })
    
  }
  
  const createMyLocation = (map) => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        
        const markerPosition = new kakao.maps.LatLng(
          position.coords.latitude, 
          position.coords.longitude
        ); 
        
        new kakao.maps.CustomOverlay({
          map: map,
          position: markerPosition,
          content: myPosContent,
      });
      })
    }
  }

  return (
    <>
      <div id="map"></div> 
    </>
  );
};
export default KakaoMap;