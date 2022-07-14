
import { observable } from 'mobx';

const counter = observable({
  data:null,
  newData:null,
  map:null,
  isListclicked:null,

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
  handleClick(i){
    const newArr = Array(counter.data.length).fill(false);
    newArr[i] = true;
    this.isListclicked = newArr   
  }
});

export { counter };