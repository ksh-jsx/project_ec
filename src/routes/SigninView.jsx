import React, { useState, useEffect } from "react";
import "../assets/css/loginview.css";
import Signin from "../components/loginview/Signin";
import Social from "../components/loginview/Social";

const SigninView = ({}) => {
  const [isSocialLogin, setIsSocialLogin] = useState(true);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    if (name === "google") {
    } else if ((name = "???")) {
    }
  };

  const toggleAccount = () => setIsSocialLogin((prev) => !prev);

  const etcContainer = () => {
    return (
      <div className="etcContainer">
        {isSocialLogin ? (
          <span onClick={toggleAccount}>이메일 로그인 / 회원가입</span>
        ) : (
          <span onClick={toggleAccount}>아이디 / 패스워드 찾기</span>
        )}
      </div>
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="authWrapper">
      <div className="logoContainer">
        <img
          src={require("../assets/img/logo_small.png")}
          className="logo"
          alt="logo"
        />
      </div>
      {isSocialLogin ? (
        <div className="socialContainer">
          <Social />
          {etcContainer()}
        </div>
      ) : (
        <div className="signinContainer">
          <Signin />
          {etcContainer()}
        </div>
      )}
    </div>
  );
};
export default SigninView;
