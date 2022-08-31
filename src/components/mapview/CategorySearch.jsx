/*global kakao*/
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategorySearch = ({ id, name, i }) => {
  const dispatch = useDispatch();

  const clickedCategoryId = useSelector((state) => state.clickedCategoryId);
  const map_clicked_data_category = useSelector(
    (state) => state.map_clicked_data_category
  );
  const kakaoMap = useSelector((state) => state.kakaoMap);
  const ps = new kakao.maps.services.Places(kakaoMap);

  const onCategoryClick = () => {
    if (clickedCategoryId) dispatch({ type: "DELETE_CATEGORY_MARKERS" });
    if (clickedCategoryId === id) {
      dispatch({ type: "CLICK_CATEGORY", i: null, clickedCategoryId: null });
    } else {
      dispatch({ type: "CLICK_CATEGORY", i: i, clickedCategoryId: id });
      dispatch({ type: "MAPEVENT", ps: ps });
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
