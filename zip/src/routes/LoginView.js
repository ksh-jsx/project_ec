import React, { useState, useEffect } from "react";
import Login from "../components/loginview/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const LoginView = ({  }) => {
  
  const { naver } = window;

  const [newAccount, setNewAccount] = useState(false);

  const onSocialClick = async(event) => {
    const {target:{name}} = event;
    let provider;
    if(name === "google"){
      
    } else if(name = "github"){
      
    }
  }
  
  const Naver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
      callbackUrl: process.env.REACT_APP_NAVER_CALLBACK_URL,
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: '50' }
    });
    naverLogin.init();
  };

  const UserProfile = () => {
    window.location.href.includes('access_token') && GetUser();
    function GetUser() {
      const location = window.location.href.split('=')[1];
      const form_data = new FormData();

      const item = {
        token: location.split('&')[0],
      };
      for (const key in item) {
        form_data.append(key, item[key]);
      }
      console.log(location+' & '+form_data)
      /*
      fetch(${}, {
        method: 'POST',
        body: form_data,
      }).then((res) => res.json())
        .then((resjson) => {
          if (resjson.responseCode == '403') {
            // 사용자가 없으니 회원가입 창으로
          } else if (resjson.responseCode == '200') {
            // 로그인이 되었으니 이 후 process 로 이동
          }
        }).catch((err) => console.log(err));
      */
    }
    
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  useEffect(() => {
    Naver();
    UserProfile();
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
            <div id='naverIdLogin' />
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginView;