/*global kakao*/
import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react";
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

const SearchBar = ({  }) => {
  
  const onClickIcon = () =>{
    console.log('aa')
  }

  useEffect(() => {
   
    
  }, []);
  
  return useObserver(() => (
    <Paper component="form">
      <div className="search">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" onClick={()=>(onClickIcon())} >
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  ));
};
export default SearchBar;