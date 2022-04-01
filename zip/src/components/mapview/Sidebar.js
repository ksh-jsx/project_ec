import React, { useState, useEffect } from "react";

const Sidebar = ({searchData,returnData,detailData}) => {
  
  useEffect(() => {
   console.log(detailData)
  }, []);
  

  return (
    <>
      <div>검색기간: {searchData.startmonth}~{searchData.endmonth}</div>
      <br/><br/><br/>
      {returnData?.map((x,i)=>(
        <div key={i}>{x.bsnsMbyNm}</div>
      ))}
      <br/><br/><br/>
      {detailData?.map((x,i)=>(
        <div key={i}>{x.hssplyadres}</div>
      ))}
    </>
  );
};
export default Sidebar;