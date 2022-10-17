/*global kakao*/
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MARKERS,
  CLICK_CATEGORY,
  DELETE_CATEGORY_MARKERS,
} from "../../stores/mapSlice";

const imageSrc = require("../../assets/img/map_filter_pin.png"), // 마커이미지의 주소
  imageSize = new kakao.maps.Size(32, 32); // 마커이미지의 크기

const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

const CategorySearch = ({ id, name, i }) => {
  const dispatch = useDispatch();

  const clickedCategoryId = useSelector((state) => {
    return state.mapCounter.clickedCategoryId;
  });
  const map_clicked_data_category = useSelector((state) => {
    return state.mapCounter.map_clicked_data_category;
  });
  const kakaoMap = useSelector((state) => {
    return state.mapCounter.kakaoMap;
  });

  const ps = new kakao.maps.services.Places(kakaoMap);

  const eventHandler = () => {
    let markers = [];
    dispatch(DELETE_CATEGORY_MARKERS());

    ps.categorySearch(
      id,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          for (let i = 0; i < data.length; i++) {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(data[i].y, data[i].x),
              map: kakaoMap,
              image: markerImage,
            });
            markers.push(marker);
          }
          dispatch(SET_MARKERS(markers));
        }
      },
      { useMapBounds: true }
    );
  };

  const onCategoryClick = () => {
    if (clickedCategoryId) {
      dispatch(DELETE_CATEGORY_MARKERS());
      setEvent(false);
    }
    if (clickedCategoryId === id) {
      dispatch(CLICK_CATEGORY({ i: null, clickedCategoryId: null }));
    } else {
      dispatch(CLICK_CATEGORY({ i: i, clickedCategoryId: id }));
      setEvent(true);
      eventHandler();
    }
  };

  const setEvent = (isActive) => {
    if (isActive) {
      kakao.maps.event.addListener(kakaoMap, "zoom_changed", eventHandler);
      kakao.maps.event.addListener(kakaoMap, "dragend", eventHandler);
    } else {
      const o = kakaoMap.o;
      kakaoMap.o = { idle: o.idle, zoom_changed: [o.zoom_changed[0]] };
    }
  };

  return (
    <div
      id={id}
      onClick={() => onCategoryClick()}
      className={
        map_clicked_data_category[i]
          ? " category active_category"
          : "category inactive_category"
      }
    >
      <img
        src={require("../../assets/img/" + id + ".png")}
        className="categoryImg"
        alt="img"
      />
      <span>{name}</span>
    </div>
  );
};
export default CategorySearch;
