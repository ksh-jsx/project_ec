
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