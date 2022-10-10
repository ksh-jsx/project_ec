import React, { useState, useEffect } from "react";
import CategorySearch from "./CategorySearch";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH } from "../../stores/mapSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const categoryData = [
    { id: "CS2", name: "편의점" },
    { id: "SW8", name: "지하철" },
    { id: "HP8", name: "병원" },
    { id: "FD6", name: "음식점" },
    { id: "SC4", name: "학교" },
    { id: "BK9", name: "은행" },
  ];
  const [inputData, setInputData] = useState("");
  const house_data = useSelector((state) => {
    return state.mapCounter.house_data;
  });

  const handleChange = (e) => {
    setInputData(e.target.value);
    const newDatas = house_data.filter(
      (x) =>
        x.HOUSE_NM.indexOf(e.target.value) !== -1 ||
        x.HSSPLY_ADRES.indexOf(e.target.value) !== -1
    );
    dispatch(SEARCH(newDatas));
  };

  const onClickIcon = () => {};

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="원하는 내용을 검색해보세요."
            onChange={handleChange}
            value={inputData}
          />
        </div>
        <div className="icon">
          <IconButton
            style={{ color: "#ffffff" }}
            onClick={() => onClickIcon()}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <div>
        <div className="categorys">
          {categoryData.map((x, i) => (
            <CategorySearch id={x.id} name={x.name} key={i} i={i} />
          ))}
        </div>
      </div>
    </>
  );
};
export default SearchBar;
