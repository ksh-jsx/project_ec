import React, { useState, useEffect } from "react";
import "../assets/css/loginview.css";
import Login from "../components/loginview/Login";
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
     {newAccount ? (
        <div>대충 회원가입 뷰 </div>
      ):(
        <>
          <div className="logoContainer">
            <img src={require('../assets/img/logo_small.png')} className="logo"/>
          </div>
          <div className="loginContainer">
            <Login/>
          </div>
          <div className="socialContainer">
            <Social/>
          </div>
          <div className="etcContainer">
            <span>아이디 찾기</span>
            <span onClick={toggleAccount}>회원가입</span>
          </div>
        </>
      )}
    </div>
  );
};
export default LoginView;