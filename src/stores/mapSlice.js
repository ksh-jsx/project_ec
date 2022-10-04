/*global kakao*/
import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "mapSlice",
  initialState: {
    house_data: null, //청약 데이터
    searched_data: null, //검색된 청약 데이터
    kakaoMap: null, //카카오맵 객체
    categoryMarkers: null, //클릭한 카테고리의 마커들
    clickedCategoryId: null, //클릭한 카테고리의 ID
    clickedDataId: null, //클릭한 청약매물 마커의 ID
    map_clicked_data_category: Array(5).fill(false),
  },
  reducers: {
    SET_DATA: (state, action) => {
      state.house_data = action.payload;
      state.searched_data = action.payload;
    },
    SET_MAP: (state, action) => {
      state.kakaoMap = action.payload;
    },
    SEARCH: (state, action) => {
      state.searched_data = action.payload;
    },
    SORT: (state) => {
      state.house_data = state.house_data.reverse();
    },
    CLICK_CATEGORY: (state, action) => {
      const newArr = Array(5).fill(false);
      if (action.payload.i !== null) newArr[action.payload.i] = true;
      state.clickedCategoryId = action.payload.clickedCategoryId;
    },
    CLICK_HOUSE_DATA: (state, action) => {
      state.clickedDataId = action.payload;
    },
    DELETE_CATEGORY_MARKERS: (state) => {
      for (var i = 0; i < state.categoryMarkers?.length; i++) {
        state.categoryMarkers[i].setMap(null);
      }
      state.categoryMarkers = [];
    },
    MAPEVENT: (state, action) => {
      let markers = [];
      if (state.clickedCategoryId) {
        for (let i = 0; i < state.categoryMarkers?.length; i++) {
          state.categoryMarkers[i].setMap(null);
        }
        action.payload.categorySearch(
          state.clickedCategoryId,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              //검색 완료
              for (let i = 0; i < data.length; i++) {
                const marker = new kakao.maps.Marker({
                  map: state.kakaoMap,
                  position: new kakao.maps.LatLng(data[i].y, data[i].x),
                });
                markers.push(marker);
              }
            }
          },
          { useMapBounds: true }
        );
        state.categoryMarkers = markers;
      }
    },
  },
});

export default mapSlice;
export const {
  SET_DATA,
  SET_MAP,
  SEARCH,
  SORT,
  CLICK_CATEGORY,
  CLICK_HOUSE_DATA,
  DELETE_CATEGORY_MARKERS,
  MAPEVENT,
} = mapSlice.actions;
