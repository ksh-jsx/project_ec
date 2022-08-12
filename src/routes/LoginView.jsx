import React, { useState, useEffect } from "react";
import "../assets/css/loginview.css";
import Login from "../components/loginview/Login";
import Signup from "../components/loginview/Signup";
import Social from "../components/loginview/Social";

const LoginView = ({  }) => {
  
  const [newAccount, setNewAccount] = useState(false);

  const onSocialClick = async(event) => {
    const {target:{name}} = event;
    
    if(name === "google"){
      
    } else if(name = "???"){
      
    }
  }
  

  const toggleAccount = () => setNewAccount((prev) => !prev);

  useEffect(() => {
    
  }, []);

  return (
    <div className="authWrapper">
      <div className="logoContainer">
        <img src={require('../assets/img/logo_small.png')} className="logo"/>
      </div>
      {newAccount ? (
        <div className="SignupContainer"> 
          <Signup/>
        </div>
      ):(
        <>
          <div className="loginContainer">
            <Login/>
          </div>
          <div className="socialContainer">
            <Social/>
          </div>
          
        </>
      )}
        <div className="etcContainer">
          {newAccount ? (
            <>
              <span onClick={toggleAccount}>로그인</span>
            </>
          ) : (
            <>
              <span>아이디 찾기</span>
              <span onClick={toggleAccount}>회원가입</span>
            </>
          )}
          
        </div>
    </div>
  );
};
export default LoginView;