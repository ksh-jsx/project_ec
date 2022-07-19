/*global kakao*/
import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import useStore from '../../useStore';
import tmp from '../../assets/img/CS2.png'

const CategorySearch = ({id,name,i}) => {
  
  const { counter } = useStore();  

  const ps = new kakao.maps.services.Places(counter.map); 

  const onCategoryClick = () =>{
    
    if(counter.clickedCategoryId === id){
      counter.handleClick('Category',null)
      counter.clickedCategoryId = null    
    }
    else{
      counter.clickedCategoryId = id    
      counter.handleClick('Category',i)
      ps.categorySearch(id, counter.placesSearchCB, {useMapBounds:true}); 
    }
    
    if(counter.categoryMarkers)
      removeMarker(counter.categoryMarkers)
    
    
  }

  const removeMarker = () => {
    for ( var i = 0; i < counter.categoryMarkers.length; i++ ) {
      counter.categoryMarkers[i].setMap(null);
    }   
    counter.categoryMarkers = [];
  }
  
  useEffect(() => {
    
  }, []);

  return useObserver(() => (
    <div id={id} onClick={()=>onCategoryClick()} className={counter.isCategoryclicked[i] ? ' category active' : 'category inactive'}>
      <img src={require('../../assets/img/'+id+'.png')} className="categoryImg" alt="img"/>
      <span>{name}</span>
    </div>
  ));
};
export default CategorySearch;