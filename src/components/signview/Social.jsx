import React from "react";
import { social } from "../../lib/api/auth";

const Social = () => {
  const onClick = async (target) => {
    await social(target);
  };

  return (
    <>
      <button onClick={() => onClick("kakao")} className="kakao" name="kakao">
        <img src={require("../../assets/img/kakao_icon.png")} alt="kakao" />
        <span>카카오로 시작하기 </span>
      </button>
      <button onClick={() => onClick("naver")} className="naver" name="naver">
        <img src={require("../../assets/img/naver_icon.png")} alt="naver" />
        <span>네이버로 시작하기 </span>
      </button>
      <button
        onClick={() => onClick("google")}
        className="google"
        name="google"
      >
        <img src={require("../../assets/img/google_icon.png")} alt="google" />
        <span>구글로 시작하기 </span>
      </button>
    </>
  );
};
export default Social;
