/*global kakao*/
import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import useStore from '../../useStore';

const CategorySearch = ({id,name,i}) => {
  
  const { counter } = useStore();  

  const ps = new kakao.maps.services.Places(counter.map); 

  const onCategoryClick = () =>{
    
    if(counter.clickedCategoryId === id){
      counter.removeMarker(counter.categoryMarkers)
      counter.handleClick('Category',null)
      counter.clickedCategoryId = null    
    }
    else{
      counter.clickedCategoryId = id    
      counter.handleClick('Category',i)
      ps.categorySearch(id, counter.placesSearchCB, {useMapBounds:true}); 
    }
  }
  
  useEffect(() => {
    
  }, []);

  return useObserver(() => (
    <div id={id} onClick={()=>onCategoryClick()} className={counter.isCategoryclicked[i] ? ' category active_category' : 'category inactive_category'}>
      <img src={require('../../assets/img/'+id+'.png')} className="categoryImg" alt="img"/>
      <span>{name}</span>
    </div>
  ));
};
export default CategorySearch;