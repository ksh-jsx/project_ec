import React, { useState } from "react";

const Social = () => {

  const onClick = (event) => {
    
  };


  return (
    <>
      <button onClick={() => onClick()} className="kakao" name="kakao">
        <img src={require('../../assets/img/kakao_icon.png')}/>
        <span>카카오로 시작하기 </span>
      </button>
      <button onClick={() => onClick()} className="naver" name="naver">
        <img src={require('../../assets/img/naver_icon.png')}/>
        <span>네이버로 시작하기 </span>
      </button>
      <button onClick={() => onClick()} className="google" name="google">
        <img src={require('../../assets/img/google_icon.png')}/>
        <span>구글로 시작하기 </span>
      </button>
      
    </>
  );
};
export default Social;