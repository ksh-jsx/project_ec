/*global kakao*/
import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';

const CategorySearch = ({id,name,i}) => {
    
  const dispatch = useDispatch();  

  const clickedCategoryId = useSelector((state) => state.clickedCategoryId);
  const map_clicked_data_category = useSelector((state) => state.map_clicked_data_category);
  const kakaoMap = useSelector((state) => state.kakaoMap);
  const ps = new kakao.maps.services.Places(kakaoMap); 

  const placesSearchCB = (data, status) => {
    
    if (status === kakao.maps.services.Status.OK) { //검색 완료      
      var markers = []
      for ( let i=0; i<data.length; i++ ) {  
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data[i].y, data[i].x),
          map:kakaoMap,
        });
        markers.push(marker)        
      }
      dispatch({type:'SET_CATEGORY_MARKERS',categoryMarkers:markers})  
    } 
  }

  const onCategoryClick = () =>{
    if(clickedCategoryId)
      dispatch({type:'DELETE_CATEGORY_MARKERS'})  
    if(clickedCategoryId === id){
      dispatch({type:'HANDLE_MAP_CLICK',kind:'Category',i:null})
      dispatch({type:'SET_CATEGORY_ID',clickedCategoryId:null})
    }
    else{
      
      dispatch({type:'SET_CATEGORY_ID',clickedCategoryId:id})
      dispatch({type:'HANDLE_MAP_CLICK',kind:'Category',i:null})
      dispatch({type:'HANDLE_MAP_CLICK',kind:'Category',i:i})
      dispatch({type:'MAPEVENT',ps:ps})  
    }
  }
  
  useEffect(() => {    
  }, []);

  return (
    <div id={id} onClick={()=>onCategoryClick()} className={map_clicked_data_category[i] ? ' category active_category' : 'category inactive_category'}>
      <img src={require('../../assets/img/'+id+'.png')} className="categoryImg" alt="img"/>
      <span>{name}</span>
    </div>
  );
};
export default CategorySearch;