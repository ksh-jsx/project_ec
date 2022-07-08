import React, { useState, useEffect } from "react";
import Login from "../components/loginview/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

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
        <div>loading...</div>
      ):(
        <div>
          <Login/>
          <div onClick={toggleAccount} className="authSpan">회원가입</div>
          <div className="socialWrap">
            <button onClick={onSocialClick} name="google">구글로 로그인 <FontAwesomeIcon icon={faGoogle} /></button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginView;