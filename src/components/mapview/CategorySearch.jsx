/*global kakao*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_MARKERS,
  CLICK_CATEGORY,
  DELETE_CATEGORY_MARKERS,
} from "../../stores/mapSlice";

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

  const onCategoryClick = () => {
    if (clickedCategoryId) dispatch(DELETE_CATEGORY_MARKERS());
    if (clickedCategoryId === id) {
      dispatch(CLICK_CATEGORY({ i: null, clickedCategoryId: null }));
    } else {
      let markers = [];
      dispatch(CLICK_CATEGORY({ i: i, clickedCategoryId: id }));
      const ps = new kakao.maps.services.Places(kakaoMap);
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
