/*global kakao*/
import React, { useState, useEffect } from "react";
import useStore from '../../useStore';
import { useObserver } from "mobx-react";


const KakaoMap = () => {
  
  const myPosContent = '<div class="myPos"></div>'
  let ps;
  const { counter } = useStore();
  
  const generateMap = () => {

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.2683, 127.6358),
      level: 13
    };

    const map = new kakao.maps.Map(container, options);
    counter.setMap(map)
    ps = new kakao.maps.services.Places(map
      ); 
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 2 // 클러스터 할 최소 지도 레벨 
    });

    if(navigator.geolocation){ //내위치 찾아서 이동하기
      navigator.geolocation.getCurrentPosition((position)=>{
        
        const myPos = new kakao.maps.LatLng(position.coords.latitude,position.coords.longitude)

        new kakao.maps.CustomOverlay({
          map: map,
          position: myPos,
          content: myPosContent,
        });

        // 지도 중심을 이동 시킵니다
        map.setCenter(myPos);
      })

      kakao.maps.event.addListener(counter.map, 'zoom_changed', ()=> {        
        if(counter.clickedCategoryId)
          ps.categorySearch(counter.clickedCategoryId, counter.placesSearchCB, {useMapBounds:true}); 
      });
    }
    counter.data?.map(function(x,i){       
      createDataLocation(clusterer,x,i)
    })
  }

  const createDataLocation = (clusterer,data,i) =>{
    
    const geocoder = new kakao.maps.services.Geocoder();
    
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(data.HSSPLY_ADRES, (result, status) => {
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK){   
        
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);        
        
        var content2 = `<div class="imageMarker" onclick="onMarkerClick(${i},${result[0].y-0.001},${result[0].x})"><div>${data.HOUSE_SECD_NM}</div></div>`;
        
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.CustomOverlay({
          map: counter.map,
          position: coords,
          content: content2,   
          clickable: true 
        });
        
        clusterer.addMarker(marker)

      }
    })
  }

  window.onMarkerClick = (i,lat,lng) =>{
    
    const location = document.getElementsByClassName("cardInner")[i].offsetTop-50; //클릭한 마커에 맞는 카드의 offset 가져오기
    document.getElementsByClassName("cardBox")[0].scrollTo({top:location, behavior:'smooth'}) //스크롤 이동

    counter.map.setLevel(3)
    setTimeout(() => counter.map.panTo(new kakao.maps.LatLng(lat,lng)), 100)

    counter.handleClick(i) //카드 배경색 칠하기
  }

  useEffect(() => {    
    generateMap()
  }, []);

  return useObserver(() => (
    <>
      
      <div id="map"></div> 
      
    </>
  ));
};
export default KakaoMap;