/*global kakao*/
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MARKERS,
  CLICK_CATEGORY,
  DELETE_CATEGORY_MARKERS,
} from "../../stores/mapSlice";

const CategorySearch = ({ id, name, i }) => {
  const dispatch = useDispatch();
  const [isEventProceeding, setIsEventProceeding] = useState(false);

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
            });
            markers.push(marker);
          }
          dispatch(SET_MARKERS(markers));
        }
      },
      { useMapBounds: true }
    );
    setEvent();
    setIsEventProceeding(false);
  };

  const onCategoryClick = () => {
    if (clickedCategoryId) {
      dispatch(DELETE_CATEGORY_MARKERS());
      setIsEventProceeding(false);
    }
    if (clickedCategoryId === id) {
      dispatch(CLICK_CATEGORY({ i: null, clickedCategoryId: null }));
      setIsEventProceeding(false);
    } else {
      dispatch(CLICK_CATEGORY({ i: i, clickedCategoryId: id }));
      setIsEventProceeding(true);
      eventHandler();
    }
  };

  const setEvent = () => {
    console.log(isEventProceeding);
    if (isEventProceeding) {
      kakao.maps.event.addListener(kakaoMap, "zoom_changed", eventHandler);
      kakao.maps.event.addListener(kakaoMap, "dragend", eventHandler);
    } else {
      kakao.maps.event.removeListener(kakaoMap, "zoom_changed", eventHandler);
      kakao.maps.event.removeListener(kakaoMap, "dragend", eventHandler);
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
