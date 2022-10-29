import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { social } from "../../lib/api/auth";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_CALLBACK_URL}&response_type=code`;

const Social = () => {
  const { naver } = window;

  const onClick = async (target) => {
    switch (target) {
      case "kakao":
        window.location.href = KAKAO_AUTH_URL;
        break;
      case "naver":
        document.getElementById("naverIdLogin")?.firstChild.click();
        break;
      case "google":
        googleSocialLogin();
        break;
      default:
        console.log("해당 없음");
    }
  };

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false /* 팝업을 통한 연동처리 여부, true 면 팝업 */,
      loginButton: {
        color: "green",
        type: 1,
        height: 25,
      },
    });

    naverLogin.init();
  };

  const googleSocialLogin = useGoogleLogin({
    onSuccess: (codeResponse) => social(codeResponse),
    flow: "auth-code",
  });

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return (
    <>
      <button onClick={() => onClick("kakao")} className="kakao" name="kakao">
        <img src={require("../../assets/img/kakao_icon.png")} alt="kakao" />
        <span>카카오로 시작하기 </span>
      </button>
      <button onClick={() => onClick("naver")} className="naver">
        <img src={require("../../assets/img/naver_icon.png")} alt="naver" />
        <span>네이버로 시작하기 </span>
      </button>
      <button onClick={() => onClick("google")} className="google">
        <img src={require("../../assets/img/google_icon.png")} alt="google" />
        <span>구글로 시작하기 </span>
      </button>

      <div id="naverIdLogin" style={{ display: "none" }} />
    </>
  );
};
export default Social;
