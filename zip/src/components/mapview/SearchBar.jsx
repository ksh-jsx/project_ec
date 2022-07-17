import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import useStore from '../../useStore';

const SearchBar = ({  }) => {
  
  const { counter } = useStore();
  const [inputData, setInputData] = useState('');

  const handleChange  = (e) => {
    setInputData(e.target.value)
    const newDatas = counter.data.filter(x=>x.HOUSE_NM.indexOf(e.target.value) !== -1)

    counter.setNewData(newDatas)
  }
  
  const onClickIcon = () =>{

  }

  useEffect(() => {
   
    
  }, []);
  
  return useObserver(() => (
    <Paper component="form">
      <div className="search">
        <input
          type='text'
          placeholder="원하는 내용을 검색해보세요."
          onChange={handleChange}
          value={inputData}
        />
      </div>
      <div className="icon">
        <IconButton style={{color:'#ffffff'}} onClick={()=>(onClickIcon())} >
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  ));
};
export default SearchBar;