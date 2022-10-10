/*global kakao*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MARKERS,
  SET_MAP,
  CLICK_CATEGORY,
  DELETE_CATEGORY_MARKERS,
} from "../../stores/mapSlice";

const clustererStyle = [
  {
    width: "40px",
    height: "40px",
    background: "#C0D6FF",
    borderRadius: "20px",
    color: "#000",
    textAlign: "center",
    lineHeight: "41px",
  },
  {
    width: "50px",
    height: "50px",
    background: "#91B6FF",
    borderRadius: "25px",
    color: "#000",
    textAlign: "center",
    lineHeight: "51px",
  },
  {
    width: "60px",
    height: "60px",
    background: "#6297FF",
    borderRadius: "30px",
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "61px",
  },
];
let map;
const KakaoMap = () => {
  const myPosContent = '<div class="myPos"></div>';
  const dispatch = useDispatch();
  const mapSlice = useSelector((state) => {
    return state.mapCounter;
  });

  const generateMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(0, 0),
      level: 13,
    };

    map = new kakao.maps.Map(container, options);

    dispatch(SET_MAP(map));

    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 8, // 클러스터 할 최소 지도 레벨
      styles: clustererStyle,
    });

    if (navigator.geolocation) {
      //내위치 찾아서 이동하기
      navigator.geolocation.getCurrentPosition((position) => {
        const myPos = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        new kakao.maps.CustomOverlay({
          map: map,
          position: myPos,
          content: myPosContent,
        });

        // 지도 중심을 이동 시킵니다
        map.setCenter(myPos);
      });
    }
    mapSlice.house_data?.map((x, i) => createDataLocation(clusterer, x, i));
  };

  const createDataLocation = (clusterer, data, i) => {
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(data.HSSPLY_ADRES, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        var content2 = `<div class="imageMarker" onclick="onMarkerClick(${i},${
          result[0].y - 0.001
        },${result[0].x})"><div>${data.HOUSE_SECD_NM}</div></div>`;

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.CustomOverlay({
          map: mapSlice.kakaoMap,
          position: coords,
          content: content2,
          clickable: true,
        });

        clusterer.addMarker(marker);
      }
    });
  };

  window.onMarkerClick = (i, lat, lng) => {
    const location =
      document.getElementsByClassName("cardInner")[i].offsetTop - 50; //클릭한 마커에 맞는 카드의 offset 가져오기
    document
      .getElementsByClassName("cardBox")[0]
      .scrollTo({ top: location, behavior: "smooth" }); //스크롤 이동

    mapSlice.kakaoMap.setLevel(3);
    setTimeout(
      () => mapSlice.kakaoMap.panTo(new kakao.maps.LatLng(lat, lng)),
      100
    );
  };

  useEffect(() => {
    generateMap();
  }, []);

  return (
    <>
      <div id="map" />
    </>
  );
};
export default KakaoMap;
