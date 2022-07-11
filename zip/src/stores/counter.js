
import { observable } from 'mobx';

const counter = observable({
  data:null,
  map:null,
  setData(data){
    this.data = data
  },
  setMap(map){
    this.map = map
  },
});

export { counter };