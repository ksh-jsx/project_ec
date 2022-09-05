import React, { useState, useEffect } from "react";
import "../assets/css/signview.css";
import Signup from "../components/signview/Signup";
import { Link } from "react-router-dom";

const SignupView = ({}) => {
  useEffect(() => {}, []);

  return (
    <div className="authWrapper">
      <div className="signupDescription">
        <span>
          가입을 위해 <br />
          간단한 어쩌고 저쩌고 🤗
        </span>
      </div>
      <div className="signupContainer">
        <Signup />
        <div className="etcContainer">
          <Link to="/signin">
            <span>로그인 화면으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupView;
