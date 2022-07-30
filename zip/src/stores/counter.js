
/*global kakao*/
import { observable } from 'mobx';

const counter = observable({
  data:null,
  newData:null,
  map:null,
  isListclicked:null,
  clickedCategoryId:null,
  isCategoryclicked:Array(5).fill(false),  
  categoryMarkers:null,  

  setData(data){
    this.data = data    
    this.isListclicked =Array(this.data.length).fill(false)
  },
  setNewData(newData){
    this.newData = newData
  },
  setMap(map){
    this.map = map
  },
  handleClick(type,i){
    if(type ==='List'){
      const newArr = Array(this.data.length).fill(false);
      newArr[i] = true;
      this.isListclicked = newArr   
    } else if(type === 'Category'){
      const newArr = Array(5).fill(false);
      if(i !== null)
        newArr[i] = true;
      this.isCategoryclicked = newArr   
    }
  },
  placesSearchCB(data, status){
    if (status === kakao.maps.services.Status.OK) { //검색 완료      
      var markers = []
      for ( let i=0; i<data.length; i++ ) {  
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(data[i].y, data[i].x),
          map:counter.map
        });
        markers.push(marker)        
      }
      
      counter.categoryMarkers = markers      
    } 
  },
  removeMarker(){
    for ( var i = 0; i < this.categoryMarkers.length; i++ ) {
      this.categoryMarkers[i].setMap(null);
    }   
    this.categoryMarkers = [];
  },
});

export { counter };