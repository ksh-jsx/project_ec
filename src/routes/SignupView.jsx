import React, { useState, useEffect } from "react";
import "../assets/css/signview.css";
import Signup from "../components/signview/Signup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";

const SignupView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SET_STATE({ mode: "INIT_SIGNUP", page: "SIGNUP" }));
  }, []);

  return (
    <div className="authWrapper">
      <div className="signupDescription">
        <span>
          가입을 위해 <br />
          간단한 절차를 진행할게요 &nbsp;
          <img
            src={require("../assets/img/emoji_smile.png")}
            alt="img"
            style={{ position: "relative", top: "2px" }}
          />
        </span>
      </div>
      <div className="signupContainer">
        <Signup />
        <div className="etcContainer">
          <Link to="/">
            <span>로그인 화면으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignupView;
