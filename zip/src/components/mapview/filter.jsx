import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Sidebar = ({searchData,detailData,setSearchData,getHouseDate}) => {

  const startMonthForDate = searchData.startmonth.substring(0,4)+'-'+searchData.startmonth.substring(4,6)+'-01'
  const endMonthForDate = searchData.endmonth.substring(0,4)+'-'+searchData.endmonth.substring(4,6)+'-01'  
  const date1 = new Date(startMonthForDate)
  const date2 = new Date(endMonthForDate)
  

  const [month, setMonth] = useState({
    startmonth: date1,
    endmonth: date2
  }); 
  
  useEffect(() => {
  }, []);
  
  const onInfoChange = (prop) => (event) => {
    //날짜 교체
    setMonth({ ...month, [prop]: event })
    setSearchData({ ...searchData, [prop]: document.getElementById(prop).value });
    //~~~교체
  };

  const onBtnClick = () => {
    getHouseDate()
  }

  return (
    <>
      

      <LocalizationProvider dateAdapter={AdapterDateFns}>        
        <Box m={2} className="datePickerWrapper">
          <DatePicker
            inputFormat="yyyyMM"
            
            views={['year', 'month']}
            label="시작 월"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={month.startmonth}
            onChange={onInfoChange('startmonth')}
            renderInput={(params) => <TextField {...params} id="startmonth" className="datePicker" helperText={null} />}
          />~
          <DatePicker
            inputFormat="yyyyMM"
            views={['year', 'month']}
            label="끝 월"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={month.endmonth}
            onChange={onInfoChange('endmonth')}
            renderInput={(params) => <TextField {...params} id="endmonth" className="datePicker" helperText={null} />}
          />
        </Box>
      </LocalizationProvider>
      <Button variant="outlined" onClick={onBtnClick}>검색하기</Button>
      <br/><br/><br/>
      {detailData?.map((x,i)=>(
        <div key={i}>{x.housenm}</div>
      ))}
      <br/>
      {detailData?.map((x,i)=>(
        <div key={i}>{x.hssplyadres}</div>
      ))}
    </>
  );
};
export default Sidebar;