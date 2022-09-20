/*global kakao*/
import { legacy_createStore as createStore } from "redux";

const initState = {
  inLogin:false,
  mode: "WELCOME",
  current_page: "HOME",
  house_data: null,
  searched_data: null,
  kakaoMap: null,
  categoryMarkers: null,
  clickedCategoryId: null,
  clickedDataId: null,
  map_clicked_data_category: Array(5).fill(false),
};

const reducer = (state = initState, action) => {
  if (action.type === "HOME") {
    return {
      ...state,
      current_page: "HOME",
    };
  }
  if (action.type === "MAP") {
    return {
      ...state,
      mode: "INIT_COMPLETE",
      current_page: "MAP",
      house_data: action.initData,
      searched_data: action.initData,
    };
  }
  if (action.type === "SET_MAP") {
    return { ...state, mode: "SETMAP_COMPLETE", kakaoMap: action.kakaoMap };
  }
  if (action.type === "SEARCH") {
    return {
      ...state,
      mode: "SEARCH_COMPLETE",
      searched_data: action.searched_data,
    };
  }
  if (action.type === "SORT") {
    const newData = state.house_data.reverse();
    return { ...state, house_data: newData };
  }
  if (action.type === "CLICK_CATEGORY") {
    const newArr = Array(5).fill(false);
    if (action.i !== null) newArr[action.i] = true;
    return {
      ...state,
      map_clicked_data_category: newArr,
      clickedCategoryId: action.clickedCategoryId,
    };
  }
  if (action.type === "CLICK_HOUSE_DATA") {
    console.log(action.id);
    return {
      ...state,
      clickedDataId: action.id,
    };
  }
  if (action.type === "DELETE_CATEGORY_MARKERS") {
    for (var i = 0; i < state.categoryMarkers?.length; i++) {
      state.categoryMarkers[i].setMap(null);
    }
    return { ...state, categoryMarkers: [] };
  }
  if (action.type === "MAPEVENT") {
    let markers = [];
    if (state.clickedCategoryId) {
      for (let i = 0; i < state.categoryMarkers?.length; i++) {
        state.categoryMarkers[i].setMap(null);
      }
      action.ps.categorySearch(
        state.clickedCategoryId,
        (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            //검색 완료
            for (i = 0; i < data.length; i++) {
              const marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(data[i].y, data[i].x),
                map: state.kakaoMap,
              });
              markers.push(marker);
            }
          }
        },
        { useMapBounds: true }
      );
      return { ...state, categoryMarkers: markers };
    }
  }
  return state;
};
export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
