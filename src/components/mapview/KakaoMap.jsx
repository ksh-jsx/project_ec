/*global kakao*/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_MAP } from "../../stores/mapSlice";

const clustererStyle = [
  {
    width: "40px",
    height: "40px",
    background: "#6297ff",
    borderRadius: "25px",
    color: "#fff",
    textAlign: "center",
    lineHeight: "41px",
    border: "2px solid #fff",
  },
  {
    width: "50px",
    height: "50px",
    background: "#91b6ff",
    borderRadius: "25px",
    color: "#fff",
    textAlign: "center",
    lineHeight: "51px",
    border: "2px solid #fff",
  },
  {
    width: "60px",
    height: "60px",
    background: "#c0d6ff",
    borderRadius: "30px",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "61px",
    border: "2px solid #fff",
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

    gotoMyPos();

    mapSlice.house_data?.map((x, i) => createDataLocation(clusterer, x, i));
  };

  const gotoMyPos = (click = false) => {
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
        if (click) map.setLevel(5);
        map.panTo(myPos);
      });
    }
  };

  const createDataLocation = (clusterer, data, i) => {
    const navermaps = window.naver.maps;
    const endDate = new Date(data.RCEPT_ENDDE.replace(/-/g, "."));
    const today = Date.now();
    const dDay = (endDate.getTime() - today) / 1000 / 60 / 60 / 24;

    console.log(dDay);
    navermaps.Service.geocode(
      {
        query: data.HSSPLY_ADRES,
      },
      (status, response) => {
        if (status === navermaps.Service.Status.ERROR) {
          return alert("Something Wrong!");
        } else {
          const result = response.v2.addresses[0];
          const coords = new kakao.maps.LatLng(result.y, result.x);

          var content2 = `<div class="imageMarker" onclick="onMarkerClick(${i},${
            result.y
          },${result.x})">
          <div>${data.HOUSE_SECD_NM}</div>
          <div>D-${Math.ceil(dDay)}</div>
          </div>`;

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.CustomOverlay({
            map: mapSlice.kakaoMap,
            position: coords,
            content: content2,
            clickable: true,
          });

          clusterer.addMarker(marker);
        }
      }
    );
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
      <div className="gotoMyPosition" onClick={() => gotoMyPos(true)}>
        <img src={require("../../assets/img/my_location.png")} alt="img" />
      </div>
    </>
  );
};
export default KakaoMap;
