/*global kakao*/
import { legacy_createStore as createStore } from "redux";

const initState = {
  mode:'WELCOME',
  current_page:'HOME',
  housing_subscription_data:null,
  searched_data:null,
  kakaoMap:null,
  categoryMarkers:null,
  clickedCategoryId:null,
  map_clicked_data_list:null,
  map_clicked_data_category:Array(5).fill(false),
}


const reducer = (state=initState, action) => {

  if(action.type === 'MAP'){
    return {
      ...state,
      mode:'INIT_COMPLETE',
      current_page:'MAP',
      housing_subscription_data:action.initData,
      searched_data:action.initData,
      map_clicked_data_list:Array(action.initData.length).fill(false)
    }
  }
  if(action.type === 'HOME'){
    return {
      ...state,
      current_page:'HOME',
    }
  }
  if(action.type === 'SET_MAP'){
    return {...state, mode:'SETMAP_COMPLETE',kakaoMap:action.kakaoMap}
  }
  if(action.type === 'SEARCH'){
    return {...state, mode:'SEARCH_COMPLETE',searched_data:action.searched_data}
  }
  if(action.type === 'HANDLE_MAP_CLICK'){
    if(action.kind ==='List'){
      const newArr = Array(state.housing_subscription_data.length).fill(false);
      newArr[action.i] = true;
      return {...state,map_clicked_data_list:newArr}
    } else if(action.kind === 'Category'){
      const newArr = Array(5).fill(false);
      if(action.i !== null)
        newArr[action.i] = true;
      return {...state,map_clicked_data_category:newArr}
    }
  }
  if(action.type === 'SET_CATEGORY_ID'){
    return {...state,clickedCategoryId:action.clickedCategoryId}
  }
  if(action.type === 'SET_CATEGORY_MARKERS'){
    return {...state,categoryMarkers:action.categoryMarkers}
  }
  if(action.type === 'DELETE_CATEGORY_MARKERS'){
    for ( var i = 0; i < state.categoryMarkers.length; i++ ) {
      state.categoryMarkers[i].setMap(null);
    }  
    return {...state,categoryMarkers:[]}
  }

  if(action.type === 'MAPEVENT'){
    if(state.clickedCategoryId){
      for ( let i = 0; i < state.categoryMarkers.length; i++ ) {
        state.categoryMarkers[i].setMap(null);
      }  
      action.ps.categorySearch(state.clickedCategoryId, (data,status)=>{
        if (status === kakao.maps.services.Status.OK) { //검색 완료      
          var markers = []
          for ( let i=0; i<data.length; i++ ) {  
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(data[i].y, data[i].x),
              map:state.kakaoMap,
            });
            markers.push(marker)        
          }
          return {...state,categoryMarkers:action.categoryMarkers}
        } 
      }, 
      {useMapBounds:true}); 
    }
  }
  return state;
}
export default createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());