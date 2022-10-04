/*global kakao*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLICK_CATEGORY,
  MAPEVENT,
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
  const ps = new kakao.maps.services.Places(kakaoMap);

  const onCategoryClick = () => {
    if (clickedCategoryId) dispatch(DELETE_CATEGORY_MARKERS());
    if (clickedCategoryId === id) {
      dispatch(CLICK_CATEGORY({ i: null, clickedCategoryId: null }));
    } else {
      dispatch(CLICK_CATEGORY({ i: i, clickedCategoryId: id }));
      dispatch(MAPEVENT(ps));
    }
  };

  useEffect(() => {}, []);

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
